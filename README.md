# Cloud4Green website

Marketing site for Cloud4Green, built with React 19, Vite, Tailwind CSS v4 and React Router.

## Scripts

```bash
npm install        # install dependencies
npm run dev        # dev server (HTTPS, self-signed - click through the browser warning)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint
```

## Deploying

Run `npm run build` and upload the contents of `dist/` to the web root.

After changing page copy, refresh the text crawlers read, then commit `src/data/seoSnapshot.json`:

```bash
npm run build && npm run seo:snapshot && npm run build
```

The snapshot step needs Edge or Chrome on your machine. Netlify only needs the committed JSON.

The build writes one HTML file per route (each with its own title and meta tags), plus
`sitemap.xml`, `robots.txt`, `_redirects` (Netlify) and `.htaccess` (Apache / cPanel).
Routes and SEO data live in `src/config/seo.js`; don't edit the generated files by hand.

## Google reviews

`/customers` shows the live rating and up to five reviews from the Google listing, through
`public/api/google-reviews.php`. Without the setup below it shows the hand-kept rating and
reviews in `src/data/googleReviews.js`, which the page and the home marquee always use.

1. In Google Cloud, create a project, attach billing and enable **Places API (New)**.
2. Create an API key. Restrict it to Places API (New) and to the cPanel server's IP address.
3. Find the place ID with Google's Place ID Finder.
4. Create `c4g-google.php` one level **above** the web root, so a deploy can't publish it:

   ```php
   <?php
   return array(
       'apiKey' => 'YOUR_KEY',
       'placeId' => 'YOUR_PLACE_ID',
       'dailyLimit' => 100,
   );
   ```

Google's policy forbids caching Places content, so each `/customers` visit is a billed
request. `dailyLimit` caps that; past it the page falls back until the next UTC day. Set a
budget alert in Google Cloud as well. The reviews must stay unedited and keep their author
name, avatar, profile link, Google Maps credit and ordering notice.

## Project structure

```
cloud4green/
├── index.html              HTML shell (Vite entry)
├── public/                 files served as-is: favicon, logos, og-image, PDF catalogue
├── scripts/                one-off generators for the hero map/globe dot data
├── src/
│   ├── main.jsx            app entry: fonts, global CSS, <App />
│   ├── App.jsx             routes
│   ├── index.css           Tailwind setup and global styles
│   ├── pages/              one file per route
│   │   ├── products/       /products/*
│   │   └── services/       /services/*
│   ├── components/
│   │   ├── layout/         Navbar (+ navbar/ parts), Footer, Container, Section, SEO
│   │   ├── ui/             shadcn/ui primitives
│   │   ├── sections/       homepage sections (and shared ones like enterprise-cta)
│   │   ├── <feature>/      sections for one page: automation, certifications,
│   │   │                   consulting, e-learning, enterprise, enterprise-labs, ...
│   │   └── common/ motion/ backgrounds/ brand/ illustrations/ preloader/
│   ├── hooks/              custom React hooks (useXxx.js)
│   ├── config/             navigation, SEO, downloads
│   ├── data/               static content (FAQs, testimonials, ...)
│   ├── lib/ utils/         helpers
│   ├── styles/             component stylesheets
│   └── assets/             images and fonts imported from code
└── package.json
```

### Conventions

- Folders: `kebab-case`. Components: `PascalCase.jsx`. Hooks: `useCamelCase.js`.
- Import through the `@/` alias (`@/components/...`), which points to `src/`.
- Images used in code go in `src/assets/images/`; files that need a fixed URL go in `public/`.
