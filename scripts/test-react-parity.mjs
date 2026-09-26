import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const production = read('dist/index.html');
const reactHtml = read('react/index.html');
const reactSource = read('react/src/App.jsx');
const detailPreviews = read('react/src/FeatureDetailPreview.jsx');
const secretIllustrations = read('react/src/SecretsIllustrations.jsx');
const buttonSource = read('react/src/Button.jsx');
const reactTokens = read('react/src/tokens.css');
const figmaStyles = read('react/src/figma-2026.css');
const heroMotion = read('dist/hero-scroll.js');
const pageMotion = read('dist/page-motion.js');
const screenTransitions = read('dist/screen-transitions.js');
const securityMotion = read('dist/security-switcher.js');
const runtime = read('dist/passwork.js');
const footerSource = read('source/site-footer.html');
const footerStyles = read('dist/site-footer.css');
const staticBuilder = read('scripts/build-passwork.py');

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
assert.match(reactSource, /<Pricing motion=\{motion\.pricing\} \/>/, 'React page must render the Figma pricing section with motion settings');
assert.equal((reactSource.match(/<DarkHeadingDots \/>/g) || []).length, 2,
  'Both dark headings must carry the Figma dot pattern');
assert.ok(existsSync(new URL('dist/passwork-assets/figma-dark-heading-dots-2026.png', root)),
  'Missing Figma dark-heading dot asset');
assert.match(reactSource, /<ClientLogos \/><About \/><Certification \/>\s*<section className="teams-heading" id="teams">/,
  'Team scenarios must sit directly below the FSTEC certification block');
assert.match(reactSource, /<TeamTabs \/><TeamScene \/><SectionDivider inGrid \/><MainFeatures \/><Secrets \/><SectionDivider inGrid \/>/,
  'The features section should lead directly into secrets without an extra divider');
assert.match(reactSource, /<Trust \/><div className="page-grid security-page-grid"><Security \/><\/div><SectionDivider openBottom \/><Pricing motion=\{motion\.pricing\} \/><Awards \/><Platforms \/><SectionDivider openBottom \/><\/main>/,
  'Security follows trust and awards meet applications without a blank divider');
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
const previewStart = reactSource.indexOf('function FramePreviewControls');
assert.equal((reactSource.slice(0, previewStart < 0 ? undefined : previewStart).match(/type="range"/g) || []).length, 1,
  'Pricing must not duplicate sliders inside cards');
assert.match(reactSource, /Number\.parseInt\(plan\.price, 10\) \* teamSize \* 365/,
  'Every plan must recalculate its annual team estimate from the shared slider');
assert.match(figmaStyles, /--pw-light-page:\s*#fafafb/i, 'Light page surfaces must use #FAFAFB');
assert.match(figmaStyles, /\.secrets-card\s*\{[^}]*height:\s*436px/s,
  'Secret cards should match the FSTEK card height');
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
  'figma-trust-bugbounty-2026.png', 'figma-trust-fstek-2026.png']) {
  assert.ok(existsSync(new URL(`dist/passwork-assets/${filename}`, root)), `Missing site asset ${filename}`);
}
assert.match(reactSource, /токенов', 'Держите ключи, токены и пароли[^\n]*SecureStorageIllustration/);
assert.match(reactSource, /Интеграция с CI\/CD[^\n]*CicdIllustration/);
assert.match(secretIllustrations, /data-secret-art="storage"/);
assert.match(secretIllustrations, /data-secret-art="cicd"/);
assert.match(secretIllustrations, /data-secret-art="config"/);
assert.match(secretIllustrations, /data-secret-art="access"/);
assert.match(secretIllustrations, /secrets-isoform\/storage.svg\?raw/);
assert.match(secretIllustrations, /secrets-isoform\/config.svg\?raw/);
if (pageMotion.includes('function secretsHoverTimeline(svg)')) {
  assert.match(pageMotion, /articulatedTimeline\(svg, svg\.dataset\.secretArt\)/,
    'The storage artwork needs its own object-specific hover sequence');
  assert.match(pageMotion, /data-object/,
    'Illustration motion must target complete Isoform objects');
} else {
  assert.doesNotMatch(pageMotion, /document\.querySelectorAll\('\.secrets-card'\)/,
    'Static release artwork must not mount hover handlers');
}
assert.doesNotMatch(figmaStyles, /main\.motion-ui-on \.secrets-card:hover\s*\{[^}]*background-color/s,
  'Secret cards should not flash white on hover');
assert.match(reactSource, /Работа с конфигурациями[^\n]*ConfigurationsIllustration/);
assert.match(reactSource, /Гранулярный контроль доступа[^\n]*AccessIllustration/);
assert.doesNotMatch(reactSource, /className="secrets-card-icon"/,
  'All four secret cards should use native SVG geometry');
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
assert.match(figmaStyles, /\.platform-card\s*\{[^}]*background:\s*var\(--pw-light-page\);[^}]*border-radius/s,
  'Platform cards should use the shared #fafafb page surface');
assert.match(reactSource, /<div className="main-features-sidebar security-switcher-copy">[\s\S]*?<h2 id="features-heading">[\s\S]*?<nav className="main-features-nav security-story-list"/,
  'The feature heading and scroll chapters should share the pinned left column');
assert.equal(/\.section-intro\s*\{[^}]*grid-template-columns:\s*minmax\(0, 491px\) minmax\(0, 610px\);[^}]*padding-inline:\s*56px;[^}]*padding-bottom:\s*56px;/s.test(figmaStyles), true,
  'Certification, secrets, and security intros should share the design grid and 56px desktop insets');
assert.equal(/\.(?:secrets|security-switcher) \.section-intro\s*\{[^}]*grid-template-columns:/.test(figmaStyles.slice(0, figmaStyles.indexOf('@media (max-width: 1600px)'))), false,
  'Individual intro sections must not redefine the shared desktop columns');
assert.match(figmaStyles, /\.main-features-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 38%\) minmax\(0, 62%\)/,
  'Features should leave more room for the scrolling chapters');
assert.match(figmaStyles, /\.main-features-sidebar\s*\{[^}]*border-right:\s*1px solid var\(--pw-border\)/,
  'The column rule should remain attached to the pinned feature sidebar');
assert.match(figmaStyles, /\.main-features-art\s*\{[^}]*border-block:\s*1px solid var\(--pw-border\)/,
  'The feature illustration needs matching top and bottom dividers');
assert.match(reactSource, /<h2 id="features-heading">Пароли и доступы под контролем<\/h2>/,
  'The pinned feature heading should stay concise');
assert.match(figmaStyles, /\.main-features-detail\s*\{[^}]*background:\s*var\(--pw-light-page\)/,
  'Small feature cards should use the shared #fafafb surface');
assert.match(reactSource, /<div className="main-features-detail-art"><FeatureDetailPreview variant=\{preview\} \/><\/div>/,
  'Small feature cards should render interface fragments rather than enlarged screenshots');
for (const variant of ['permissions', 'groups', 'team', 'roles', 'vault-order', 'vault-search']) {
  assert.ok(detailPreviews.includes(`case '${variant}'`), `Missing composed product interface: ${variant}`);
}
assert.match(detailPreviews, /function TreePreview\(\)[\s\S]*?ОБЩИЕ СЕЙФЫ[\s\S]*?Администрирование[\s\S]*?Инфраструктура/,
  'The vault card should show a readable folder-tree fragment');
assert.doesNotMatch(detailPreviews, /AppHeader|feature-ui-app-header/,
  'Feature cards should not shrink a whole application window into a tiny tile');
assert.match(figmaStyles, /\.main-features-sidebar\s*\{[^}]*position:\s*sticky/,
  'The feature navigation should stay visible while the right column scrolls');
assert.doesNotMatch(reactSource, /aria-hidden=\{active !== index\} inert=\{active !== index\}/,
  'All feature chapters should remain in the document scroll');
assert.doesNotMatch(figmaStyles.match(/\.platform-card\s*\{([^}]*)\}/)?.[1] ?? '', /(?:^|;)\s*border(?:-(?:width|style|color|top|right|bottom|left))?:/,
  'Platform cards should have no border');
assert.match(read('dist/security-switcher.css'), /\.security-switcher-grid\s*\{[^}]*border-block:\s*1px solid var\(--stroke\)/s,
  'The pinned security gallery should have matching borders above and below');
assert.equal((reactSource.match(/<PlatformAvailability /g) || []).length, 4,
  'Desktop, mobile, 2FA and browser cards should each show their platform badge');
assert.doesNotMatch(reactSource, /Работает с Chrome, Firefox, Edge и Safari/,
  'The browser list should be conveyed by icons, not repeated in the description');
assert.match(figmaStyles, /\.rounded-frame \.page-grid\s*\{[^}]*padding:\s*var\(--frame-rule\)/s,
  'The rounded frame must have an even 1.5px rim on every side');
assert.match(figmaStyles, /\.rounded-frame \.page-grid > \.certification\s*\{[^}]*gap:\s*var\(--frame-rule\)/s,
  'Certification intro and cards must use the same frame gap');
assert.match(figmaStyles, /\.rounded-frame \.security-switcher-grid\s*\{[^}]*border:\s*0;[^}]*border-radius:\s*var\(--frame-radius\)/s,
  'The security gallery must replace its legacy line with the rounded frame treatment');
assert.doesNotMatch(figmaStyles, /\.rounded-frame \.page-grid > \.section-divider,\s*\.rounded-frame > \.section-divider\s*\{[^}]*display:\s*none/s,
  'The rounded variant must retain all spacer dividers');
assert.match(figmaStyles, /\.rounded-frame > \.section-divider > div\s*\{[^}]*background:\s*var\(--frame-gap\)/s,
  'Outside-grid dividers must use the same gray frame surface as the rounded sections');
assert.match(figmaStyles, /main\.dot-motion-pulse \.dot-glint\s*\{[^}]*mask-image:\s*none/s,
  'The dot preview must brighten the visible pattern instead of a clipped travelling strip');
assert.match(figmaStyles, /main\.dot-motion-sweep \.dot-glint,[\s\S]*?\{[^}]*mask-image:\s*linear-gradient\(135deg/s,
  'The diagonal dot light must have its own stationary-pattern sweep');
assert.match(reactSource, /mode: 'sweep'|'dot-motion-sweep'/,
  'The diagonal sweep should be the default dot treatment');
assert.match(figmaStyles, /\.button, \.rounded-frame \.button,[^}]*transition:\s*none; animation:\s*none/s,
  'CTA buttons should not animate on hover or press');
assert.doesNotMatch(reactSource, /<option value="wave">/,
  'Dot controls should present one clearly understandable motion choice');
for (const key of ['hero', 'tabs', 'security', 'pricing', 'ui', 'certification']) {
  assert.match(reactSource, new RegExp(`${key}: \\{ enabled: true, duration:`),
    `Motion lab must expose ${key} as a tunable interaction`);
}
assert.match(reactSource, /duration=\{motion\.duration\} enabled=\{motion\.enabled\}/,
  'Pricing animation must use the live preview settings');
assert.match(runtime, /motionDuration\('tabs',\.32\)/,
  'Both tab scenes must read their current duration at interaction time');
assert.match(heroMotion, /--motion-hero-duration/,
  'Hero focus handoff must use its live preview duration');
assert.match(heroMotion, /motion-hero-off/,
  'Hero focus handoff must be switchable from the live preview');
assert.match(heroMotion, /'--hero-copy-y':`\$\{-40\*movement\}px`/,
  'Hero copy must retain its original vertical trajectory');
assert.match(heroMotion, /'--hero-copy-scale':1-\.04\*movement/,
  'Hero copy must retain its original scale trajectory');
assert.match(heroMotion, /'--hero-window-scale':baseScale\(\)\*\(1\+\.05\*progress\)/,
  'Hero product window must use the calmer five-percent focus scale');
assert.match(heroMotion, /scale:1-\.1\*actionPhase/,
  'Hero CTA must retain its original fade-and-scale trajectory');
assert.doesNotMatch(screenTransitions, /blur\(/,
  'Screen transitions should never obscure product UI with blur');
assert.match(securityMotion, /--motion-security-duration/,
  'Security illustration transition must use its preview duration');
assert.match(pageMotion, /card\.addEventListener\('pointerenter',enter\)/,
  'FSTEK artwork should respond from the entire card');
if (reactSource.includes('function FramePreviewControls')) {
  assert.match(figmaStyles, /\.frame-preview-body\s*\{[^}]*overflow-y:\s*auto/s,
    'Local motion settings must stay scrollable on small screens');
} else {
  assert.doesNotMatch(figmaStyles, /\.frame-preview-controls\s*\{/,
    'Release styles must not include the local settings panel');
}
assert.match(production, /class="security-ui-card security-attestation"/,
  'The second security story must render the certification evidence illustration');
assert.match(staticBuilder, /class="security-ui-card security-attestation"/,
  'Regenerating the static page must preserve the certification illustration');
assert.ok(existsSync(new URL('dist/passwork-assets/favicon.svg', root)),
  'The blue Passwork favicon must be present');
assert.match(reactHtml, /rel="icon" href="\/passwork-assets\/favicon\.svg"/,
  'The React page must use the blue Passwork favicon');
assert.match(production, /rel="icon" href="\/passwork-assets\/favicon\.svg"/,
  'The static page must use the same blue Passwork favicon');
assert.match(staticBuilder, /rel="icon" href="\/passwork-assets\/favicon\.svg"/,
  'Regenerating the static page must retain the favicon');
assert.match(reactSource, /className="mobile-nav-overline"/,
  'The mobile navigation must have its own section hierarchy');
assert.match(runtime, /document\.body\.classList\.add\('mobile-menu-open'\)/,
  'The mobile menu must lock background scrolling while open');
assert.match(figmaStyles, /\.react-site-header \.header-inner nav\.open\s*\{[^}]*transform:\s*translateY\(0\)/s,
  'The mobile menu must reveal smoothly');
assert.match(reactSource, /className="section-intro platforms-intro"/,
  'Application intro must share the security intro layout');
assert.match(figmaStyles, /@media \(max-width: 800px\)[\s\S]*?\.section-intro\s*\{[^}]*grid-template-columns:\s*1fr/s,
  'Section intro copy must stack on narrow viewports');

console.log('React contracts: CSS, assets, page components, pricing, footer, tab/story data and runtime bridge OK');
