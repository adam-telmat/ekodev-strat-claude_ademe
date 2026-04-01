export const heroMeta = [
  { label: "Préparé par", value: "Adam Telmat" },
  { label: "Pour", value: "Yves Daumas — ekodev Sud-Est" },
  { label: "Stratégie", value: "Grands comptes / LTV 3 ans" },
  { label: "Disponible", value: "Avril 2026", highlight: true },
];

export const icpCards = [
  { icon: "🏭", title: "Industrie manufacturière", desc: "Zone Fos-sur-Mer / Berre — plus grande zone industrielle de France hors Paris. Sous-traitants de groupes cotés soumis à CSRD en cascade.", priority: 1 },
  { icon: "🏗️", title: "BTP / Construction", desc: "Filiales régionales Vinci, Bouygues, Eiffage. La maison mère a son Big Four — la filiale locale doit produire ses propres données carbone.", priority: 1 },
  { icon: "⚡", title: "Énergie / Chimie", desc: "TotalEnergies, Air Liquide, Solvay — sites industriels PACA. Pression réglementaire maximale, budget RSE structuré.", priority: 2 },
  { icon: "🌾", title: "Agroalimentaire", desc: "Filiales de groupes cotés en PACA. Pression des donneurs d'ordres GMS qui exigent un bilan carbone fournisseur.", priority: 2 },
  { icon: "🏥", title: "Santé / Pharma", desc: "Groupes hospitaliers privés régionaux (Elsan, Almaviva). Le système de soins = 8% des émissions nationales. Enjeu RH fort.", priority: 2 },
  { icon: "🚛", title: "Logistique / Transport", desc: "Marseille = 1er port de France. Scope 3 massif. Filiales logistiques de groupes avec obligation mobilité employeur.", priority: 3 },
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
  { num: "01", title: "Identification cible", desc: "Scoring des filiales industrielles PACA via signaux d'achat LinkedIn + Bodacc" },
  { num: "02", title: "Qualification", desc: "Enrichissement des contacts, validation du budget et du timing réglementaire" },
  { num: "03", title: "Prise de RDV", desc: "Séquence multicanale email + LinkedIn + téléphone sur 14 jours" },
  { num: "04", title: "Proposition", desc: "Proposition sur mesure avec vision LTV 3 ans et financement BpiFrance" },
];

export const systemCards = [
  { icon: "🎯", title: "Sourcing des prospects", desc: "Liste qualifiée de 80 à 120 filiales industrielles PACA. Scoring par signaux d'achat : recrutement RSE, CSRD, nouveau DG, salon.", tools: ["LinkedIn Sales Nav", "Pappers", "Bodacc"], num: "01" },
  { icon: "📊", title: "CRM & pipeline", desc: "Chaque prospect entre dans un pipeline structuré avec statut, température, et prochaine action. Reporting hebdomadaire automatisé.", tools: ["HubSpot / Pipedrive", "Notion", "Google Sheets"], num: "02" },
  { icon: "📧", title: "Séquences automatisées", desc: "Templates email personnalisés + relances automatiques. Chaque séquence est testée, mesurée et optimisée sur les taux d'ouverture.", tools: ["Lemlist / La Growth Machine", "Calendly"], num: "03" },
  { icon: "📈", title: "Veille & signaux", desc: "Alertes automatiques sur les mouvements des prospects : recrutement, publication, levée de fonds. Permet d'intervenir au bon moment.", tools: ["Google Alerts", "LinkedIn", "Societeinfo"], num: "04" },
];

export const proofStats = [
  { num: "80–120", label: "Prospects qualifiés dans le pipe initial" },
  { num: "15–20%", label: "Taux de conversion email B2B industrie" },
  { num: "8 sem.", label: "De la signature au livrable final" },
  { num: "6 000€", label: "Financement BpiFrance Diag Décarbon'Action" },
];

export const sequenceSteps = [
  { day: "J0", channel: "LinkedIn", action: "Visite de profil + connexion personnalisée", detail: "Mentionner un signal d'achat détecté" },
  { day: "J1", channel: "Email #1", action: "Email d'approche — template ci-dessous", detail: "Objet : CSRD + nom de l'entreprise" },
  { day: "J3", channel: "LinkedIn", action: "Commentaire intelligent sur un post du prospect", detail: "Apporter de la valeur, pas de la promo" },
  { day: "J5", channel: "Téléphone", action: "Appel de 2 min — script ci-dessous", detail: "Référence à l'email envoyé" },
  { day: "J7", channel: "Email #2", action: "Relance avec cas client même secteur", detail: "Preuve sociale + résultat concret" },
  { day: "J10", channel: "LinkedIn", action: "Message vocal LinkedIn (60 sec max)", detail: "Plus personnel, taux de réponse +300%" },
  { day: "J14", channel: "Email #3", action: "Email de rupture — dernière chance", detail: "\"Je ne vais plus vous relancer. Voici ce que vous ratez.\"" },
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
  { time: "0–15 sec", text: "\"Bonjour [Prénom], Adam de chez ekodev — je ne vous dérange pas 2 minutes ?\"" },
  { time: "15–35 sec", text: "\"Je vous contacte suite à mon email sur la directive CSRD. Avec l'obligation de bilan carbone qui arrive en 2026 pour les entreprises de votre taille, on voit beaucoup de filiales industrielles en région Sud qui se retrouvent en retard sur le sujet.\"" },
  { time: "35–65 sec", text: "\"Est-ce que vous avez déjà réalisé un bilan carbone ? Avez-vous une personne dédiée sur ce sujet en interne ?\" — Écoute active." },
  { time: "65–80 sec", text: "\"Ce que je propose : un échange de 30 min pour vous présenter comment on a accompagné [client même secteur]. Mardi 10h ou jeudi 14h, qu'est-ce qui vous convient ?\"" },
];

export const objections = [
  { q: "\"C'est trop cher, on n'a pas le budget.\"", a: "BpiFrance finance jusqu'à 6 000€ via le Diag Décarbon'Action. Et nos clients économisent en moyenne 2 à 3 fois le coût de la mission en coûts énergétiques la première année via les synergies avec Enoptea." },
  { q: "\"On peut le faire avec Greenly ou Sami, c'est moins cher.\"", a: "Ces outils mesurent. ekodev transforme. Un logiciel ne mène pas vos ateliers internes, ne gère pas votre scope 3 terrain, et n'est pas auditable CSRD. 70% des projets logiciels carbone s'essoufflent sans expert dédié." },
  { q: "\"On n'est pas concernés par la CSRD.\"", a: "Même hors obligation directe, vos clients grands comptes vont vous demander vos données carbone pour leur propre reporting. Les banques et assureurs conditionnent déjà leurs financements à un bilan ESG." },
  { q: "\"On n'a pas le temps ni les ressources.\"", a: "C'est exactement pour ça qu'on est là. On prend en charge 90% du travail. Votre équipe donne 2 à 3 journées sur 8 semaines. Notre méthodologie est rodée." },
];

export const discoveryQuestions = [
  { category: "Périmètre", items: ["Combien de sites en France et à l'international ?", "Combien d'entités juridiques concernées ?", "Effectif total du périmètre ?"] },
  { category: "Données existantes", items: ["Données énergie centralisées ? ERP disponible ?", "Données achats, transport, déchets accessibles ?", "Qui est propriétaire des données en interne ?"] },
  { category: "Maturité RSE", items: ["Premier bilan ou mise à jour ?", "Démarche CSRD en cours ? Notation EcoVadis ?", "Objectifs climat définis par la maison mère ?"] },
  { category: "Deadline & urgence", items: ["Deadline réglementaire ou client qui conditionne le timing ?", "Exercice de référence souhaité ?", "Appel d'offres ou audit prévu ?"] },
  { category: "Budget & financement", items: ["Budget RSE alloué cette année ?", "Connaissance du Diag Décarbon'Action BpiFrance ?", "Qui valide le budget — DG ou DAF ?"] },
  { category: "Ambition", items: ["Conformité seule ou vraie stratégie de décarbonation ?", "Feuille de route 2030 souhaitée ?", "Quelle communication envisagée autour du bilan ?"] },
];

export const proposalSteps = [
  { num: "01", title: "Contexte & enjeux réglementaires" },
  { num: "02", title: "Compréhension de la situation client" },
  { num: "03", title: "Notre approche & méthodologie" },
  { num: "04", title: "Livrables & planning 8 semaines" },
  { num: "05", title: "Budget & financement BpiFrance" },
  { num: "06", title: "Pourquoi ekodev" },
  { num: "07", title: "Vision 3 ans du compte ★" },
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
