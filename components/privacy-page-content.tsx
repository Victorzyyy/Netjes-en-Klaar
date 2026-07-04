"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { businessInfo } from "@/data/site-content";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

const content = {
  nl: {
    kicker: "Privacy & cookies",
    title: "Hoe we omgaan met gegevens, contactformulieren en analytics.",
    intro:
      "Op deze pagina leggen we uit welke gegevens via deze website verwerkt kunnen worden, waarom dat gebeurt en hoe je je cookievoorkeuren kunt aanpassen.",
    sections: [
      {
        title: "1. Wie is verantwoordelijk?",
        body: [
          `Deze website hoort bij ${businessInfo.name}. Voor vragen over privacy of gegevensverwerking kun je contact opnemen via ${businessInfo.email} of ${businessInfo.phoneDisplay}.`,
        ],
      },
      {
        title: "2. Welke gegevens verwerken we?",
        body: [
          "Als je een contactformulier invult, kunnen we gegevens verwerken zoals je naam, telefoonnummer, e-mailadres, locatie, type aanvraag en het bericht dat je meestuurt.",
          "Als je solliciteert, kunnen we daarnaast gegevens verwerken die je invult in het sollicitatieformulier, zoals ervaring, beschikbaarheid en eventuele bijlagen.",
        ],
      },
      {
        title: "3. Waarom verwerken we die gegevens?",
        body: [
          "We gebruiken deze gegevens om contact met je op te nemen, je aanvraag te beoordelen, een voorstel op te stellen of je sollicitatie te behandelen.",
          "We gebruiken gegevens uit formulieren niet voor onnodige marketingstromen zonder duidelijke aanleiding.",
        ],
      },
      {
        title: "4. Cookies en analytics",
        body: [
          "De website gebruikt functionele cookies om basisinstellingen te onthouden, zoals taalkeuze en cookievoorkeuren.",
          "Als je daarvoor toestemming geeft, kunnen we Google Analytics gebruiken om te meten hoe de website gebruikt wordt. Denk aan paginaweergaven, populaire onderdelen en algemene gebruikspatronen.",
          "Analytics wordt op deze website pas geactiveerd nadat je daarvoor toestemming hebt gegeven via de cookiebanner.",
        ],
      },
      {
        title: "5. Je keuze aanpassen",
        body: [
          "Je kunt je cookiekeuze later opnieuw openen via de knop voor cookie-instellingen op de website.",
          "Wil je dat we gegevens uit een formulier verwijderen of wil je weten welke gegevens we van je hebben ontvangen, neem dan contact met ons op.",
        ],
      },
      {
        title: "6. Derde partijen",
        body: [
          "Voor het versturen van formulierinzendingen en het meten van analytics kunnen diensten van derden worden gebruikt, zoals een e-mailverzenddienst en Google Analytics.",
          "We proberen het gebruik daarvan te beperken tot wat praktisch nodig is voor contactafhandeling en verbetering van de website.",
        ],
      },
    ],
    backHome: "Terug naar home",
    contact: "Contact opnemen",
    updated: "Laatst bijgewerkt op 4 juli 2026.",
  },
  ar: {
    kicker: "الخصوصية والكوكيز",
    title: "كيف نتعامل مع البيانات ونماذج التواصل والتحليلات.",
    intro:
      "في هذه الصفحة نشرح ما هي البيانات التي يمكن معالجتها عبر هذا الموقع، ولماذا يحدث ذلك، وكيف يمكنك تعديل تفضيلات الكوكيز الخاصة بك.",
    sections: [
      {
        title: "1. من المسؤول؟",
        body: [
          `هذا الموقع تابع لـ ${businessInfo.name}. إذا كانت لديك أسئلة حول الخصوصية أو معالجة البيانات، يمكنك التواصل عبر ${businessInfo.email} أو ${businessInfo.phoneDisplay}.`,
        ],
      },
      {
        title: "2. ما البيانات التي نعالجها؟",
        body: [
          "إذا قمت بملء نموذج تواصل، فقد نعالج بيانات مثل الاسم ورقم الهاتف والبريد الإلكتروني والموقع ونوع الطلب والرسالة التي ترسلها.",
          "إذا قدمت طلب عمل، فقد نعالج أيضاً البيانات التي تدخلها في نموذج التوظيف مثل الخبرة والتوفر وأي مرفقات.",
        ],
      },
      {
        title: "3. لماذا نعالج هذه البيانات؟",
        body: [
          "نستخدم هذه البيانات للتواصل معك، أو مراجعة طلبك، أو إعداد عرض مناسب، أو معالجة طلب التوظيف الخاص بك.",
          "لا نستخدم بيانات النماذج في حملات تسويقية غير ضرورية من دون سبب واضح.",
        ],
      },
      {
        title: "4. الكوكيز والتحليلات",
        body: [
          "يستخدم الموقع كوكيز أساسية لتذكر الإعدادات المهمة مثل اختيار اللغة وتفضيلات الكوكيز.",
          "إذا منحتنا الإذن، يمكننا استخدام Google Analytics لقياس كيفية استخدام الموقع، مثل عدد الزيارات والأجزاء الأكثر استخداماً وأنماط الاستخدام العامة.",
          "لا يتم تفعيل التحليلات على هذا الموقع إلا بعد أن تمنح الموافقة عبر شريط الكوكيز.",
        ],
      },
      {
        title: "5. تعديل اختيارك",
        body: [
          "يمكنك فتح إعدادات الكوكيز مرة أخرى لاحقاً عبر زر إعدادات الكوكيز الموجود على الموقع.",
          "إذا أردت أن نحذف بيانات أرسلتها عبر نموذج أو أردت معرفة البيانات التي استلمناها منك، يمكنك التواصل معنا مباشرة.",
        ],
      },
      {
        title: "6. الجهات الخارجية",
        body: [
          "قد نستخدم خدمات خارجية لإرسال النماذج وقياس التحليلات، مثل خدمة إرسال البريد وGoogle Analytics.",
          "نحاول حصر هذا الاستخدام فيما هو عملي وضروري للتواصل وتحسين الموقع فقط.",
        ],
      },
    ],
    backHome: "العودة للرئيسية",
    contact: "تواصل معنا",
    updated: "آخر تحديث في 4 يوليو 2026.",
  },
} as const;

export function PrivacyPageContent() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const syncLanguage = (nextLanguage: string | null) => {
      if (nextLanguage === "nl" || nextLanguage === "ar") {
        setLanguage(nextLanguage);
        document.documentElement.lang = nextLanguage;
        document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
      }
    };

    syncLanguage(window.localStorage.getItem(languageStorageKey));

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      syncLanguage(customEvent.detail);
    };

    const handleStorage = () => {
      syncLanguage(window.localStorage.getItem(languageStorageKey));
    };

    window.addEventListener(languageChangeEvent, handleLanguageChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(languageChangeEvent, handleLanguageChange as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const copy = content[language];

  return (
    <section dir={language === "ar" ? "rtl" : "ltr"} className="fresh-shell relative z-10 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">{copy.kicker}</p>
        <h1 className="mt-5 text-balance text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] text-fresh-ink md:text-7xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[hsl(var(--muted))]">
          {copy.intro}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-5">
        {copy.sections.map((section) => (
          <article key={section.title} className="premium-panel rounded-[2rem] p-6 md:p-7">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-fresh-ink">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-[hsl(var(--muted))]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 sm:flex-row">
        <Link href="/" className="inline-flex items-center justify-center rounded-full border border-fresh-blue/20 bg-white px-6 py-3.5 text-sm font-semibold text-fresh-ink shadow-fresh transition hover:-translate-y-0.5 hover:border-fresh-ink/20">
          {copy.backHome}
        </Link>
        <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue">
          {copy.contact}
        </Link>
      </div>

      <p className="mx-auto mt-6 max-w-5xl text-sm text-[hsl(var(--muted))]">{copy.updated}</p>
    </section>
  );
}
