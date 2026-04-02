export const heroMeta = [
  { label: "Préparé par", value: "Adam Telmat" },
  { label: "Pour", value: "Yves Daumas — ekodev Sud-Est" },
  { label: "Stratégie", value: "Grands comptes / LTV 3 ans" },
  { label: "Disponible", value: "Avril 2026", highlight: true },
];

export const heroPhases = [
  { num: "01", label: "Ciblage Asymétrique", sub: "Data ADEME + signaux BEGES" },
  { num: "02", label: "Engagement & Conversion", sub: "Séquence multicanale + script" },
  { num: "03", label: "Qualification", sub: "Framework de découverte" },
  { num: "04", label: "Proposition & Closing", sub: "Propal + soutenance" },
];

export const icpCards = [
  { icon: "🏭", title: "Industrie manufacturière", desc: "Zone Fos-sur-Mer / Berre — plus grande zone industrielle de France hors Paris. Sous-traitants de groupes cotés soumis à CSRD en cascade.", priority: 1 },
  { icon: "🏗️", title: "BTP / Construction", desc: "Filiales régionales Vinci, Bouygues, Eiffage. La maison mère a son Big Four — la filiale locale doit produire ses propres données carbone.", priority: 1 },
  { icon: "⚡", title: "Énergie / Chimie", desc: "TotalEnergies, Air Liquide, Solvay — sites industriels PACA. Pression réglementaire maximale, budget RSE structuré.", priority: 2 },
  { icon: "🌾", title: "Agroalimentaire", desc: "Filiales de groupes cotés en PACA. Pression des donneurs d'ordres GMS qui exigent un bilan carbone fournisseur.", priority: 2 },
  { icon: "🏥", title: "Santé / Pharma", desc: "Groupes hospitaliers privés régionaux (Elsan, Almaviva). Le système de soins = 8% des émissions nationales. Enjeu RH fort.", priority: 2 },
  { icon: "🚛", title: "Logistique / Transport", desc: "Marseille = 1er port de France. Scope 3 massif. Filiales logistiques de groupes avec obligation mobilité employeur.", priority: 3 },
];

export const targetingSignals = [
  {
    num: "01",
    title: "Signal d'échéance théorique",
    desc: "Les entreprises dont le dernier bilan date de 2018, 2020 ou 2022 doivent programmer un renouvellement (cycle de 4 ans). L'échéance légale est identifiable dans la base BEGES.",
    tag: "Urgence réglementaire",
    color: "red" as const,
  },
  {
    num: "02",
    title: "Déficit de Scope 3",
    desc: "Les grands groupes ayant déclaré des millions de tonnes en Scope 1 & 2, mais dont le Scope 3 (chaîne de valeur) est à zéro ou non renseigné. Écart probable avec les attentes CSRD.",
    tag: "Non-conformité CSRD",
    color: "orange" as const,
  },
];

export const sponsorTypes = [
  {
    icon: "💼",
    role: "Sponsor Économique",
    personas: "DAF / DG",
    angle: "Justifier l'investissement face au risque de perte d'appels d'offres — pression des donneurs d'ordres.",
  },
  {
    icon: "⚙️",
    role: "Sponsor Métier",
    personas: "Dir. QSE · Resp. RSE · Dir. de Site",
    angle: "Apporter de la sérénité technique face à la complexité de la collecte des données Scope 3.",
  },
];

export const signals = [
  { signal: "Responsable RSE recruté < 6 mois", source: "LinkedIn Sales Nav", temp: "hot" as const, action: "Contact immédiat — besoin urgent de livrer vite" },
  { signal: "Offre d'emploi RSE active", source: "LinkedIn Jobs / Indeed", temp: "hot" as const, action: "Entrer avant le recrutement — \"on structure pendant que vous cherchez\"" },
  { signal: "Pas de rapport RSE publié (CA > 50M€)", source: "Google + site corporate", temp: "hot" as const, action: "CSRD obligatoire 2026 — urgence réglementaire" },
  { signal: "Nouveau DG nommé < 6 mois", source: "LinkedIn / Bodacc", temp: "warm" as const, action: "Il veut marquer son territoire — fenêtre parfaite" },
  { signal: "Levée de fonds / acquisition récente", source: "Bodacc / Crunchbase", temp: "warm" as const, action: "Pression investisseurs ESG — besoin de structurer" },
  { signal: "Exposant salon industriel (Global Industrie)", source: "CSV scrapé 1 200 exposants", temp: "warm" as const, action: "Ice breaker naturel — \"j'ai vu votre stand à GI…\"" },
];

export const personas = [
  { role: "Directeur de Site / Plant Manager", why: "Décideur opérationnel direct. Doit produire les données carbone pour consolider le bilan groupe. Problème concret, décision rapide.", angle: "\"La maison mère vous demande vos données — on vous aide à les produire.\"", priority: 1 },
  { role: "Directeur QSE / EHS Manager", why: "Prescripteur naturel, sous-prospecté. Gère déjà l'environnemental. Légitime pour initier un bilan carbone. Connaît les normes.", angle: "\"Vous gérez déjà le volet environnemental — on complète avec le carbone.\"", priority: 1 },
  { role: "Directeur RSE / Sustainability Manager", why: "Interlocuteur naturel mais souvent débordé. Si nouveau dans la fonction = besoin urgent d'aide externe pour livrer rapidement.", angle: "\"On vous fait gagner 6 mois — démarrage en 10 jours.\"", priority: 2 },
  { role: "DAF / Directeur Financier", why: "Pas décideur RSE mais gardien du budget. Convaincre avec du ROI : économies énergie via Enoptea + financement BpiFrance.", angle: "\"BpiFrance finance jusqu'à 6 000€. Le reste se rembourse en économies énergie.\"", priority: 3 },
];

export const flowSteps = [
  { num: "01", title: "Signal BEGES détecté", desc: "Base ADEME analysée en temps réel — échéance 4 ans ou Scope 3 = 0 détecté" },
  { num: "02", title: "Enrichissement contact", desc: "Visite LinkedIn du Dir. QSE / DAF + validation taille / CA / secteur" },
  { num: "03", title: "Séquence multicanale", desc: "Email ultra-personnalisé sur la donnée publique → relance tel 5-7 min" },
  { num: "04", title: "Proposition & Closing", desc: "Soutenance en direct — pas d'envoi PDF à l'aveugle" },
];

export const systemCards = [
  {
    icon: "🗄️",
    title: "Base BEGES · data.ademe.fr",
    desc: "Workflow d'analyse Open Data ADEME en temps réel. Filtrage PACA/AURA, scoring par signal légal (échéance + Scope 3 = 0). 20 prospects qualifiés dans cette démo.",
    tools: ["data.ademe.fr", "Python / pandas", "CSV export"],
    num: "01",
  },
  {
    icon: "📊",
    title: "CRM & Pipeline",
    desc: "Chaque prospect entre dans un pipeline structuré avec statut, température, signal d'achat détecté et prochaine action. Reporting hebdomadaire pour Yves.",
    tools: ["HubSpot", "Notion", "Google Sheets"],
    num: "02",
  },
  {
    icon: "📧",
    title: "Séquences personnalisées",
    desc: "Cold emails ultra-personnalisés sur la donnée BEGES publique. Pas de template générique — chaque email cite l'année du bilan et le Scope 3 manquant de l'entreprise.",
    tools: ["Lemlist", "La Growth Machine", "Calendly"],
    num: "03",
  },
  {
    icon: "📈",
    title: "Veille continue",
    desc: "Alertes automatiques : nouveau Responsable RSE recruté, appel d'offres CSRD, levée de fonds. L'intervenir au bon moment = taux de réponse x3.",
    tools: ["Google Alerts", "LinkedIn Jobs", "Societeinfo"],
    num: "04",
  },
];

export const proofStats = [
  { num: "20", label: "Prospects issus du registre BEGES dans cette démo" },
  { num: "15–20%", label: "Taux de réponse attendu B2B industrie (séquence personnalisée)" },
  { num: "8 sem.", label: "De la signature au livrable final bilan carbone" },
  { num: "6 000€", label: "Financement BpiFrance Diag Décarbon'Action éligible" },
];

export const sequenceSteps = [
  { day: "01", channel: "Identification du signal", action: "Détection via base BEGES", detail: "Bilan 2022 à renouveler, ou Scope 3 = 0 malgré S1+S2 élevés" },
  { day: "02", channel: "LinkedIn", action: "Visite du profil Dir. QSE / DAF", detail: "Créer de la familiarité avant tout contact direct" },
  { day: "03", channel: "Cold Email", action: "Email ultra-personnalisé (basé sur la data publique)", detail: "Accroche sur le signal détecté, pas sur ekodev" },
  { day: "04", channel: "Téléphone", action: "Relance téléphonique — call de qualification 5-7 min", detail: "Script pitch consultant — voir ci-dessous" },
];

export const emailTemplate = {
  subject: "Objet : CSRD 2026 — [Nom entreprise] est-elle prête ?",
  body: `Bonjour [Prénom],

Je me permets de vous contacter car [signal d'achat détecté : recrutement RSE / absence de rapport / salon Global Industrie…].

Avec la directive CSRD qui s'applique aux entreprises de votre taille dès 2026, les filiales industrielles en région Sud se retrouvent souvent à devoir produire un bilan carbone dans des délais serrés — sans les ressources internes pour le faire.

Chez ekodev (groupe EPSA, B Corp certifié), on accompagne les filiales industrielles de la région Sud dans la réalisation de leur premier bilan carbone — de la collecte des données à la stratégie de réduction, en 8 semaines.

Nos clients réduisent en moyenne 15 à 20% de leurs coûts énergétiques grâce aux synergies avec Enoptea (groupe EPSA). Et BpiFrance finance jusqu'à 6 000€ via le Diag Décarbon'Action.

Ça vaut un échange de 20 minutes ?

Adam Telmat — Business Developer, ekodev Marseille`,
};

export const phoneScript = [
  {
    time: "Accroche",
    text: "\"Bonjour [Prénom], Adam Telmat du cabinet ekodev. Je vous appelle car j'ai analysé les données publiques de votre dernier BEGES de [Année].\"",
  },
  {
    time: "Diagnostic",
    text: "\"Je vois que vous avez une forte empreinte industrielle, mais que votre Scope 3 n'est pas encore totalement structuré, alors que la pression de la CSRD et de vos donneurs d'ordres s'accélère.\"",
  },
  {
    time: "Problème commun",
    text: "\"La plupart des acteurs de votre secteur savent qu'ils doivent mettre à jour leur trajectoire, mais ils perdent un temps fou sur la collecte de données au lieu de se concentrer sur le plan d'action.\"",
  },
  {
    time: "Valeur ekodev",
    text: "\"Chez ekodev, notre métier ce n'est pas juste de vous fournir un logiciel de calcul. C'est de cadrer votre périmètre, d'embarquer vos équipes et de transformer cette contrainte réglementaire en une vraie feuille de route climat opérationnelle.\"",
  },
  {
    time: "CTA (closing)",
    text: "\"L'objectif de mon appel n'est pas de vous vendre une mission aujourd'hui, mais de prendre 20 minutes mardi prochain pour comprendre où vous en êtes dans la préparation de votre prochaine échéance. Êtes-vous disponible mardi à 10h ?\"",
  },
];

export const objections = [
  {
    q: "\"On regarde déjà des plateformes comme Greenly ou Sami.\"",
    a: "Ces outils SaaS sont excellents pour mesurer. Mais un outil ne décide pas à votre place. Dès qu'il faut cadrer un périmètre complexe (multi-sites), traiter le Scope 3 auprès de vos fournisseurs, et animer des ateliers de conduite du changement, c'est l'accompagnement humain d'ekodev qui crée la bascule entre un 'bon reporting' et une 'vraie transition'.",
  },
  {
    q: "\"Nous n'avons pas le temps / pas les données.\"",
    a: "C'est justement la valeur d'un cabinet. On ne vous demande pas d'être prêts. Notre méthodologie consiste précisément à auditer ce que vous avez, structurer la collecte, et faire le travail d'ingénierie à votre place.",
  },
  {
    q: "\"Pas de budget cette année.\"",
    a: "Ne pas anticiper vous coûtera plus cher : perte de points dans les appels d'offres B2B, inefficacité énergétique non détectée. De plus, nos missions peuvent s'inscrire dans des dispositifs d'aide — ex: Diag Décarbon'Action Bpifrance.",
  },
  {
    q: "\"On n'est pas concernés par la CSRD.\"",
    a: "Même hors obligation directe, vos clients grands comptes vont vous demander vos données carbone pour leur propre reporting. Les banques et assureurs conditionnent déjà leurs financements à un bilan ESG. Et sur les appels d'offres publics, c'est un critère croissant.",
  },
];

export const discoveryQuestions = [
  {
    category: "Cadrage du Périmètre",
    sub: "Évaluer la complexité",
    items: [
      "Combien d'entités juridiques et de sites physiques sont concernés ?",
      "Quelle est la part de votre activité à l'international vs France ?",
      "Quels sont, selon vous, les postes d'émissions les plus critiques sur votre chaîne de valeur (Scope 3 : achats, fret, fin de vie des produits) ?",
    ],
  },
  {
    category: "Gouvernance & Maturité",
    sub: "Identifier les alliés internes",
    items: [
      "Qui est le propriétaire de la donnée en interne (Achats, RH, Finance) ?",
      "Avez-vous déjà un logiciel SIRH ou ERP pour extraire facilement ces flux ?",
      "Qui portera le projet au Codir pour valider le plan de transition ?",
    ],
  },
  {
    category: "Les Enjeux Réels",
    sub: "Trouver le vrai 'Pain Point'",
    items: [
      "Quel est le déclencheur aujourd'hui : Mise en conformité pure ?",
      "Pression d'un client majeur ou donneur d'ordres ?",
      "Volonté d'optimiser vos coûts énergétiques via la démarche ?",
    ],
  },
];

export const proposalSteps = [
  { num: "01", title: "Synthèse exécutive", sub: "Reformulation de leurs enjeux — on montre qu'on a compris leur douleur" },
  { num: "02", title: "Périmètre & Méthodologie", sub: "Cadrage S1/S2/S3, méthodes de collecte, cadres ACT" },
  { num: "03", title: "Gouvernance du projet", sub: "Qui fait quoi — Rôle d'ekodev vs Rôle du client" },
  { num: "04", title: "Livrables", sub: "Bilan GES, Synthèse direction, Plan d'action et trajectoire chiffrée" },
  { num: "05", title: "Planning & Budget", sub: "Jalons : Kick-off → Collecte → Restitution" },
];

export const closingRule = {
  title: "La Règle d'Or du Closing",
  body: "Une proposition commerciale complexe (15k€ – 50k€+) ne s'envoie jamais seule par email. La prochaine étape est d'imposer, dès le premier RDV, la date de la réunion de soutenance. J'envoie le PDF 2h avant cette réunion. L'objectif est de lire la proposition avec eux, de traiter les objections budgétaires en direct, et de valider les prochaines étapes décisionnelles avec le DAF.",
  steps: [
    { icon: "📋", label: "RDV de découverte", sub: "Poser les questions de qualification" },
    { icon: "📅", label: "Fixer la soutenance", sub: "Date imposée dès ce premier RDV" },
    { icon: "📄", label: "Envoi du PDF", sub: "2h avant la réunion seulement" },
    { icon: "🤝", label: "Closing en direct", sub: "Objections traitées en temps réel" },
  ],
};

export const ekodevArguments = [
  {
    icon: "🔄",
    title: "Vous n'achetez pas un calcul",
    body: "Vous achetez une transformation. Contrairement à un SaaS qui s'arrête au tableau de bord, ekodev vous accompagne sur l'animation, la formation (Fresque du Climat) et la stratégie (Biodiversité, RSE).",
  },
  {
    icon: "⚡",
    title: "La force du Groupe EPSA",
    body: "Une fois les postes d'émissions identifiés, nous pouvons connecter le client aux experts d'Enoptea et Energiency pour aller chercher un ROI financier immédiat sur la facture énergétique. Le bilan carbone devient un centre de profit, pas un coût.",
  },
];

export const vsTable = {
  headers: ["Critère", "Greenly", "Sami", "Hellocarbo", "ekodev (EPSA)"],
  rows: [
    { criterion: "Modèle", values: ["SaaS self-service", "SaaS + consultant std.", "SaaS self-service", "Mission conseil sur mesure"], marks: ["neutral", "neutral", "neutral", "neutral"] },
    { criterion: "Accompagnement humain", values: ["Option payante", "Limité", "Coach basique", "Consultant dédié tout au long"], marks: ["cross", "half", "cross", "check"] },
    { criterion: "Qualité Scope 3", values: ["Automatisé, S3 variable", "Robuste (110k facteurs)", "S3 simplifié", "Collecte terrain fournisseurs"], marks: ["half", "check", "half", "check"] },
    { criterion: "Stratégie décarbonation", values: ["Simulateurs auto.", "Semi-automatisé", "Plan standard", "Feuille de route sur mesure 2030"], marks: ["cross", "half", "cross", "check"] },
    { criterion: "Conduite du changement", values: ["—", "—", "—", "Fresques, ateliers, animation"], marks: ["cross", "cross", "cross", "check"] },
    { criterion: "RSE globale", values: ["Carbone seulement", "Carbone + ESG reporting", "Carbone + ACV", "Climat + Mobilité + Bio + Sté mission"], marks: ["neutral", "neutral", "neutral", "check"] },
    { criterion: "Synergie coût/énergie", values: ["—", "—", "—", "Enoptea + Energiency (EPSA)"], marks: ["cross", "cross", "cross", "check"] },
    { criterion: "Financement BpiFrance", values: ["—", "—", "—", "Éligible Diag Décarbon'Action (−6 000€)"], marks: ["cross", "cross", "cross", "check"] },
    { criterion: "Auditable CSRD", values: ["Plans supérieurs", "Post-SGS incertain", "Oui", "Certifié, vérification tierce possible"], marks: ["half", "half", "half", "check"] },
  ],
};

export const ltvYears = [
  { label: "Année 1 — Entrée", amount: "12–15k€", missions: "Bilan carbone (scopes 1, 2, 3)\nDiagnostic RSE initial\nAteliers de sensibilisation", year: 1 },
  { label: "Année 2 — Développement", amount: "25–35k€", missions: "Stratégie climat + feuille de route 2030\nAccompagnement CSRD\nPlan d'action et indicateurs", year: 2 },
  { label: "Année 3 — Récurrence", amount: "40–50k€", missions: "Reporting annuel + mise à jour bilan\nFormation équipes + fresques\nPlan mobilité employeur", year: 3 },
];

export const crossSellCards = [
  { icon: "⚡", title: "Enoptea", desc: "Optimisation énergétique data-driven. Le bilan carbone identifie les postes — Enoptea génère les économies mesurables. ROI tangible pour le DAF.", badge: "Synergie directe" },
  { icon: "🤖", title: "Energiency", desc: "IA industrielle pour l'analyse énergie/CO2. Pour les filiales manufacturières avec des données de process complexes.", badge: "Upsell naturel" },
  { icon: "🚲", title: "Plan mobilité employeur", desc: "Le bilan carbone révèle les émissions scope 3 liées aux déplacements. Déclenche naturellement un plan de mobilité durable.", badge: "Extension offre" },
  { icon: "🌱", title: "Stratégie biodiversité", desc: "Les industriels avec des sites sensibles ont une double obligation. L'entrée par le carbone ouvre le sujet biodiversité.", badge: "Mission annexe" },
];

export const nextSteps = [
  { day: "J+2", icon: "📞", title: "Relance téléphonique", desc: "Bonne réception ? Questions sur la méthodologie ? Proposer 15 min." },
  { day: "J+5", icon: "🤝", title: "RDV de closing", desc: "Lever les dernières objections. Présenter le consultant dédié. Confirmer le périmètre." },
  { day: "J+7", icon: "📄", title: "Bon de commande", desc: "Contrat + dossier BpiFrance. Kick-off fixé dans les 10 jours." },
  { day: "J+14", icon: "🚀", title: "Kick-off projet", desc: "Réunion de lancement. Équipe présentée. Collecte des premières données." },
];

export const navLinks = [
  { href: "#cible", label: "Cible" },
  { href: "#systeme", label: "Système" },
  { href: "#radar", label: "Radar ADEME", highlight: true },
  { href: "#prospection", label: "Prospection" },
  { href: "#proposition", label: "Proposition" },
  { href: "#ltv", label: "LTV" },
];
