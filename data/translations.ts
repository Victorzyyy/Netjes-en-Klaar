import { businessInfo } from "@/data/site-content";

export type Language = "nl" | "ar";

export type TranslationDictionary = {
  lang: Language;
  dir: "ltr" | "rtl";
  meta: {
    title: string;
    description: string;
    schemaDescription: string;
    availableLanguages: string[];
  };
  nav: {
    home: string;
    services: string;
    process: string;
    contact: string;
    careers: string;
    mainNav: string;
    mobileNav: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    callNow: string;
    switchLabel: string;
    dutch: string;
    arabic: string;
  };
  hero: {
    title: string;
    subtitle: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    popBubbleLabel: string;
  };
  servicesSection: {
    title: string;
    body: string;
    pickerTitle: string;
    requestCta: string;
    idealFor: string;
    planning: string;
    checklistTitle: string;
    items: Array<{
      label: string;
      service: string;
      summary: string;
      bestFor: string;
      planning: string;
      checklist: string[];
    }>;
  };
  processSection: {
    kicker: string;
    title: string;
    steps: Array<{
      number: string;
      title: string;
      text: string;
    }>;
  };
  faqSection: {
    kicker: string;
    title: string;
    body: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contactSection: {
    kicker: string;
    title: string;
    body: string;
    regionTitle: string;
    regionValue: string;
    regionBody: string;
    callLabel: string;
    mailLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      contact: string;
      contactPlaceholder: string;
      services: string;
      requestType: string;
      location: string;
      locationPlaceholder: string;
      timing: string;
      timingPlaceholder: string;
      contactPreference: string;
      message: string;
      messagePlaceholder: string;
      submitIdle: string;
      submitBusy: string;
      success: string;
      error: string;
    };
    trustPoints: Array<{
      title: string;
      text: string;
    }>;
    operationalNotes: string[];
    serviceOptions: string[];
    requestTypeOptions: string[];
    contactPreferenceOptions: string[];
  };
};

export const translations: Record<Language, TranslationDictionary> = {
  nl: {
    lang: "nl",
    dir: "ltr",
    meta: {
      title: "Netjes & Klaar | Commerciele schoonmaak voor kantoren, vakantieparken, industrie en events",
      description:
        "Netjes & Klaar verzorgt commerciele schoonmaak, dieptereiniging, bouwopleveringen en reiniging van productieomgevingen in Nederland. Heldere planning, duidelijke takenlijsten en vaste aanspreekpunten.",
      schemaDescription:
        "Commerciele schoonmaak, dieptereiniging, bouwopleveringen en reiniging van productieomgevingen met heldere planning en vaste aanspreekpunten.",
      availableLanguages: ["Dutch", "Arabic"],
    },
    nav: {
      home: "Home",
      services: "Diensten",
      process: "Werkwijze",
      contact: "Contact",
      careers: "Werken bij",
      mainNav: "Hoofdnavigatie",
      mobileNav: "Mobiele navigatie",
      menu: "Menu",
      openMenu: "Menu openen",
      closeMenu: "Menu sluiten",
      callNow: "Bel direct",
      switchLabel: "Taal kiezen",
      dutch: "Nederlands",
      arabic: "العربية",
    },
    hero: {
      title: "Netjes & Klaar",
      subtitle: "Zakelijke schoonmaak en dieptereiniging voor kantoren, vakantieparken, events en productieomgevingen.",
      body: "Landelijk inzetbaar in Nederland, met heldere planning, vaste afspraken en een duidelijke vervolgstap na je aanvraag.",
      primaryCta: "Plan een korte intake",
      secondaryCta: "Bekijk diensten",
      popBubbleLabel: "Bubbel laten knappen",
    },
    servicesSection: {
      title: "Schoonmaak die past bij hoe je locatie gebruikt wordt.",
      body: "Geen standaard rondje, maar een planning die rekening houdt met drukte, wisselmomenten en representatieve ruimtes.",
      pickerTitle: "Kies je dienst",
      requestCta: "Vraag deze dienst aan",
      idealFor: "Ideaal voor",
      planning: "Planning",
      checklistTitle: "Wij regelen",
      items: [
        {
          label: "Kantoor",
          service: "Kantoorschoonmaak",
          summary: "Voor kantoren die netjes, fris en representatief moeten blijven.",
          bestFor: "Kantoren, praktijken, showrooms en bedrijfsruimtes.",
          planning: "Vaste schoonmaak per dag, week of maand met duidelijke checklist.",
          checklist: ["Werkplekken en vloeren", "Sanitaire rondes", "Pantry en vergaderruimtes", "Afval en voorraadpunten"],
        },
        {
          label: "Vakantiepark",
          service: "Vakantieparken",
          summary: "Voor bungalows, chalets en recreatiewoningen die op tijd klaar moeten zijn voor nieuwe gasten.",
          bestFor: "Vakantieparken, recreatiewoningen, chalets en groepsaccommodaties.",
          planning: "Schoonmaak op wisseldagen, met controle per woning of chalet.",
          checklist: ["Keuken en sanitair detail", "Linnen- en voorraadcheck", "Inventariscontrole", "Terras/entree nalopen"],
        },
        {
          label: "Evenement",
          service: "Evenementenreiniging",
          summary: "Voor evenementen waar alles schoon en representatief moet blijven, ook tijdens drukte.",
          bestFor: "Horeca, zalen, beurzen, festivals en bedrijfsevents.",
          planning: "Schoonmaak voor, tijdens en na het evenement.",
          checklist: ["Sanitaire piekrondes", "Publiekszones netjes houden", "Afvalstromen bewaken", "Eindschoonmaak na afloop"],
        },
        {
          label: "Bouwoplevering",
          service: "Bouwschoonmaak",
          summary: "Voor ruimtes die na bouw of verbouwing schoon en stofvrij opgeleverd moeten worden.",
          bestFor: "Nieuwbouw, renovatie, winkels, kantoren en oplevermomenten.",
          planning: "Eindschoonmaak met focus op stof, glas, randen en details.",
          checklist: ["Bouwstof verwijderen", "Glas en kozijnen", "Sanitair en keukens", "Detailronde voor overdracht"],
        },
        {
          label: "Industrieel",
          service: "Industriele schoonmaak",
          summary: "Voor productie- en fabrieksomgevingen waar veiligheid, zones en vaste werkafspraken zwaar meewegen.",
          bestFor: "Productiehallen, fabrieken, logistieke zones, technische ruimtes en verwerkingsomgevingen.",
          planning: "Afgestemd op ploegendienst, stilstandmomenten, veiligheidsregels en reiniging per zone.",
          checklist: ["Looproutes en werkzones", "Machines en directe omgeving", "Vloeren en stofgevoelige punten", "Afstemming op veiligheid en productie"],
        },
        {
          label: "Dieptereiniging",
          service: "Dieptereiniging",
          summary: "Voor locaties die niet alleen netjes moeten lijken, maar echt grondig fris, vetvrij en detail-schoon moeten worden aangepakt.",
          bestFor: "Keukens, sanitair, vloeren, oplevermomenten, achterstallige schoonmaak en ruimtes die een sterke reset nodig hebben.",
          planning: "Eenmalig of periodiek, ingepland op momenten waarop we grondig kunnen werken zonder je operatie te storen.",
          checklist: ["Vet, kalkaanslag en opgehoopt vuil", "Randen, hoeken en moeilijk bereikbare delen", "Sanitair, keukenzones en contactpunten", "Herstel van frisheid en representatieve uitstraling"],
        },
      ],
    },
    processSection: {
      kicker: "Werkwijze",
      title: "Zo werken we samen.",
      steps: [
        {
          number: "01",
          title: "Kennismaken",
          text: "We bespreken de locatie, wat er nodig is, wanneer het moet gebeuren en hoe vaak je inzet wilt.",
        },
        {
          number: "02",
          title: "Planning & bezetting",
          text: "Daarna stemmen we af hoeveel mensen nodig zijn, op welke datum, in welk tijdvak en met welke takenlijst.",
        },
        {
          number: "03",
          title: "Uitvoering & controle",
          text: "Tijdens het werk houden we overzicht, controleren we de kwaliteit en sturen we bij waar nodig.",
        },
        {
          number: "04",
          title: "Verder uitbouwen",
          text: "Als het goed loopt, kunnen we opschalen, vaker langskomen of de samenwerking uitbreiden.",
        },
      ],
    },
    faqSection: {
      kicker: "FAQ",
      title: "Veelgestelde vragen",
      body: "Kort en duidelijk, zodat je meteen weet hoe we werken.",
      items: [
        { question: "Kunnen jullie snel starten?", answer: "Vaak wel. De mogelijkheden hangen af van regio, oppervlak en het type schoonmaak." },
        { question: "Werken jullie buiten kantooruren?", answer: "Ja. Ochtend, avond en weekendplanning is mogelijk zodat bedrijven overdag gewoon kunnen doordraaien." },
        { question: "Doen jullie vaste schoonmaakcontracten?", answer: "Ja. We kunnen een vaste frequentie, checklist en aanspreekpunt inrichten voor terugkerende schoonmaak." },
        { question: "Kunnen jullie vakantieparken op wisseldagen schoonmaken?", answer: "Ja. We plannen op check-in tijden en werken met controles per woning, chalet of bungalow." },
        { question: "Nemen jullie materialen mee?", answer: "Dat kan. We stemmen vooraf af of we met eigen materialen werken of met middelen op locatie." },
        { question: "Hoe maken jullie de planning duidelijk?", answer: "Vooraf leggen we het tijdvak, team, takenlijst en contactpersoon vast zodat iedereen weet wat er gebeurt." },
        { question: "Doen jullie ook industriele schoonmaak?", answer: "Ja. Voor productieomgevingen stemmen we af op veiligheid, zones, werkvolgorde en momenten waarop het team toegang heeft." },
        { question: "Doen jullie ook dieptereiniging?", answer: "Ja. Dieptereiniging is geschikt voor achterstallige schoonmaak, keukens, sanitair, vloeren en ruimtes die weer echt grondig fris moeten worden." },
      ],
    },
    contactSection: {
      kicker: "Contact",
      title: "Vertel kort wat je nodig hebt.",
      body: "Laat je gegevens achter, kies wat past en schrijf erbij wat er moet gebeuren. Dan reageren we gericht met een voorstel of een korte vervolgstap.",
      regionTitle: "Werkgebied",
      regionValue: "Landelijk inzetbaar",
      regionBody: "Bedrijven, evenementen en vakantieparken in heel Nederland",
      callLabel: "Bel direct",
      mailLabel: "Mail",
      form: {
        name: "Naam",
        namePlaceholder: "Naam of bedrijf",
        contact: "Telefoon of e-mail",
        contactPlaceholder: "Hoe bereiken we je het snelst?",
        services: "Waar gaat het om?",
        requestType: "Wat voor inzet zoek je?",
        location: "Locatie",
        locationPlaceholder: "Plaats, regio of type locatie",
        timing: "Wanneer moet het ongeveer gebeuren?",
        timingPlaceholder: "Bijvoorbeeld: deze week, volgende maand of op wisseldagen",
        contactPreference: "Hoe wil je dat we reageren?",
        message: "Bericht",
        messagePlaceholder:
          "Schrijf gewoon kort wat er moet gebeuren. Bijvoorbeeld: om wat voor locatie het gaat, hoeveel ruimtes er zijn, of het spoed heeft, welke dagen handig zijn, of waar we rekening mee moeten houden.",
        submitIdle: "Stuur je bericht",
        submitBusy: "Bezig met versturen",
        success: "Je bericht is goed ontvangen. We nemen snel contact op.",
        error: "Versturen lukt nu even niet.",
      },
      trustPoints: [...businessInfo.trustPoints],
      operationalNotes: [...businessInfo.operationalNotes],
      serviceOptions: ["Kantoor", "Vakantiepark", "Evenement", "Bouwoplevering", "Industrieel / fabriek", "Dieptereiniging"],
      requestTypeOptions: ["Eenmalige schoonmaak", "Vaste schoonmaak", "Wisselschoonmaak", "Spoed of korte termijn", "Even overleggen wat past"],
      contactPreferenceOptions: ["Bel me even", "Mail me eerst", "Allebei is prima"],
    },
  },
  ar: {
    lang: "ar",
    dir: "rtl",
    meta: {
      title: "Netjes & Klaar | خدمات تنظيف احترافية للمكاتب والمنتجعات والفعاليات وبيئات الإنتاج",
      description:
        "Netjes & Klaar تقدم خدمات تنظيف احترافية وتنظيف عميق وخدمات ما بعد البناء وبيئات الإنتاج في هولندا مع تخطيط واضح وفريق معروف ونقاط تواصل ثابتة.",
      schemaDescription:
        "خدمات تنظيف احترافية وتنظيف عميق وأعمال التسليم النهائي وبيئات الإنتاج مع تخطيط واضح ونقطة تواصل ثابتة.",
      availableLanguages: ["Arabic", "Dutch"],
    },
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      process: "طريقة العمل",
      contact: "التواصل",
      careers: "العمل معنا",
      mainNav: "التنقل الرئيسي",
      mobileNav: "التنقل على الجوال",
      menu: "القائمة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      callNow: "اتصل الآن",
      switchLabel: "اختر اللغة",
      dutch: "Nederlands",
      arabic: "العربية",
    },
    hero: {
      title: "Netjes & Klaar",
      subtitle: "تنظيف تجاري وتنظيف عميق للمكاتب ومنتجعات العطلات والفعاليات وبيئات الإنتاج.",
      body: "متاحون في جميع أنحاء هولندا، مع تخطيط واضح واتفاقات ثابتة وخطوة متابعة واضحة بعد إرسال طلبك.",
      primaryCta: "احجز مكالمة قصيرة",
      secondaryCta: "شاهد الخدمات",
      popBubbleLabel: "فقاعة قابلة للفرقعة",
    },
    servicesSection: {
      title: "تنظيف يناسب طريقة استخدام موقعك.",
      body: "ليس جولة تنظيف عادية، بل تنظيم يراعي أوقات الضغط وتبديل الزوار والمساحات التي يجب أن تبقى ممثلة بشكل ممتاز.",
      pickerTitle: "اختر خدمتك",
      requestCta: "اطلب هذه الخدمة",
      idealFor: "مناسب لـ",
      planning: "التخطيط",
      checklistTitle: "نحن نهتم بـ",
      items: [
        {
          label: "مكتب",
          service: "تنظيف المكاتب",
          summary: "للمكاتب التي يجب أن تبقى مرتبة ومنعشة وممثلة بشكل جيد.",
          bestFor: "المكاتب والعيادات وصالات العرض ومساحات العمل.",
          planning: "تنظيف ثابت يومي أو أسبوعي أو شهري مع قائمة مهام واضحة.",
          checklist: ["المكاتب والأرضيات", "جولات دورات المياه", "المطبخ وغرف الاجتماعات", "النفايات ونقاط الإمداد"],
        },
        {
          label: "منتجع",
          service: "تنظيف منتجعات العطلات",
          summary: "للبنغلات والشاليهات والوحدات الترفيهية التي يجب أن تكون جاهزة في الوقت المناسب للضيوف الجدد.",
          bestFor: "منتجعات العطلات والوحدات الترفيهية والشاليهات والإقامات الجماعية.",
          planning: "تنظيف في أيام التبديل مع فحص لكل وحدة أو شاليه.",
          checklist: ["تفاصيل المطبخ والحمام", "فحص البياضات والمستلزمات", "فحص المحتويات", "مراجعة التراس والمدخل"],
        },
        {
          label: "فعالية",
          service: "تنظيف الفعاليات",
          summary: "للفعاليات التي يجب أن تبقى نظيفة وممثلة بشكل جيد حتى أثناء الازدحام.",
          bestFor: "الضيافة والقاعات والمعارض والمهرجانات وفعاليات الشركات.",
          planning: "تنظيف قبل الفعالية وأثناءها وبعدها.",
          checklist: ["جولات مكثفة لدورات المياه", "الحفاظ على مناطق الزوار مرتبة", "متابعة مسارات النفايات", "تنظيف نهائي بعد الانتهاء"],
        },
        {
          label: "تسليم",
          service: "تنظيف ما بعد البناء",
          summary: "للمساحات التي يجب تسليمها نظيفة وخالية من الغبار بعد البناء أو التجديد.",
          bestFor: "المباني الجديدة والتجديدات والمتاجر والمكاتب ومواعيد التسليم.",
          planning: "تنظيف نهائي مع تركيز على الغبار والزجاج والحواف والتفاصيل.",
          checklist: ["إزالة غبار البناء", "الزجاج والإطارات", "الحمامات والمطابخ", "جولة تفصيلية قبل التسليم"],
        },
        {
          label: "مصنع",
          service: "تنظيف صناعي",
          summary: "لبيئات الإنتاج والمصانع حيث تكون السلامة وتقسيم المناطق وتعليمات العمل جزءاً أساسياً من الخطة.",
          bestFor: "قاعات الإنتاج والمصانع والمناطق اللوجستية والغرف التقنية وبيئات المعالجة.",
          planning: "يتم التنسيق حسب الورديات وأوقات التوقف وقواعد السلامة والتنظيف لكل منطقة.",
          checklist: ["مسارات الحركة ومناطق العمل", "الآلات وما حولها", "الأرضيات ونقاط الغبار الحساسة", "التنسيق مع السلامة والإنتاج"],
        },
        {
          label: "تنظيف عميق",
          service: "تنظيف عميق",
          summary: "للمواقع التي لا يكفي أن تبدو مرتبة فقط، بل تحتاج إلى تنظيف فعلي عميق يزيل الدهون والترسبات والأوساخ المتراكمة.",
          bestFor: "المطابخ والمرافق الصحية والأرضيات ومواعيد التسليم والتنظيف المتأخر والمساحات التي تحتاج إلى إعادة ضبط قوية.",
          planning: "مرة واحدة أو بشكل دوري، وفي أوقات تسمح لنا بالعمل بعمق من دون إزعاج التشغيل.",
          checklist: ["الدهون والترسبات والأوساخ المتراكمة", "الحواف والزوايا والأماكن الصعبة", "المرافق الصحية ومناطق المطبخ ونقاط اللمس", "استعادة الإحساس بالنظافة والمظهر الممثل"],
        },
      ],
    },
    processSection: {
      kicker: "طريقة العمل",
      title: "هكذا نعمل معك.",
      steps: [
        {
          number: "01",
          title: "تعارف سريع",
          text: "نراجع الموقع وما المطلوب ومتى يجب التنفيذ وكم مرة تحتاجون إلى الخدمة.",
        },
        {
          number: "02",
          title: "التخطيط والطاقم",
          text: "بعد ذلك نحدد عدد الأشخاص المطلوبين والتاريخ والفترة الزمنية وقائمة المهام المناسبة.",
        },
        {
          number: "03",
          title: "التنفيذ والمتابعة",
          text: "أثناء العمل نبقى على اطلاع ونراقب الجودة ونتدخل مباشرة إذا احتاج الأمر.",
        },
        {
          number: "04",
          title: "التوسع لاحقاً",
          text: "إذا سارت الأمور جيداً يمكننا التوسع أو زيادة الزيارات أو توسيع التعاون.",
        },
      ],
    },
    faqSection: {
      kicker: "الأسئلة الشائعة",
      title: "أسئلة متكررة",
      body: "مختصر وواضح حتى تعرف مباشرة كيف نعمل.",
      items: [
        { question: "هل يمكنكم البدء بسرعة؟", answer: "غالباً نعم. ذلك يعتمد على المنطقة والمساحة ونوع التنظيف المطلوب." },
        { question: "هل تعملون خارج ساعات الدوام؟", answer: "نعم. يمكننا التخطيط صباحاً أو مساءً أو في عطلة نهاية الأسبوع حتى يستمر العمل خلال اليوم." },
        { question: "هل توفرون عقود تنظيف ثابتة؟", answer: "نعم. يمكننا ترتيب تكرار ثابت وقائمة مهام واضحة ونقطة تواصل واحدة." },
        { question: "هل تنظفون منتجعات العطلات في أيام تبديل الضيوف؟", answer: "نعم. نخطط حسب أوقات الوصول ونعمل مع فحص لكل وحدة أو شاليه أو بنغالو." },
        { question: "هل تجلبون المواد معكم؟", answer: "يمكن ذلك. نتفق مسبقاً إن كنا سنعمل بموادنا أو بمواد موجودة في الموقع." },
        { question: "كيف تجعلون التخطيط واضحاً؟", answer: "نثبت مسبقاً الفترة الزمنية والفريق وقائمة المهام ونقطة التواصل حتى يعرف الجميع ما سيحدث." },
        { question: "هل توفرون التنظيف الصناعي أيضاً؟", answer: "نعم. في بيئات الإنتاج ننسق حسب السلامة وتقسيم المناطق وتسلسل العمل والأوقات التي يمكن للفريق الدخول فيها." },
        { question: "هل توفرون التنظيف العميق أيضاً؟", answer: "نعم. التنظيف العميق مناسب للتنظيف المتأخر والمطابخ والمرافق الصحية والأرضيات والمساحات التي تحتاج إلى استعادة النظافة بشكل فعلي." },
      ],
    },
    contactSection: {
      kicker: "تواصل",
      title: "اكتب باختصار ما الذي تحتاجه.",
      body: "اترك بياناتك، اختر ما يناسبك، واكتب باختصار ما المطلوب. بعدها نرد عليك بخطوة واضحة أو اقتراح مناسب.",
      regionTitle: "نطاق العمل",
      regionValue: "متاحون في جميع أنحاء هولندا",
      regionBody: "للشركات والفعاليات ومنتجعات العطلات في مختلف أنحاء هولندا",
      callLabel: "اتصل الآن",
      mailLabel: "البريد",
      form: {
        name: "الاسم",
        namePlaceholder: "الاسم أو اسم الشركة",
        contact: "الهاتف أو البريد الإلكتروني",
        contactPlaceholder: "كيف نصل إليك بسرعة؟",
        services: "ما الذي يدور حوله الطلب؟",
        requestType: "ما نوع الخدمة التي تبحث عنها؟",
        location: "الموقع",
        locationPlaceholder: "المدينة أو المنطقة أو نوع الموقع",
        timing: "متى تقريباً تحتاج التنفيذ؟",
        timingPlaceholder: "مثلاً هذا الأسبوع أو الشهر القادم أو في أيام التبديل",
        contactPreference: "كيف تفضل أن نرد عليك؟",
        message: "الرسالة",
        messagePlaceholder: "اكتب باختصار ما الذي يجب عمله. مثلاً نوع الموقع، عدد المساحات، هل يوجد استعجال، الأيام المناسبة، أو أي تفاصيل مهمة.",
        submitIdle: "أرسل طلبك",
        submitBusy: "جاري الإرسال",
        success: "تم استلام رسالتك وسنتواصل معك قريباً.",
        error: "تعذر الإرسال حالياً.",
      },
      trustPoints: [
        { title: "جهة تواصل ثابتة", text: "تعرف من يتابع التخطيط ومن تتصل به إذا تغير شيء." },
        { title: "فترات زمنية واضحة", text: "نحدد الموعد بوضوح. هذا مريح للإدارة والاستقبال وأوقات التبديل." },
        { title: "متابعة على التنفيذ", text: "لا نترك الفرق بدون إشراف. نراجع ونوجه ونبقى منتبهين." },
      ],
      operationalNotes: ["تنظيف مرة واحدة أو جولات ثابتة", "متاح أيضاً خارج ساعات الدوام", "التخطيط حسب الموقع وطريقة استخدامه"],
      serviceOptions: ["مكتب", "منتجع", "فعالية", "تسليم بعد البناء", "صناعي / مصنع", "تنظيف عميق"],
      requestTypeOptions: ["تنظيف مرة واحدة", "تنظيف ثابت", "تنظيف تبديل", "طلب مستعجل أو قريب", "نراجع معاً ما الأنسب"],
      contactPreferenceOptions: ["اتصلوا بي", "ابدأوا بالبريد", "الطريقتان مناسبتان"],
    },
  },
};
