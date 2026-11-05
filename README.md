# Candor Digital

The public website for Candor Digital, a Melbourne digital marketing practice.

Static site built with [Eleventy](https://www.11ty.dev/). The pages share one layout, so the nav, footer and audit form are written once. Netlify builds it on every push to `main`.

## Structure

```
src/
  index.njk                 homepage (summary of everything, links to pages)
  services/*.njk            one page per service; content lives in front matter
  work/*.njk                case studies
  about.njk, contact.njk    inner pages
  _includes/base.njk        <head>, nav, footer, scripts
  _includes/service.njk     service page layout
  _includes/case-study.njk  case study layout
  _includes/audit-form.njk  the Netlify form (used on home and /contact/)
  _data/eleventyComputed.js JSON-LD schema built from each page's front matter
css/style.css               all styling; colours are tokens at the top
js/main.js                  interactions; js/analytics.js loads GA4 + Meta Pixel
assets/                     favicons and share image
```

## Local preview

```
npm install
npm run dev
```

Then open http://localhost:8090. Pages rebuild when you save.

## Adding a service page

Copy `src/services/meta-ads.njk`, rename it, and edit the front matter. It appears in the services hub, the "pairs well with" lists and the sitemap automatically.

## Deploying

Push to `main`. Netlify runs `npm run build` and publishes `_site/`. Each production deploy uses Netlify credits, so batch changes and push once.
