import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const defaultSiteUrl = 'https://splendid-chaja-ac783b.netlify.app';
const siteUrl = (process.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/$/, '');
const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap.xml');

const sitemapRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/cautare', changefreq: 'hourly', priority: '0.9' },
  { path: '/cautare?counties=Bucuresti', changefreq: 'daily', priority: '0.8' },
  { path: '/cautare?counties=Cluj', changefreq: 'daily', priority: '0.8' },
  { path: '/cautare?counties=Iasi', changefreq: 'daily', priority: '0.8' },
  { path: '/cautare?counties=Timis', changefreq: 'daily', priority: '0.8' },
  { path: '/cautare?counties=Brasov', changefreq: 'daily', priority: '0.8' },
];

function buildAbsoluteUrl(routePath) {
  return `${siteUrl}${routePath}`;
}

function buildSitemapXml() {
  const lastmod = new Date().toISOString();
  const urlEntries = sitemapRoutes
    .map(
      ({ path: routePath, changefreq, priority }) => `  <url>\n    <loc>${buildAbsoluteUrl(routePath)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function updateIndexHtml(html) {
  return html.replaceAll(defaultSiteUrl, siteUrl);
}

await mkdir(distDir, { recursive: true });

const indexHtml = await readFile(indexHtmlPath, 'utf8');

await Promise.all([
  writeFile(indexHtmlPath, updateIndexHtml(indexHtml), 'utf8'),
  writeFile(robotsPath, buildRobotsTxt(), 'utf8'),
  writeFile(sitemapPath, buildSitemapXml(), 'utf8'),
]);
