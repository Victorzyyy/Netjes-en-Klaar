import { NextResponse } from "next/server";

import { businessInfo } from "@/data/site-content";

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" ? item.trim() : "";
}

function values(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function toAttachment(file: File) {
  const bytes = await file.arrayBuffer();
  return {
    filename: file.name,
    content: Buffer.from(bytes).toString("base64"),
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const lang = value(formData, "lang") === "ar" ? "ar" : "nl";
  const copy =
    lang === "ar"
      ? {
          fileTooLarge: "السيرة الذاتية كبيرة جداً. اجعل الملف أقل من 5 ميغابايت.",
          required: "يرجى إدخال الاسم ووسيلة التواصل ومكان السكن على الأقل.",
          notConfigured:
            "نموذج التوظيف غير مربوط بالإرسال بعد. يمكنك الاتصال بنا أو مراسلتنا مباشرة وسنساعدك بشكل صحيح.",
          sendFailed: "تعذر الإرسال حالياً. يمكنك مراسلتنا أو الاتصال بنا مباشرة.",
          success: "تم إرسال طلبك. سنتواصل معك إذا كانت هناك خطوة مناسبة.",
          subjectPrefix: "طلب عمل جديد عبر الموقع",
          labels: {
            name: "الاسم",
            contact: "التواصل",
            city: "مكان السكن",
            availability: "التوفر",
            experience: "الخبرة",
            drivingLicense: "رخصة القيادة",
            hasCar: "سيارة",
            vca: "شهادة VCA",
            languages: "اللغات",
            levels: "المستويات",
            roleInterest: "نوع الطلب",
            cv: "السيرة الذاتية",
            message: "رسالة التعريف",
          },
          empty: "غير مُدخل",
          noCv: "غير مرفق",
          noMessage: "لا توجد رسالة إضافية",
        }
      : {
          fileTooLarge: "Je CV is te groot. Houd het bestand onder 5 MB.",
          required: "Vul in ieder geval naam, contact en woonplaats in.",
          notConfigured:
            "De sollicitatie is nog niet gekoppeld voor verzending. Bel of mail ons direct, dan zorgen we dat je goed terechtkomt.",
          sendFailed: "Versturen lukt nu even niet. Mail of bel ons gerust direct.",
          success: "Je sollicitatie is verstuurd. We nemen contact op als er een passende stap is.",
          subjectPrefix: "Nieuwe sollicitatie via website",
          labels: {
            name: "Naam",
            contact: "Contact",
            city: "Woonplaats",
            availability: "Beschikbaarheid",
            experience: "Ervaring",
            drivingLicense: "Rijbewijs",
            hasCar: "Auto",
            vca: "VCA",
            languages: "Talen",
            levels: "Niveaus",
            roleInterest: "Interesse",
            cv: "CV",
            message: "Sollicitatiebrief",
          },
          empty: "Niet ingevuld",
          noCv: "Niet meegestuurd",
          noMessage: "Geen extra toelichting",
        };

  const cv = formData.get("cv");
  const cvFile = cv instanceof File && cv.size > 0 ? cv : null;

  if (cvFile && cvFile.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: copy.fileTooLarge }, { status: 400 });
  }

  const payload = {
    name: value(formData, "name"),
    contact: value(formData, "contact"),
    city: value(formData, "city"),
    availability: value(formData, "availability"),
    experience: value(formData, "experience"),
    drivingLicense: value(formData, "drivingLicense"),
    hasCar: value(formData, "hasCar"),
    vca: value(formData, "vca"),
    languages: values(formData, "languages"),
    languageLevels: value(formData, "languageLevels"),
    roleInterest: value(formData, "roleInterest"),
    message: value(formData, "message"),
    cvFileName: cvFile?.name || "",
  };

  if (!payload.name || !payload.contact || !payload.city) {
    return NextResponse.json({ ok: false, message: copy.required }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || businessInfo.email;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactFromEmail) {
    console.warn("Job application received but email delivery is not configured.", payload);
    return NextResponse.json(
      {
        ok: false,
        message: copy.notConfigured,
      },
      { status: 503 },
    );
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: payload.contact.includes("@") ? payload.contact : undefined,
      subject: `${copy.subjectPrefix} - ${payload.name}`,
      text: [
        `${copy.labels.name}: ${payload.name}`,
        `${copy.labels.contact}: ${payload.contact}`,
        `${copy.labels.city}: ${payload.city}`,
        `${copy.labels.availability}: ${payload.availability || copy.empty}`,
        `${copy.labels.experience}: ${payload.experience || copy.empty}`,
        `${copy.labels.drivingLicense}: ${payload.drivingLicense || copy.empty}`,
        `${copy.labels.hasCar}: ${payload.hasCar || copy.empty}`,
        `${copy.labels.vca}: ${payload.vca || copy.empty}`,
        `${copy.labels.languages}: ${payload.languages.length ? payload.languages.join(", ") : copy.empty}`,
        `${copy.labels.levels}: ${payload.languageLevels || copy.empty}`,
        `${copy.labels.roleInterest}: ${payload.roleInterest || copy.empty}`,
        `${copy.labels.cv}: ${payload.cvFileName || copy.noCv}`,
        "",
        `${copy.labels.message}:`,
        payload.message || copy.noMessage,
      ].join("\n"),
      attachments: cvFile ? [await toAttachment(cvFile)] : undefined,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Job application delivery failed.", errorText);
    return NextResponse.json(
      { ok: false, message: copy.sendFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: copy.success,
  });
}
