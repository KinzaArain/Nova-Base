# Nova Base 🚀

A digital literacy launchpad — three courses that take a complete beginner from "what is a CPU" to "how do I evaluate a source and find exactly what I need online," with an auto-generated, QR-verifiable certificate at the end.

**Live demo:** _add your Vercel URL here after deploying_

## Why this project exists

Most digital-literacy gaps aren't about intelligence — they're about nobody ever teaching the basics in order. Nova Base is structured as three sequential courses:

1. **Computer Basics** — hardware, the OS, keyboard shortcuts, basic maintenance
2. **Setting Up Your Workspace** — safely finding, downloading, and installing real software
3. **Master Class in Effective Browsing** — search operators, evaluating sources, managing your digital footprint

Complete all three, pass a 10-question final assessment (≥70%), and the app generates a downloadable PDF certificate with a unique ID and a QR code that links to a live verification page.

## Tech stack

- **React 19 + Vite** — fast dev/build tooling
- **Tailwind CSS v4** — utility-first styling, custom design tokens (see `src/index.css`)
- **React Router** — client-side routing (Home / Course / Assessment / Verify)
- **jsPDF + qrcode** — client-side certificate generation with an embedded verification QR code
- **Trilingual UI** — English, Urdu (RTL), and Korean, via a lightweight `LanguageContext` (see `src/i18n/`)

## Project structure

```
src/
  components/     Header, LanguageSwitcher, CourseCard, ProgressBar
  data/           courses.js — all course/module/quiz content lives here
  i18n/           LanguageContext + translations.js
  lib/            progress.js (localStorage progress tracking)
                  certificate.js (certificate issuing, verification, PDF export)
  pages/          Home, CoursePage, AssessmentPage, VerifyPage
```

## Running locally

```bash
npm install
npm run dev
```

## Deploying

- **GitHub:** push this folder as its own repo.
- **Vercel:** import the repo, framework preset "Vite," no extra config needed.

## Known limitation (by design, for an MVP)

The certificate registry currently lives in `localStorage`, so a certificate only verifies on the same browser that issued it. To make verification work across any device, swap the read/write functions in `src/lib/certificate.js` for a small backend (Supabase or Firebase both work well with zero server maintenance) — the rest of the app doesn't need to change.

## Content translation

The UI chrome (nav, buttons, labels) is translated into English, Urdu, and Korean. Course/module content is currently English-only — translating `src/data/courses.js` into `ur`/`ko` variants is the natural next step.

---

Part of a larger goal: building free, multilingual software-engineering education that bridges South Asia and East Asia.
