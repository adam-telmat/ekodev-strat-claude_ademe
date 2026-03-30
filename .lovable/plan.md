

## Reconstruction — Adam Telmat × ekodev — Architecture Premium

### Design System
- Thème dark avec palette verte (#1a6b3c → #3dcc7a), gold (#c8a84b), fond ultra-sombre (#080f0b)
- Fonts : Syne (headings), DM Sans (body), DM Mono (labels/tags)
- Texture noise en overlay, glows radiaux, animations fade-in au scroll
- Variables CSS custom dans index.css pour tout le design token system

### Architecture Fichiers (Clean Separation)

**Layout & Navigation**
- `components/layout/Navbar.tsx` — Nav fixe glassmorphism avec liens d'ancrage
- `components/layout/SectionWrapper.tsx` — Wrapper réutilisable (eyebrow num + line + title)
- `components/layout/Divider.tsx` — Séparateur gradient

**Sections (1 fichier = 1 section)**
- `components/sections/HeroSection.tsx` — Hero plein écran avec meta-items + scroll hint animé
- `components/sections/CibleSection.tsx` — Section 01 : conviction, ICP grid, signaux d'achat, personas
- `components/sections/SystemeSection.tsx` — Section 02 : flow 4 étapes, system cards, proof bar stats
- `components/sections/ProspectionSection.tsx` — Section 03 : séquence timeline, email template, phone script, objections
- `components/sections/PropositionSection.tsx` — Section 04 : questions découverte, proposal steps, VS table
- `components/sections/LtvSection.tsx` — Section 05 : LTV grid année 1-3, total, cross-sell, next steps
- `components/sections/FooterCta.tsx` — CTA final avec glow + bouton contact

**Composants UI Réutilisables**
- `components/ui/Tag.tsx` — Tag avec dot pulsant
- `components/ui/IcpCard.tsx` — Card secteur avec icône + badge priorité
- `components/ui/PersonaCard.tsx` — Card persona avec priorité colorée
- `components/ui/StatementBlock.tsx` — Bloc citation avec guillemet décoratif
- `components/ui/EmailPreview.tsx` — Aperçu email macOS-style (dots rouge/jaune/vert)
- `components/ui/PhoneScript.tsx` — Script téléphonique avec timeline
- `components/ui/ObjectionCard.tsx` — Objection (rouge) / Réponse (vert)

**Hooks & Utils**
- `hooks/useFadeIn.ts` — IntersectionObserver pour animations au scroll avec stagger
- `lib/data.ts` — Toutes les données (ICP, signaux, personas, séquences, LTV, etc.) centralisées

**Page**
- `pages/Index.tsx` — Assemble toutes les sections dans l'ordre

### Animations & Interactions
- Fade-in + translateY au scroll via IntersectionObserver
- Stagger delay sur les grilles (cards apparaissent en cascade)
- Pulse animé sur le dot du tag hero
- Scroll-line animée dans le hero
- Hover : cards lift + border glow, flow steps glow, table rows highlight
- Smooth scroll sur les liens nav

### Responsive
- Desktop-first, breakpoint 768px pour mobile
- Nav links masqués sur mobile
- Grilles passent en 1 colonne
- Padding réduit, typo fluid via clamp()

