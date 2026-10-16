# Candor Digital

The public website for Candor Digital — a Melbourne-based digital marketing practice.

Plain static site: HTML, CSS, and vanilla JS, no build step or framework. Deploys directly to Netlify from this repo.

## Structure

```
index.html        the whole page
css/style.css      all styling, animations, light/dark theme
js/main.js         scroll reveal, cursor, tilt cards, theme toggle, timeline fill
assets/            favicon + social share image
netlify.toml       deploy config
```

## Local preview

No build step needed — any static server works:

```
python3 -m http.server 8080
```

Then open http://localhost:8080

## Editing content

All page copy lives directly in `index.html`. Colors and fonts are CSS custom properties at the top of `css/style.css` (`:root` for light mode, `:root[data-theme="dark"]` for dark) — change a value there and it updates everywhere.

## Deploying

Connected to Netlify for automatic deploys — every push to `main` goes live within a minute or two. Custom domain: candordigital.com.au.
