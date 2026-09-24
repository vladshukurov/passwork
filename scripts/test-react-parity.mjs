import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const production = read('dist/index.html');
const reactHtml = read('react/index.html');
const reactSource = read('react/src/App.jsx');
const buttonSource = read('react/src/Button.jsx');
const reactTokens = read('react/src/tokens.css');
const figmaStyles = read('react/src/figma-2026.css');
const heroMotion = read('dist/hero-scroll.js');
const pageMotion = read('dist/page-motion.js');
const footerSource = read('source/site-footer.html');
const footerStyles = read('dist/site-footer.css');

const stylesheets = html => [...html.matchAll(/<link rel="stylesheet" href="([^"?]+)/g)].map(match => match[1]);
assert.deepEqual(stylesheets(reactHtml), stylesheets(production), 'React must use exactly the production CSS stack');

for (const selector of ['id="main"', 'id="top"', 'id="about"', 'id="certification"', 'id="teams"',
  'id="team-panel"', 'id="security"', 'id="product-panel"', 'class="contact-dialog"']) {
  assert.ok(production.includes(selector), `Production markup lost ${selector}`);
}

for (const component of ['Header', 'ProductTabs', 'Hero', 'ClientLogos', 'About',
  'SectionIntro', 'CertificationCard', 'Certification', 'TeamTabs', 'TeamScene',
  'SecurityStory', 'Security', 'Pricing', 'Secrets', 'Trust', 'ContactDialog']) {
  assert.match(reactSource, new RegExp(`function ${component}\\(`), `Missing React component ${component}`);
}
assert.match(buttonSource, /function Button\(/, 'Missing shared React Button component');
assert.match(read('react/src/main.jsx'), /import '\.\/tokens\.css'/, 'React design tokens must load at the app entry');
for (const token of ['--pw-type-body', '--pw-button-font-size']) {
  assert.ok(reactTokens.includes(token), `Missing React design token ${token}`);
}
assert.match(reactTokens, /--pw-button-font-size:\s*var\(--pw-type-body\)/,
  'React buttons must follow the shared typography scale');
assert.match(footerStyles, /\.site-footer/, 'Missing shared footer styles');
assert.match(footerSource, /<footer class="site-footer">/, 'Missing static footer');
assert.match(production, /<footer class="site-footer">/, 'Production page must contain the footer');
assert.match(reactSource, /function Footer\(/, 'React page must contain the footer');
assert.match(reactSource, /<Footer \/>/, 'React page must render the footer');

for (const filename of ['logo-dark.svg', 'logo-light.svg', 'imgKey02.svg', 'imgVector1.svg',
  'img1PxDots8PxPitch800600Source.svg', 'imgVector.svg']) {
  assert.ok(existsSync(new URL(`dist/passwork-assets/${filename}`, root)), `Missing asset ${filename}`);
}

assert.equal((reactSource.match(/\['ГОСТ-шифрование'|\['Сертификат ФСТЭК России'|\['В собственном контуре'/g) || []).length,
  3, 'All security stories must be represented as React data');
assert.equal((reactSource.match(/\['Хранение паролей'|\['Управление доступом'|\['Коды 2FA'|\['Журнал действий'/g) || []).length,
  4, 'All product tabs must be represented as React data');
assert.match(reactSource, /import\('\.\.\/\.\.\/dist\/passwork\.js'\)/, 'Motion runtime must be imported after React commits');
assert.match(reactSource, /stopMotion\?\.\(\)/, 'React must release motion controllers on unmount');
assert.match(read('dist/passwork.js'), /export function mountPasswork\(\)/, 'Motion runtime must expose a lifecycle entry point');
assert.match(reactSource, /href="#pricing">Цены<\/a>/, 'Pricing navigation must link to the pricing section');
assert.match(reactSource, /<Pricing \/>/, 'React page must render the Figma pricing section');
assert.equal((reactSource.match(/<DarkHeadingDots \/>/g) || []).length, 2,
  'Both dark headings must carry the Figma dot pattern');
assert.ok(existsSync(new URL('dist/passwork-assets/figma-dark-heading-dots-2026.png', root)),
  'Missing Figma dark-heading dot asset');
assert.match(reactSource, /<Pricing \/><SectionDivider \/><Secrets \/><SectionDivider openBottom \/><Trust \/>/,
  'Pricing, secrets, and trust sections must follow the Figma order');
assert.match(reactSource, /<TeamTabs \/><TeamScene \/><Security \/><SectionDivider inGrid \/>/,
  'The grid divider belongs between security and pricing');
assert.match(reactSource, /<Trust \/><Platforms \/><SectionDivider openBottom \/><\/main>/,
  'Platform applications must follow trust and have a divider before the footer');
assert.doesNotMatch(reactSource, /<Trust \/><SectionDivider \/>/, 'No empty gap may separate trust from applications');
assert.match(reactSource, /<article className="platform-feature">/, 'Platform layout must have the full-width browser feature');
assert.match(reactSource, /<div className="platforms-cards">/, 'Platform layout must have a three-card app row');
assert.match(figmaStyles, /\.platforms-cards\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s,
  'Platform cards must use three equal columns at desktop width');
for (const filename of ['figma-platform-wide-gradient-2026.png', 'figma-platform-wide-dots-2026.svg',
  'figma-platform-browser-hero-2026.png', 'figma-platform-phone-auth-2026.png',
  'figma-platform-phone-app-2026.png', 'figma-platform-access-folder-2026.png',
  'figma-platform-access-create-2026.png']) {
  assert.ok(existsSync(new URL(`dist/passwork-assets/${filename}`, root)), `Missing Figma platform asset ${filename}`);
  assert.ok(reactSource.includes(filename), `Figma platform asset is unused: ${filename}`);
}
for (const icon of ['apple', 'googleplay', 'googlechrome', 'firefoxbrowser',
  'microsoftedge', 'safari', 'windows', 'linux']) {
  assert.ok(existsSync(new URL(`dist/passwork-assets/platform-${icon}.svg`, root)), `Missing platform icon ${icon}`);
}
assert.match(reactSource, /className="platform-card platform-card-browser"/, 'The third application card must describe the browser extension');
assert.match(reactSource, /style=\{\{ '--platform-icon':/, 'Platform badges must use monochrome icon masks');
assert.match(figmaStyles, /\.platform-availability-icon\s*\{[^}]*background:\s*currentColor/s,
  'Platform icons must inherit the label color');
assert.match(reactSource, /id="pricing-team-size" type="range"/, 'Pricing must have one shared team-size slider');
assert.equal((reactSource.match(/type="range"/g) || []).length, 1, 'Pricing must not duplicate sliders inside cards');
assert.match(reactSource, /Number\.parseInt\(plan\.price, 10\) \* teamSize \* 365/,
  'Every plan must recalculate its annual team estimate from the shared slider');
assert.match(figmaStyles, /--pw-light-page:\s*#fafafb/i, 'Light page surfaces must use #FAFAFB');
assert.match(figmaStyles, /\.secrets-card\s*\{[^}]*height:\s*280px/s,
  'Secret cards must follow the updated Figma height');
assert.match(figmaStyles, /\.trust-card-art\s*\{[^}]*opacity:\s*\.4/s,
  'Trust artwork must rest at 40% opacity');
assert.match(reactSource, /className="pricing-plans"/, 'Pricing plans must use the shared three-column layout');
assert.match(figmaStyles, /\.pricing\s*\{\s*background:\s*#151619/s,
  'Pricing and trust surfaces must share the Figma dark token');
assert.match(heroMotion, /is-over-dark-section/, 'The header must respond to dark sections');
assert.match(figmaStyles, /\.react-site-header \.header-inner\s*\{[^}]*width:\s*min\(var\(--content\),\s*79\.375%\)/s,
  'The header must stay aligned to the Figma content grid on wide screens');
assert.match(heroMotion, /gsap\.set\(origin,\{opacity:titleOpacity\}\)/,
  'The Made in Russia mark must fade with the hero title');
assert.match(pageMotion, /\.react-site-header[^]*?\.hero-origin,\.hero h1,\.hero-copy > p,\.product-tabs/,
  'React hero entrance must not fight scroll-controlled opacity');
assert.doesNotMatch(reactSource, /aria-hidden="true">↗|aria-hidden="true">↑/, 'Footer arrows must stay removed');
for (const filename of ['figma-made-in-russia-2026.svg', 'figma-pricing-check-2026.svg',
  'figma-trust-registry-2026.png', 'figma-trust-fsb-2026.png',
  'figma-trust-bugbounty-2026.png', 'figma-trust-fstek-2026.png',
  'key-round.svg', 'figma-secrets-cicd-2026.svg',
  'figma-secrets-config-2026.svg', 'figma-secrets-access-2026.svg']) {
  assert.ok(existsSync(new URL(`dist/passwork-assets/${filename}`, root)), `Missing site asset ${filename}`);
}
assert.match(reactSource, /токенов', 'Держите ключи, токены и пароли[^\n]*'key-round\.svg'/);
assert.doesNotMatch(reactSource, /className="platforms-gap"/, 'Platform cards should not have a blank spacer');
assert.match(figmaStyles, /\.platforms-cards\s*\{[^}]*gap:\s*2px;[^}]*padding:\s*2px/s,
  'Platform cards should have compact spacing above and between them');
assert.match(figmaStyles, /\.platform-card\s*\{[^}]*border-radius:\s*0/s,
  'Platform cards should have square corners');
assert.doesNotMatch(figmaStyles.match(/\.platform-feature\s*\{([^}]*)\}/)?.[1] ?? '', /border-radius:/,
  'The blue feature should have square corners too');
assert.match(figmaStyles, /\.platforms-cards\s*\{[^}]*background:\s*var\(--pw-border\)/s,
  'The card gutters should use the shared border color as a solid surface');
assert.doesNotMatch(figmaStyles.match(/\.platforms-cards\s*\{([^}]*)\}/)?.[1] ?? '', /(?:^|;)\s*border(?:-(?:width|style|color|top|right|bottom|left))?:/,
  'The card row should not draw a separate border around the gray surface');
assert.match(figmaStyles, /\.platform-card\s*\{[^}]*background:\s*#fff;[^}]*border-radius/s,
  'Platform cards should stay white as in the Figma composition');
assert.doesNotMatch(figmaStyles.match(/\.platform-card\s*\{([^}]*)\}/)?.[1] ?? '', /(?:^|;)\s*border(?:-(?:width|style|color|top|right|bottom|left))?:/,
  'Platform cards should have no border');
assert.match(read('dist/security-switcher.css'), /\.security-switcher-grid\s*\{[^}]*border-block:\s*1px solid var\(--stroke\)/s,
  'The pinned security gallery should have matching borders above and below');
assert.equal((reactSource.match(/<PlatformAvailability /g) || []).length, 4,
  'Desktop, mobile, 2FA and browser cards should each show their platform badge');
assert.doesNotMatch(reactSource, /Работает с Chrome, Firefox, Edge и Safari/,
  'The browser list should be conveyed by icons, not repeated in the description');

console.log('React contracts: CSS, assets, page components, pricing, footer, tab/story data and runtime bridge OK');
