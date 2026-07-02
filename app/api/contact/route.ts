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

  const payload = {
    name: value(formData, "name"),
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
      { ok: false, message: "Vul in ieder geval naam, contact en bericht in." },
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
        message: "Het formulier is nog niet volledig gekoppeld voor verzending. Bel of mail ons direct, dan helpen we je meteen.",
      },
      { status: 503 },
    );
  }

  const servicesLabel = payload.services.length ? payload.services.join(", ") : "Niet ingevuld";

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
      subject: `Nieuwe aanvraag via website - ${payload.name}`,
      text: [
        `Naam: ${payload.name}`,
        `Contact: ${payload.contact}`,
        `Diensten: ${servicesLabel}`,
        `Type aanvraag: ${payload.requestType || "Niet ingevuld"}`,
        `Locatie: ${payload.location || "Niet ingevuld"}`,
        `Timing: ${payload.timing || "Niet ingevuld"}`,
        `Voorkeur contact: ${payload.contactPreference || "Niet ingevuld"}`,
        "",
        "Bericht:",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Contact form delivery failed.", errorText);
    return NextResponse.json(
      { ok: false, message: "Versturen lukt nu even niet. Bel of mail ons gerust direct." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Je bericht is verstuurd. We nemen zo snel mogelijk contact op.",
  });
}
