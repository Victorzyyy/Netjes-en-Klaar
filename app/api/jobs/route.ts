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

  const cv = formData.get("cv");
  const cvFile = cv instanceof File && cv.size > 0 ? cv : null;

  if (cvFile && cvFile.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "Je CV is te groot. Houd het bestand onder 5 MB." }, { status: 400 });
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
    return NextResponse.json({ ok: false, message: "Vul in ieder geval naam, contact en woonplaats in." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || businessInfo.email;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactFromEmail) {
    console.warn("Job application received but email delivery is not configured.", payload);
    return NextResponse.json(
      {
        ok: false,
        message: "De sollicitatie is nog niet gekoppeld voor verzending. Bel of mail ons direct, dan zorgen we dat je goed terechtkomt.",
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
      subject: `Nieuwe sollicitatie via website - ${payload.name}`,
      text: [
        `Naam: ${payload.name}`,
        `Contact: ${payload.contact}`,
        `Woonplaats: ${payload.city}`,
        `Beschikbaarheid: ${payload.availability || "Niet ingevuld"}`,
        `Ervaring: ${payload.experience || "Niet ingevuld"}`,
        `Rijbewijs: ${payload.drivingLicense || "Niet ingevuld"}`,
        `Auto: ${payload.hasCar || "Niet ingevuld"}`,
        `VCA: ${payload.vca || "Niet ingevuld"}`,
        `Talen: ${payload.languages.length ? payload.languages.join(", ") : "Niet ingevuld"}`,
        `Niveaus: ${payload.languageLevels || "Niet ingevuld"}`,
        `Interesse: ${payload.roleInterest || "Niet ingevuld"}`,
        `CV: ${payload.cvFileName || "Niet meegestuurd"}`,
        "",
        "Toelichting:",
        payload.message || "Geen extra toelichting",
      ].join("\n"),
      attachments: cvFile ? [await toAttachment(cvFile)] : undefined,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Job application delivery failed.", errorText);
    return NextResponse.json(
      { ok: false, message: "Versturen lukt nu even niet. Mail of bel ons gerust direct." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Je sollicitatie is verstuurd. We nemen contact op als er een passende stap is.",
  });
}
