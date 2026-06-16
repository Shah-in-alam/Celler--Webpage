# Celler — Neighbourhood Wine Shop

[![CodeQL](https://github.com/Shah-in-alam/Celler--Webpage/actions/workflows/codeql.yml/badge.svg)](https://github.com/Shah-in-alam/Celler--Webpage/actions/workflows/codeql.yml)

Single-page website for **Celler**, a neighbourhood wine shop in Antwerp, Belgium.
_Good wine, for everyone._ From the people behind the wine bar Tannin — its own
brand, its own warm, contemporary identity.

Built with **React + Vite**. Mobile-first, fully responsive, bilingual
(EN/NL toggle), accessible, and reduced-motion friendly.

## Run it

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Sections

Hero · About (Tawat's story + accessible-wine philosophy) · Wine selection ·
Wine shop (pick up in store or delivered, behind an 18+ age check) ·
Visit / Contact (address, hours, phone, email, Instagram, map).

## Editing content (no React knowledge needed)

- **Wines** → `src/data/wines.js` — name, region, grape, tasting note (EN/NL), price.
- **All other text / translations** → `src/i18n.jsx` (English and Dutch side by side).
- **Photos** → search for `PLACEHOLDER` in `src/components/About.jsx`. The coloured
  block marked "swap me" is where a real photo goes.
- **Address / hours / contact** → `src/i18n.jsx` (`visit`) and `src/components/Visit.jsx`
  (phone/email/Instagram links + map URL).

## Code quality

Every push and pull request to `main` is scanned by **[CodeQL](https://codeql.github.com/)**
(`.github/workflows/codeql.yml`) using the `security-and-quality` query suite.
Findings show up in the **Security → Code scanning** tab and as checks on each PR.

## Belgium / legal

- An **18+ age check** gates the wine-shop section (remembered via `localStorage`).
- An "enjoy responsibly / 18+" note appears in the footer.

## Design

- Warm, contemporary, approachable — _wine for everyone_, not a luxury look.
- Palette: plum-burgundy anchor + warm amber accent, paper off-white, charcoal.
- Fonts: Fraunces (characterful display serif) + Inter (clean, readable body).
- Custom stylesheet in `src/styles.css` (no CSS framework).
- Accessibility: skip link, visible keyboard focus, semantic landmarks,
  `prefers-reduced-motion` respected, high-contrast colours.
