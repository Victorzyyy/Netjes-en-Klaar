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

export async function POST(request: Request) {
  const formData = await request.formData();
  const lang = value(formData, "lang") === "ar" ? "ar" : "nl";
  const copy =
    lang === "ar"
      ? {
          required: "يرجى إدخال الاسم ووسيلة التواصل والرسالة على الأقل.",
          notConfigured: "النموذج غير مربوط بالإرسال بعد. يمكنك الاتصال بنا أو مراسلتنا مباشرة وسنساعدك فوراً.",
          sendFailed: "تعذر الإرسال حالياً. يمكنك الاتصال بنا أو مراسلتنا مباشرة.",
          success: "تم إرسال رسالتك. سنتواصل معك في أقرب وقت.",
          subjectPrefix: "طلب جديد عبر الموقع",
          empty: "غير مُدخل",
          labels: {
            name: "الاسم",
            company: "الشركة",
            audience: "نوع الطلب",
            contact: "التواصل",
            services: "الخدمات",
            requestType: "نوع الطلب",
            location: "الموقع",
            timing: "التوقيت",
            contactPreference: "طريقة التواصل المفضلة",
            message: "الرسالة",
          },
        }
      : {
          required: "Vul in ieder geval naam, contact en bericht in.",
          notConfigured: "Het formulier is nog niet volledig gekoppeld voor verzending. Bel of mail ons direct, dan helpen we je meteen.",
          sendFailed: "Versturen lukt nu even niet. Bel of mail ons gerust direct.",
          success: "Je bericht is verstuurd. We nemen zo snel mogelijk contact op.",
          subjectPrefix: "Nieuwe aanvraag via website",
          empty: "Niet ingevuld",
          labels: {
            name: "Naam",
            company: "Bedrijf",
            audience: "Route",
            contact: "Contact",
            services: "Diensten",
            requestType: "Type aanvraag",
            location: "Locatie",
            timing: "Timing",
            contactPreference: "Voorkeur contact",
            message: "Bericht",
          },
        };

  const payload = {
    name: value(formData, "name"),
    company: value(formData, "company"),
    audience: value(formData, "audience"),
    contact: value(formData, "contact"),
    services: values(formData, "services"),
    requestType: value(formData, "requestType"),
    location: value(formData, "location"),
    timing: value(formData, "timing"),
    contactPreference: value(formData, "contactPreference"),
    message: value(formData, "message"),
  };

  if (!payload.name || !payload.contact || !payload.message) {
    return NextResponse.json(
      { ok: false, message: copy.required },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || businessInfo.email;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactFromEmail) {
    console.warn("Contact form submission received but email delivery is not configured.", payload);
    return NextResponse.json(
      {
        ok: false,
        message: copy.notConfigured,
      },
      { status: 503 },
    );
  }

  const servicesLabel = payload.services.length ? payload.services.join(", ") : copy.empty;

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
        `${copy.labels.company}: ${payload.company || copy.empty}`,
        `${copy.labels.audience}: ${payload.audience || copy.empty}`,
        `${copy.labels.contact}: ${payload.contact}`,
        `${copy.labels.services}: ${servicesLabel}`,
        `${copy.labels.requestType}: ${payload.requestType || copy.empty}`,
        `${copy.labels.location}: ${payload.location || copy.empty}`,
        `${copy.labels.timing}: ${payload.timing || copy.empty}`,
        `${copy.labels.contactPreference}: ${payload.contactPreference || copy.empty}`,
        "",
        `${copy.labels.message}:`,
        payload.message,
      ].join("\n"),
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Contact form delivery failed.", errorText);
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
