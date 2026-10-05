# SEO launch checklist

## Build-time requirements

This is a single-page Vite site. Its section navigation uses clean, lowercase fragment IDs (`#home`, `#about`, `#skills`, `#projects`, `#experience`, `#certifications`, and `#contact`); these are not separate crawlable pages, so the sitemap intentionally lists only the homepage.

Before a production build, set `SITE_URL` to the canonical HTTPS origin (for example `https://your-domain.com`, with no path or trailing slash). The build then generates an absolute canonical URL, Open Graph URLs, a one-URL `sitemap.xml`, and a `robots.txt` containing the sitemap location. Without this value, the build completes but deliberately does not emit a fake canonical or sitemap for localhost/a guessed domain.

The source `public/robots.txt` allows crawling. No `noindex` directives were found in the app source. Do not add `noindex` to production pages if the goal is search indexing.

## Hosting / HTTPS

HTTPS redirection and HSTS belong at the production host/CDN, not in a client-side Vite app. Configure the host to redirect HTTP to HTTPS and choose one canonical host (`www` or non-`www`); redirect the alternate host with a permanent redirect. After deployment, verify the redirects and that `https://your-domain.com/robots.txt` and `/sitemap.xml` return HTTP 200. The repository currently contains no hosting-provider configuration, so no provider-specific redirect file has been added.

## Google Search Console

Search Console cannot be verified from this local workspace; it requires the live domain and an authenticated owner. After deployment:

1. Add a Domain property in Google Search Console and complete DNS TXT verification (recommended), or verify the exact URL-prefix property using the chosen supported method.
2. Submit `https://your-domain.com/sitemap.xml` in the Sitemaps report.
3. Use URL Inspection on the homepage, request indexing, and review the rendered canonical and indexing status.
4. Check Page indexing, Core Web Vitals, HTTPS, and Enhancements reports over time. A newly deployed site may take days or weeks to appear.

## Backlink strategy (editorial, relevant, earned)

- Publish detailed, reproducible write-ups for RYNEX and authorized lab projects; explain scope, methodology, results, and remediation without disclosing client-sensitive information.
- Link to the portfolio from complete GitHub project READMEs, your LinkedIn profile, and your resume/CV. Add reciprocal portfolio links only where profiles are genuinely yours.
- Contribute useful vulnerability-assessment or network-security tutorials to reputable cybersecurity communities and publications; link only when relevant to the article.
- Participate in university, employer, and security-community project showcases; request a portfolio link when there is a real contribution to cite.
- Keep a simple outreach log (site, contact, proposed resource, response, link status). Avoid paid link farms, automated comment links, reciprocal-link schemes, and keyword-stuffed anchor text.

## Outstanding owner inputs

- Production domain and preferred canonical host.
- Actual GitHub and LinkedIn profile URLs (the generic platform-home links were removed rather than presented as personal profiles).
- Search Console/DNS access and hosting provider for verification, redirects, and live performance checks.
- Search/social preview image is a 1200×630 PNG so common crawlers can render it reliably.
