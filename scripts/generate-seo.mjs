import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

for (const envFile of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  try {
    const contents = await readFile(join(process.cwd(), envFile), 'utf8');
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?SITE_URL\s*=\s*['"]?([^'"\s#]+)['"]?\s*$/);
      if (match && !process.env.SITE_URL) {
        process.env.SITE_URL = match[1];
      }
    }
  } catch {
    // Optional environment files are not required for local development.
  }
}

const siteUrlInput = process.env.SITE_URL;
const distDir = join(process.cwd(), 'dist');
let siteUrl;
if (siteUrlInput) {
  try {
    const parsed = new URL(siteUrlInput);
    if (parsed.protocol !== 'https:') {
      throw new Error('SITE_URL must use https:// for production.');
    }
    if (parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password) {
      throw new Error('SITE_URL must be an HTTPS origin only, without a path, query, or credentials.');
    }
    siteUrl = parsed.origin;
  } catch (error) {
    console.error(`Invalid SITE_URL: ${error.message}`);
    process.exit(1);
  }
}

const indexPath = join(distDir, 'index.html');
await mkdir(distDir, { recursive: true });
let html = await readFile(indexPath, 'utf8');

if (siteUrl) {
  const homepage = `${siteUrl}/`;
  const imageUrl = `${siteUrl}/assets/og-portfolio.png`;
  const canonicalTags = [
    `<link rel="canonical" href="${homepage}" />`,
    `<meta property="og:url" content="${homepage}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].join('\n    ');

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `    ${canonicalTags}\n  </head>`);
  }

  const personSchema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (personSchema) {
    const person = JSON.parse(personSchema[1]);
    person.url = homepage;
    person.image = imageUrl;
    html = html.replace(personSchema[0], `<script type="application/ld+json">\n      ${JSON.stringify(person, null, 2)}\n    </script>`);
  }

  await writeFile(join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${homepage}</loc>\n  </url>\n</urlset>\n`);
  await writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
}

await writeFile(indexPath, html);

const finalPersonSchema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!finalPersonSchema) {
  throw new Error('Expected the Person JSON-LD block so its CSP hash can be generated.');
}

const schemaHash = createHash('sha256').update(finalPersonSchema[1]).digest('base64');
const headersPath = join(distDir, '_headers');
const headers = await readFile(headersPath, 'utf8');
if (!headers.includes('__JSON_LD_HASH__')) {
  throw new Error('Expected the __JSON_LD_HASH__ marker in public/_headers.');
}
await writeFile(headersPath, headers.replace('__JSON_LD_HASH__', schemaHash));

if (siteUrl) {
  console.log(`Generated canonical, Open Graph URL, sitemap.xml, and robots.txt for ${siteUrl}`);
} else {
  console.warn('Canonical and sitemap URLs skipped: set SITE_URL to the production HTTPS origin before deployment.');
}
console.log('Generated the CSP hash for the final JSON-LD block.');
