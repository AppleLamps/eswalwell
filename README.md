# Swalwell Campaign Finance Dashboard

A single-page static HTML dashboard for campaign finance risk analysis with modular CSS/JS assets and mobile UX improvements.

## Project Structure

- `index.html` – Main entry file used by Vercel (root page).
- `css/styles.css` – All styling and responsive/mobile UI rules.
- `js/main.js` – Interactive behavior (filtering, charts, navigation helpers, back-to-top, mobile quick-jump FAB).

## Features

- Clean, modular asset structure:
  - Styles moved into `css/`
  - JavaScript moved into `js/`
- Scroll-to-section sticky navigation with active section highlighting.
- Risk finding filters by severity.
- Social chart rendering from embedded dataset.
- Responsive tables with horizontal overflow support.
- Mobile-friendly floating section jump FAB for faster one-handed navigation.
- Back-to-top floating action button.
- Accessibility helpers (skip link, focus styles, smooth anchor behavior).

## Local Development

1. Open `index.html` directly in a browser, or serve the folder with any static server.
2. Keep all files in the same structure when editing.

Example using Python:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy on Vercel

This is a plain static site, so deployment is straightforward:

1. Push the repository to your Git provider.
2. Import the repo into Vercel.
3. Ensure project root points to this directory.
4. Use default build settings (no build step needed).
5. Set the **Output Directory** to `.` (repo root).
6. Deploy.

Vercel will serve `index.html` as the homepage.

## Content Notes

- The dashboard content currently lives in static HTML sections with hardcoded data.
- If you add/remove sections, update:
  - section `id` targets used by nav/FAB links,
  - optional scroll-spy behavior in `js/main.js` (auto-detects linked anchors with `href^="#"`),
  - and any related copy in `index.html`.

## Browser Notes

- Supports modern browsers.
- Works best on desktop and mobile with CSS media-query responsive styles.

## Maintenance

- If you reintroduce or remove any JavaScript/CSS file, ensure `index.html` references stay correct:
  - `css/styles.css`
  - `js/main.js`
