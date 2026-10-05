# Production security headers

`public/_headers` is copied to the build root by Vite. Netlify and Cloudflare Pages recognize this static-host `_headers` format. The local Vite development server does not apply these response headers; test them after deployment on the production host.

The `dev` and `preview` npm scripts bind to `127.0.0.1`, so the development server is not exposed to other devices on the local network by default.

The Content Security Policy allows only same-origin scripts and assets, Google Fonts stylesheet/font hosts, `data:` images, mail links, and HTTPS upgrades. The build script computes a SHA-256 hash of the final inline JSON-LD Person schema and injects it into the built `_headers` file. This allows structured data without enabling `unsafe-inline`; keep that build step enabled when changing the schema.

The policy also sends HSTS (one-year max age), MIME sniffing protection, strict-origin referrer behavior, clickjacking protection, opener isolation, origin-agent clustering, and disables unused browser capabilities. HSTS has no `includeSubDomains` because subdomain HTTPS coverage has not been confirmed. Add it only after every subdomain is HTTPS-capable. HSTS is honored only when delivered over HTTPS. `upgrade-insecure-requests` asks browsers to upgrade page subresources, but it does not replace the host's HTTP-to-HTTPS redirect.

If deploying on Vercel, GitHub Pages, S3/CloudFront, or another provider, translate these directives to that provider's response-header configuration; `_headers` is not universal. After deployment, verify the live response headers (for example with Mozilla Observatory or browser developer tools) and ensure no CSP violations are reported. Google Fonts are permitted by this policy; if fonts are self-hosted later, remove the Google origins.

## Application security scope

This repository currently serves a static React/Vite portfolio. A source audit found no database driver/query, server/API endpoint, HTTP request client, user-submitted form, or cookie/local-storage usage. Therefore:

- **SQL injection:** no SQL execution surface exists in this app. If a backend is added, use parameterized queries/prepared statements and validate inputs server-side; never concatenate user data into SQL.
- **Rate limiting:** there is no application endpoint to rate-limit. If APIs are introduced, enforce per-IP/account limits at the API gateway/server and add abuse monitoring. CDN/WAF limits for static delivery are a hosting-provider setting.
- **Secure cookies:** the app does not set or read cookies, so there are no app cookies to mark `Secure`, `HttpOnly`, or `SameSite`. Any future session cookies must be set server-side with those attributes and appropriate expiry.
- **Environment variables:** `SITE_URL` is the only build-time setting and is a public origin, not a secret. `.gitignore` excludes local `.env*` files and private key/certificate files while retaining `.env.example`. Never put secrets in `VITE_*` variables or client-side bundles.

`npm audit` reported zero known vulnerabilities for the locked dependency set at the latest audit. Re-run it regularly; this is a point-in-time result, not a guarantee against future advisories.
