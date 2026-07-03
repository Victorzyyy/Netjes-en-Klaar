export const businessInfo = {
  name: "Netjes & Klaar",
  phoneDisplay: "06 87258236",
  phoneHref: "tel:+31687258236",
  whatsappHref: "https://wa.me/31687258236",
  email: "hallo@netjesenklaar.nl",
  serviceAreaText: "Landelijk inzetbaar",
  serviceAreaFocus: "Bedrijven, evenementen en vakantieparken in heel Nederland",
  serviceAreas: ["Nederland"],
  services: [
    "Kantoorschoonmaak",
    "Vakantiepark schoonmaak",
    "Evenementenreiniging",
    "Bouwschoonmaak",
    "Industriele schoonmaak",
  ],
  trustPoints: [
    { title: "Vast aanspreekpunt", text: "Je weet wie de planning bewaakt en wie je belt als er iets verandert." },
    { title: "Duidelijke tijdvakken", text: "Afspraak is afspraak. Handig voor receptie, beheer en wisselmomenten." },
    { title: "Controle op uitvoering", text: "We laten teams niet los zonder overzicht. We sturen bij en blijven scherp." },
  ],
  operationalNotes: [
    "Eenmalige schoonmaak of vaste rondes",
    "Ook inzetbaar buiten kantooruren",
    "Planning afgestemd op locatie en gebruik",
  ],
} as const;

export const faqs = [
  { question: "Kunnen jullie snel starten?", answer: "Vaak wel. De mogelijkheden hangen af van regio, oppervlak en het type schoonmaak." },
  { question: "Werken jullie buiten kantooruren?", answer: "Ja. Ochtend, avond en weekendplanning is mogelijk zodat bedrijven overdag gewoon kunnen doordraaien." },
  { question: "Doen jullie vaste schoonmaakcontracten?", answer: "Ja. We kunnen een vaste frequentie, checklist en aanspreekpunt inrichten voor terugkerende schoonmaak." },
  { question: "Kunnen jullie vakantieparken op wisseldagen schoonmaken?", answer: "Ja. We plannen op check-in tijden en werken met controles per woning, chalet of bungalow." },
  { question: "Nemen jullie materialen mee?", answer: "Dat kan. We stemmen vooraf af of we met eigen materialen werken of met middelen op locatie." },
  { question: "Hoe maken jullie de planning duidelijk?", answer: "Vooraf leggen we het tijdvak, team, takenlijst en contactpersoon vast zodat iedereen weet wat er gebeurt." },
  { question: "Doen jullie ook schoonmaak in productie- of fabrieksomgevingen?", answer: "Ja. Voor productieomgevingen werken we met duidelijke afstemming over veiligheid, looproutes, stilstandmomenten en reiniging per zone." },
] as const;

export const contactServiceOptions = [
  "Kantoor",
  "Vakantiepark",
  "Evenement",
  "Bouwoplevering",
  "Industrieel / fabriek",
] as const;

export const requestTypeOptions = [
  "Eenmalige schoonmaak",
  "Vaste schoonmaak",
  "Wisselschoonmaak",
  "Spoed of korte termijn",
  "Even overleggen wat past",
] as const;

export const contactPreferenceOptions = [
  "Bel me even",
  "Mail me eerst",
  "Allebei is prima",
] as const;
