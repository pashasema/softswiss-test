# SOFTSWISS Test Page

A test landing page built with HTML, SCSS, vanilla JavaScript, and Vite.

## Requirements

- Node.js 18+
- npm

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
# Build the project
npm run build

# Preview the build locally (optional)
npm run preview
```

Output is written to `dist/`:

- `dist/index.html`
- `dist/assets/` — CSS and JS
- `dist/images/` — images from `public/images/`

## Deploy

Upload the **contents of `dist/`**, not the entire repository.

```bash
npm install
npm run build
# then copy dist/ to your host (FTP, rsync, scp, etc.)
```

Node.js on the server is **not required** if you build locally or in CI.

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Local development |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |

## Project structure

```
index.html       — page markup
public/images/   — static assets (icons, hero images)
src/             — JS and SCSS
dist/            — build output (not committed to git)
```
