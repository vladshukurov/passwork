"""Build the local Passwork page from the supplied Figma design."""
from pathlib import Path
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
assets = json.loads((ROOT / 'source/passwork-assets.json').read_text())
security_assets = json.loads((ROOT / 'source/security-assets.json').read_text())

def security_image(key, cls=''):
    return f'<img src="{security_assets[key]}" alt="" class="{cls}">'

def image(key, alt='', cls='', extra=''):
    return f'<img src="{assets[key]}" alt="{alt}" class="{cls}" {extra}>'

def button(label='Запросить демо', cls='', kind='demo'):
    return f'<button class="button {cls}" data-dialog="{kind}">{label}</button>'

def certification_art(name):
    """Keep all original faces together and retain the export's painter order."""
    ns = 'http://www.w3.org/2000/svg'
    ET.register_namespace('', ns)
    svg = ET.parse(ROOT / f'dist/passwork-assets/certification/{name}.svg').getroot()
    group = svg.find(f'{{{ns}}}g')
    paths = list(group)
    sizes = {'gis': [4]*6, 'kii': [5]*3, 'asu-tp': [4]*8, 'ispdn': [18]}[name]
    assert sum(sizes) == len(paths), f'Artwork changed: {name}'
    for node in svg.iter():
        node.attrib.pop('id', None)
    for path in paths:
        group.remove(path)
    offset = 0
    for size in sizes:
        layer = ET.SubElement(group, f'{{{ns}}}g', {'class': 'certification-layer'})
        layer.extend(paths[offset:offset+size])
        offset += size
    # The frame has open side faces, so do not pull them apart. Lift the two
    # complete inner chip slabs instead, retaining their original paint order.
    if name == 'ispdn':
        frame = group[0]
        frame.attrib.clear()
        for start, end in [(13, 17), (9, 13)]:
            chip = ET.Element(f'{{{ns}}}g', {'class': 'certification-layer'})
            for path in paths[start:end]:
                frame.remove(path)
                chip.append(path)
            frame.insert(start, chip)
    svg.set('class', 'certification-svg')
    svg.set('data-art', name)
    svg.set('aria-hidden', 'true')
    svg.set('focusable', 'false')
    svg.set('preserveAspectRatio', 'xMidYMid meet')
    return ET.tostring(svg, encoding='unicode')

security_stories = [
    ('Сертификация', 'ГОСТ-шифрование', 'Поддержка ГОСТ Р 34.10-2012 и ГОСТ Р 34.11-2012. Данные остаются на серверах вашей компании.'),
    ('Сертификация', 'Сертификат ФСТЭК России', 'Пассворк имеет сертификат ФСТЭК России по 4 уровню доверия — для систем с повышенными требованиями к защите информации.'),
    ('Размещение', 'В собственном контуре', 'Разверните Пассворк на своих серверах: пароли, файлы и резервные копии останутся внутри инфраструктуры компании.'),
]
security_choices = ''.join(f'<article class="security-story{" is-active" if i == 0 else ""}"><button type="button" class="security-story-heading" data-feature-index="{i}" aria-expanded="{str(i == 0).lower()}" aria-controls="security-story-detail-{i}">{title}</button><div class="security-story-detail" id="security-story-detail-{i}" aria-hidden="{str(i != 0).lower()}"><div class="security-story-detail-inner"><p>{description}</p><div class="security-story-progress" aria-hidden="true"><span></span></div></div></div></article>' for i, (_, title, description) in enumerate(security_stories))

hero_tabs = [('Хранение паролей','imgKey02'), ('Управление доступом','imgUsersProfiles01'), ('Коды 2FA','imgShield02'), ('Журнал действий','imgBook01')]
tabs = ''.join(f'<button id="product-tab-{i}" role="tab" aria-selected="{str(i == 0).lower()}" aria-controls="product-panel" tabindex="{0 if i == 0 else -1}" data-product="{i}">{image(icon)}<span>{label}</span></button>' for i,(label,icon) in enumerate(hero_tabs))
logos = [('imgVkusvillTextlogo20211','ВкусВилл',133,17),('imgFrame','ПИК',67,21),('imgGroup1','ВТБ',79,29),('imgFrame1','Иви',65,19),('imgOkkoLogo1','Okko',76,28),('imgHeadHunterLogo1','HeadHunter',35,35)]
# Keep the six cells from the Figma layout and the source site's paired roll.
logo_alternates = [
    ('open-mobile-platform.svg', 'Открытая мобильная платформа', 87, 31),
    ('cherkizovo.svg', 'Группа Черкизово', 115, 24),
    ('dit-moscow.svg', 'ДИТ Москвы', 93, 33),
    logos[5],
    ('sber-health.png', 'СберЗдоровье', 112, 34),
    logos[3],
]

def logo_art(logo):
    key, name, width, height = logo
    if key in assets:
        return image(key, extra=f'width="{width}" height="{height}"')
    return (f'<span class="client-logo-art" style="width:{width}px;height:{height}px;'
            f'--logo-art:url(/passwork-assets/client-logos/{key})"></span>')

logo_html = ''.join(
    f'<div class="client-logo" role="listitem" aria-label="{first[1]}, {second[1]}" '
    f'style="--logo-delay:{i * 100}ms"><div class="client-logo-viewport" aria-hidden="true">'
    f'<div class="client-logo-track">'
    + ''.join(f'<span class="client-logo-frame">{logo_art(logo)}</span>' for logo in (first, second, first))
    + '</div></div></div>'
    for i, (first, second) in enumerate(zip(logos, logo_alternates))
)
team_labels = ['IT-команды','DevOps','Безопасность','Госорганизации','Производство']
teams = ''.join(f'<button id="team-tab-{i}" role="tab" aria-selected="{str(i == 0).lower()}" aria-controls="team-panel" tabindex="{0 if i == 0 else -1}" data-team="{i}">{label}</button>' for i,label in enumerate(team_labels))
# Attio's native 320px radar geometry and independent motion timings.
orbit_labels = [
    ('ГОСТ', 75, 107, '#e0fced', '#cbf7e1', '#007d53'),
    ('Коды 2FA', 268, 59, '#fdf7c4', '#fcef7e', '#665a00'),
    ('Доступ по ролям', 78, 268, '#e5eeff', '#d6e5ff', '#215bc4'),
    ('Закрытый контур', 246, 281, '#f5f0ff', '#e8ddfe', '#6238b5'),
]
orbit_tags = []
for i, (label, cx, cy, bg, border, fg) in enumerate(orbit_labels):
    width = round(6.7 * len(label)) + 24
    orbit_tags.append(f'''<g class="radar-tag-enter" style="--enter-delay:{120*i}ms">
<g class="pipeline-radar-bob" style="animation-delay:{1000+650*i}ms;animation-duration:{3800+350*i}ms">
<rect x="{cx-width/2}" y="{cy-13}" width="{width}" height="26" rx="9" fill="{bg}" stroke="{border}" stroke-width="1.27"/>
<text x="{cx}" y="{cy}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" letter-spacing="-.13" fill="{fg}">{label}</text>
</g></g>''')
orbit_html = f'''<svg class="passwork-radar" viewBox="0 0 320 320" role="img" aria-labelledby="passwork-radar-title">
<title id="passwork-radar-title">Пассворк: ГОСТ, коды 2FA, доступ по ролям и закрытый контур</title>
<circle class="pipeline-radar-ring-outer" cx="160" cy="160" r="148" fill="none" stroke="rgba(28,40,64,.9)" stroke-width="1" style="animation-delay:.4s"/>
<circle class="pipeline-radar-ring-inner" cx="160" cy="160" r="100" fill="none" stroke="rgba(28,40,64,.9)" stroke-width="1"/>
<circle class="radar-center" cx="160" cy="160" r="56" fill="#fff" stroke="rgba(28,40,64,.05)" stroke-width="1"/>
<image href="/passwork-assets/passwork-mark.svg" x="137" y="138.5" width="46" height="43" preserveAspectRatio="xMidYMid meet"/>
{''.join(orbit_tags)}</svg>'''

page = f'''<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Пассворк — основа вашей информационной безопасности</title>
<meta name="description" content="Управление корпоративными паролями, доступами и действиями — в одном контуре.">
<link rel="icon" href="{assets['imgKey02']}" type="image/svg+xml">
<link rel="preload" href="/passwork-assets/MuseoSansCyrl-500.otf" as="font" type="font/otf" crossorigin>
<link rel="stylesheet" href="/code/design-tokens.css"><link rel="stylesheet" href="/passwork-tokens.css"><link rel="stylesheet" href="/attio-buttons.css"><link rel="stylesheet" href="/passwork.css?v=motion-20260923ab"><link rel="stylesheet" href="/passwork-motion.css">
<link rel="stylesheet" href="/client-logos.css"><link rel="stylesheet" href="/hero-entrance.css"><link rel="stylesheet" href="/hero-scroll.css?v=motion-20260923ab"><link rel="stylesheet" href="/security-switcher.css?v=security-20260923d">
<link rel="stylesheet" href="/live-dashboard-base.css"><link rel="stylesheet" href="/live-dashboard-light.css">
<link rel="stylesheet" href="/team-dashboards.css"><link rel="stylesheet" href="/team-dashboards-light.css">
<script defer src="/vendor/gsap/gsap.min.js"></script>
<script defer src="/vendor/gsap/ScrollTrigger.min.js"></script>
<script type="module" src="/passwork.js?v=motion-20260923ab"></script></head><body>
<a class="skip-link" href="#main">Перейти к содержимому</a>
<header class="site-header"><div class="header-inner">
<a class="brand" href="#top" aria-label="Пассворк — на главную"><img class="brand-dark" src="/passwork-assets/logo-dark.svg" alt="Пассворк"><img class="brand-light" src="/passwork-assets/logo-light.svg" alt="" aria-hidden="true"></a>
<span class="brand-divider"></span>{image('imgVector','Сделано в России','astra')}
<nav id="main-nav" aria-label="Основная навигация"><a href="#about">Компания</a><a href="#teams">Сценарии</a><a href="#security">Ресурсы</a><button data-dialog="support">Поддержка</button><button data-dialog="pricing">Цены</button></nav>
<span class="nav-divider"></span>{button(cls='button-small header-demo')}
<button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Открыть меню"><span></span><span></span></button>
</div></header>
<main id="main">
<section class="hero" id="top">
<div class="hero-gradient" aria-hidden="true"></div>{image('imgVector1','','hero-dots')}{image('imgVector1','','hero-dots dot-glint', 'aria-hidden="true"')}
<div class="hero-copy-scroll"><div class="hero-copy"><h1><span class="hero-title-line">Пассворк — основа вашей</span> <span class="hero-title-line">информационной безопасности</span></h1>
<p>Управление корпоративными паролями, доступами и действиями — в одном контуре</p>
<div class="hero-actions">{button()}{button('Обсудить внедрение'+image('imgTrailingIcon'),'button-outline','implementation')}</div></div></div>
<div class="product-showcase"><div class="product-tabs" role="tablist" aria-label="Возможности Пассворка">{tabs}</div>
<div class="hero-window-shell"><div class="hero-window-scale"><div id="product-panel" role="tabpanel" aria-labelledby="product-tab-0" class="product-window" tabindex="0">
<div class="pw-live-dashboard pw-embed" role="img" aria-label="Анимированная демонстрация Пассворка: поиск пароля, просмотр записи, журнал действий и права доступа"></div>
<noscript>{image('imgImage27','Интерфейс Пассворка','product-screenshot',extra='width="1341" height="787"')}</noscript>
<div class="product-detail" hidden></div>
</div></div></div></div></section>
<div class="page-grid">
<section aria-label="Пассворк выбирают"><div class="client-logos" role="list">{logo_html}</div></section>
<section class="about" id="about"><span class="eyebrow">О проекте</span><h2>Пассворк — корпоративный менеджер паролей <span>для ИТ-команд, DevOps и специалистов по безопасности. Он помогает хранить пароли, управлять доступом и отслеживать действия внутри инфраструктуры</span></h2></section>
<section class="certification" id="certification" aria-labelledby="certification-heading">
<div class="section-intro"><h2 id="certification-heading">Пассворк сертифицирован<br>ФСТЭК России</h2><div><p>Сертификат доверия подтверждает соответствие требованиям безопасности регулируемых отраслей. Разворачивается внутри компании, поддерживает ГОСТ-шифрование, исключает передачу данных во внешние сервисы</p>{button(cls='button-dark')}</div></div>
<div class="certification-cards" role="list">
<article class="certification-card" role="listitem"><div class="certification-art">{certification_art('gis')}</div><div class="certification-copy"><h3>Госорганы</h3><p>ГИС 1 класса</p></div></article>
<article class="certification-card" role="listitem"><div class="certification-art">{certification_art('kii')}</div><div class="certification-copy"><h3>Инфраструктура</h3><p>КИИ 1 категории</p></div></article>
<article class="certification-card" role="listitem"><div class="certification-art">{certification_art('asu-tp')}</div><div class="certification-copy"><h3>Производство</h3><p>АСУ ТП 1 класса</p></div></article>
<article class="certification-card" role="listitem"><div class="certification-art certification-art-wide">{certification_art('ispdn')}</div><div class="certification-copy"><h3>Операторы ПДн</h3><p>ИСПДн 1 уровня</p></div></article>
</div></section>
<section class="teams-heading" id="teams"><span class="eyebrow">О проекте</span><h2>Пассворк решает<br>задачи разных команд</h2></section>
<div class="team-tabs" role="tablist" aria-label="Пассворк для вашей команды">{teams}</div>
<section class="team-scene" id="team-panel" role="tabpanel" aria-labelledby="team-tab-0" tabindex="0">
{image('img1PxDots8PxPitch800600Source','','scene-dots')}{image('img1PxDots8PxPitch800600Source','','scene-dots dot-glint', 'aria-hidden="true"')}
<div class="team-dashboard-window team-screenshot"><div class="pw-team-dashboard pw-embed" role="img" aria-label="Анимированная демонстрация Пассворка для IT-команд"></div>
<noscript>{image('imgContainer16','Интерфейс Пассворка',extra='width="1044" height="610" style="width:100%;height:auto"')}</noscript></div>
<p class="team-caption" aria-live="polite">Разграничение доступа по ролям и группам</p></section>
<div class="security-scroll-track"><section class="security-switcher" id="security" aria-labelledby="security-heading">
<div class="section-intro"><h2 id="security-heading">Российское решение для корпоративной безопасности</h2><div><p>Управляйте корпоративными паролями и доступом сотрудников в единой системе.<br>Размещайте Пассворк на своих серверах.</p>{button(cls='button-dark')}</div></div>
<div class="security-switcher-grid" role="group" aria-roledescription="карусель" aria-label="Особенности безопасности" tabindex="0">
<div class="security-switcher-copy">
<div class="security-copy-heading"><div class="feature-label">Безопасность</div><h3>Защита данных<br>под вашим контролем</h3></div>
<div class="security-story-list">{security_choices}</div>
</div>
<div class="security-switcher-stage">
{security_image('imgIcon', 'security-stage-pattern')}
{security_image('imgIcon1', 'security-stage-background')}
{security_image('img1PxDots8PxPitch800600Source', 'security-stage-dots')}
{security_image('img1PxDots8PxPitch800600Source', 'security-stage-dots dot-glint')}
<div class="security-visual" aria-hidden="true" role="img" aria-label="ФСТЭК России: Пассворк, 4 уровень доверия">
<div class="security-ui-card security-certificate" aria-hidden="true"><div class="security-ui-header"><span>ФСТЭК России</span>{image('imgShield02')}</div><div class="security-certificate-brand">Пассворк</div><p class="security-ui-subtitle">Корпоративный менеджер паролей</p><div class="security-certificate-level"><b>4</b><span>уровень<br>доверия</span></div><div class="security-ui-footer">Сертификация ФСТЭК России</div></div>
</div>
<div class="security-visual" aria-hidden="true" role="img" aria-label="Пассворк, пароли и резервные копии соединены внутри закрытого контура компании">
<div aria-hidden="true" style="display:contents"><div class="protection-card infrastructure-card">
<div class="check-heading">Инфраструктура компании {security_image('imgIcon2')}</div>
<p>Пассворк и данные размещены на серверах компании.</p>
<div class="check-row">{security_image('imgIcon3')}<span>Размещение: <b>локально</b></span></div>
<div class="check-row">{security_image('imgIcon4')}<span>Передача данных: <b>внутри контура</b></span></div>
<div class="protection-code infrastructure-map">
<div class="infrastructure-map-heading"><span>Закрытый контур</span><span class="infrastructure-local">Серверы компании</span></div>
<div class="infrastructure-topology">
<div class="infrastructure-link infrastructure-link-data" data-motion-at="3500"></div>
<div class="infrastructure-link infrastructure-link-backup" data-motion-at="4100"></div>
<div class="infrastructure-node infrastructure-app" data-motion-at="2850"><div class="infrastructure-node-title"><img src="/passwork-assets/passwork-mark.svg" alt=""><span>Пассворк</span><i></i></div><div class="infrastructure-node-detail">Локальная установка</div></div>
<div class="infrastructure-node infrastructure-data" data-motion-at="3800"><div class="infrastructure-node-title">{security_image('imgIcon4')}<span>Пароли и файлы</span><i></i></div><div class="infrastructure-node-detail">На серверах компании</div></div>
<div class="infrastructure-node infrastructure-backup" data-motion-at="4400"><div class="infrastructure-node-title">{security_image('imgIcon5')}<span>Резервные копии</span><i></i></div><div class="infrastructure-node-detail">Внутри контура</div></div>
</div>
</div></div></div></div>
<div class="security-visual is-active" aria-hidden="false" role="img" aria-label="Проверка ГОСТ-шифрования и работы в закрытом контуре"><div aria-hidden="true" style="display:contents"><div class="protection-card"><div class="check-heading">2 проверки выполнены {security_image('imgIcon2')}</div><p>Проверка шифрования и размещения данных</p><div class="check-row">{security_image('imgIcon3')}<span>Стандарты ГОСТ: <b>поддерживаются</b></span></div><div class="check-row">{security_image('imgIcon4')}<span>Обработка данных: <b>на серверах компании</b></span></div><div class="protection-code"><div>Параметры защиты {security_image('imgIcon5')}</div><pre><span>ГОСТ Р 34.10-2012</span>  электронная подпись
<span>ГОСТ Р 34.11-2012</span>  хеширование

Размещение данных
  Серверы компании

Хранение резервных копий
  Внутри инфраструктуры</pre>
</div></div></div>
{security_image('imgRectangle240650873', 'security-stage-fade')}</div></div>
</section></div></div></main>
<dialog class="contact-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Закрыть окно">×</button><span class="eyebrow">Пассворк</span><h2 id="dialog-title">Запросить демо</h2><p class="dialog-description"></p>
<form id="contact-form"><label>Имя<input name="name" autocomplete="name" required placeholder="Как к вам обращаться"></label><label>Рабочая почта<input name="email" type="email" autocomplete="email" required placeholder="you@company.ru"></label><label>Компания<input name="company" autocomplete="organization" required placeholder="Название компании"></label><p class="form-note">Это локальный прототип: данные не отправляются.</p><button class="button button-dark" type="submit">Подготовить заявку</button></form><div class="form-result" role="status" hidden></div></dialog>
</body></html>'''
(ROOT / 'dist/index.html').write_text(page.replace('<br>', '<br> '))
print('Built Passwork homepage:',len(page),'characters')
