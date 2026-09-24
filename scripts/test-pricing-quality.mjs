import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { peopleAtProgress, progressAtPeople } from '../react/src/pricing-scale.js';

const app = readFileSync(new URL('../react/src/App.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../react/src/figma-2026.css', import.meta.url), 'utf8');
const motion = readFileSync(new URL('../dist/page-motion.js', import.meta.url), 'utf8');

assert.equal(peopleAtProgress(0), 1);
assert.equal(peopleAtProgress(242), 25);
assert.equal(peopleAtProgress(495), 50);
assert.equal(peopleAtProgress(1000), 100);
assert.equal(progressAtPeople(25), 242);
assert.equal(peopleAtProgress(progressAtPeople(86)), 86);
assert.ok(peopleAtProgress(243) >= peopleAtProgress(242));
assert.ok(peopleAtProgress(243) <= 26);

assert.match(app, /id="pricing-team-size" type="range" min="0" max="1000" step="1"/);
assert.doesNotMatch(app, /id="pricing-team-count"/, 'Team size should be read-only; the slider owns this interaction');
assert.match(app, /className="pricing-plan-pattern"/);
assert.match(app, /className="pricing-plan-glint dot-glint"/);
assert.doesNotMatch(app, /pricing-plan-total">≈/, 'Annual team price must not carry an approximation glyph');
assert.doesNotMatch(app, /Демонстрационный расчёт\. Итоговая стоимость — по запросу\./);
assert.match(app, /const largeTeam = teamProgress === 1000/, 'The final slider position must represent teams above 100');
assert.match(app, /aria-valuetext=\{largeTeam \? 'Больше 100 сотрудников'/);
assert.doesNotMatch(app, /pricing-range-labels|pricing-large-team/, 'The slider should not have labels or a separate large-team button');
assert.match(app, /История действий и изменений/);
assert.match(app, /Офлайн-доступ с контролем администратора/);
assert.match(app, /Совместимость с российскими ОС/);
assert.match(app, /SAML SSO и синхронизация с LDAP/, 'Advanced plan should explain its distinctive integrations');
assert.match(app, /Сертификация ФСТЭК 4-го уровня доверия/, 'FSTEK plan should explain its certified value');
assert.match(css, /\.pricing-range-wrap::before\s*\{[^}]*left:\s*13px;\s*right:\s*13px/s);
assert.match(css, /\.site-footer[^\n]*:hover/);
assert.doesNotMatch(css, /\.site-footer[^\n]*:hover[^\n]*var\(--pw-accent\)/);
assert.match(motion, /repeat:\s*recurring\s*\?\s*-1\s*:\s*0/, 'React dot glints should repeat gently while in view');

console.log('Pricing scale, dotted featured card and neutral footer hover OK');
