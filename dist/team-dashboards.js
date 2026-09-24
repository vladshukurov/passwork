// source/team-dashboards/live-dashboard-markup.ts
var DASHBOARD_SIDEBAR_MARKUP = `  <aside class="pw-side">
    <div class="pw-side__top">
      <div class="pw-search" data-id="search"><svg class="pw-ico" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.6"/><path d="M10.5 10.5 14 14"/></svg><span class="pw-search__field"><span class="pw-search__placeholder">\u041F\u043E\u0438\u0441\u043A</span><span class="pw-search__value"></span><i class="pw-search__caret"></i></span><span class="pw-search__clear" data-act="search-clear"><svg class="pw-ico" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg></span></div>
      <nav class="pw-nav">
        <div class="pw-nav-item" data-id="recent"><svg class="pw-ico" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2"/><path d="M8 4.6V8l2.4 1.5"/></svg><span>\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435</span></div>
        <div class="pw-nav-item" data-id="fav"><svg class="pw-ico" viewBox="0 0 16 16"><path d="m8 1.9 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.7l-3.8 2 .7-4.3-3.1-3 4.3-.6z"/></svg><span>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435</span></div>
        <div class="pw-nav-item" data-id="inbox"><svg class="pw-ico" viewBox="0 0 16 16"><path d="M2 9.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5M2 9.5 3.6 3.8A1 1 0 0 1 4.6 3h6.8a1 1 0 0 1 1 .8L14 9.5M2 9.5h3.2l.8 1.5h4l.8-1.5H14"/></svg><span>\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</span></div>
      </nav>
      <div class="pw-sec"><span class="pw-sec__title">\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0435 \u0441\u0435\u0439\u0444\u044B</span><span class="pw-sec__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m2 6.5 3-3 3 3"/></svg></span><span class="pw-sec__add" data-act="add-private"><svg class="pw-ico" viewBox="0 0 10 10"><path d="M5 1.5v7M1.5 5h7"/></svg></span></div>
      <div class="pw-tree">
        <div class="pw-tree-group" data-id="budget">
          <div class="pw-tree-row pw-tree-row--l1" data-id="budget"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__text">\u0411\u044E\u0434\u0436\u0435\u0442\u044B</span></div>
          <div class="pw-tree-children"><div>
            <div class="pw-tree-row pw-tree-row--l2"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#d5a021" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">2026</span></div>
            <div class="pw-tree-row pw-tree-row--l2"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#777" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">\u0420\u0435\u0437\u0435\u0440\u0432</span></div>
          </div></div>
        </div>
      </div>
      <div class="pw-sec"><span class="pw-sec__title">\u041E\u0431\u0449\u0438\u0435 \u0441\u0435\u0439\u0444\u044B</span><span class="pw-sec__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m2 6.5 3-3 3 3"/></svg></span><span class="pw-sec__add" data-act="add-shared"><svg class="pw-ico" viewBox="0 0 10 10"><path d="M5 1.5v7M1.5 5h7"/></svg></span></div>
      <div class="pw-tree">
        <div class="pw-tree-group pw-tree-group--marked is-open" data-id="admin">
          <div class="pw-tree-row pw-tree-row--l1" data-id="admin"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__text">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</span></div>
          <div class="pw-tree-children"><div>
            <div class="pw-tree-group is-open" data-id="auth">
              <div class="pw-tree-row pw-tree-row--l2" data-id="auth"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#9376d1" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0438 2FA</span></div>
              <div class="pw-tree-children"><div>
                <div class="pw-tree-row pw-tree-row--l3 pw-tree-row--active" data-id="access"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#777" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</span></div>
              </div></div>
            </div>
            <div class="pw-tree-group" data-id="test">
              <div class="pw-tree-row pw-tree-row--l2 pw-tree-row--dim" data-id="test"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#5d5e60" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u0430</span></div>
              <div class="pw-tree-children"><div>
                <div class="pw-tree-row pw-tree-row--l3"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#777" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">Staging</span></div>
                <div class="pw-tree-row pw-tree-row--l3"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#777" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">QA-\u0441\u0442\u0435\u043D\u0434</span></div>
              </div></div>
            </div>
          </div></div>
        </div>
        <div class="pw-tree-group" data-id="ads">
          <div class="pw-tree-row pw-tree-row--l1" data-id="ads"><span class="pw-tree-row__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg></span><span class="pw-tree-row__text">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span></div>
          <div class="pw-tree-children"><div>
            <div class="pw-tree-row pw-tree-row--l2"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#e0563f" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">\u042F\u043D\u0434\u0435\u043A\u0441 \u0414\u0438\u0440\u0435\u043A\u0442</span></div>
            <div class="pw-tree-row pw-tree-row--l2"><span class="pw-tree-row__chev"></span><span class="pw-tree-row__folder"><svg viewBox="0 0 20 16"><path fill="#23aad9" d="M1 3.2A1.7 1.7 0 0 1 2.7 1.5h4.4l1.8 1.8h8.4A1.7 1.7 0 0 1 19 5v8.3a1.7 1.7 0 0 1-1.7 1.7H2.7A1.7 1.7 0 0 1 1 13.3z"/></svg></span><span class="pw-tree-row__text">VK \u0420\u0435\u043A\u043B\u0430\u043C\u0430</span></div>
          </div></div>
        </div>
      </div>
      <div class="pw-sec"><span class="pw-sec__title">\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u0435\u0439\u0444\u044B</span><span class="pw-sec__chev"><svg class="pw-ico" viewBox="0 0 10 10"><path d="m2 3.5 3 3 3-3"/></svg></span><span class="pw-sec__add" data-act="add-corp"><svg class="pw-ico" viewBox="0 0 10 10"><path d="M5 1.5v7M1.5 5h7"/></svg></span></div>
    </div>
    <div class="pw-side__bottom">
      <div class="pw-nav-item" data-id="hidden"><svg class="pw-ico" viewBox="0 0 16 16"><path d="M2 2l12 12M6.6 6.7A2 2 0 0 0 9.3 9.4M4.2 4.3C2.8 5.2 1.9 6.5 1.4 8c1.2 3 3.6 4.7 6.6 4.7 1.3 0 2.5-.3 3.5-.9M7 3.4c.3 0 .7-.1 1-.1 3 0 5.4 1.7 6.6 4.7-.4 1-1 1.9-1.7 2.6"/></svg><span>14 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u0441\u0435\u0439\u0444\u043E\u0432</span></div>
      <div class="pw-nav-item" data-id="trash"><svg class="pw-ico" viewBox="0 0 16 16"><path d="M2.5 4.2h11M6 4.2V2.8h4v1.4M3.8 4.2l.7 9a1 1 0 0 0 1 .9h5a1 1 0 0 0 1-.9l.7-9M6.6 7v4.4M9.4 7v4.4"/></svg><span>\u041A\u043E\u0440\u0437\u0438\u043D\u0430</span></div>
    </div>
  </aside>`;
var DASHBOARD_HEADER_MARKUP = `    <header class="pw-head">
      <div class="pw-crumbs"><span>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</span><span>/</span><span>\u2026</span><span>/</span><b>\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</b></div>
      <div class="pw-people">
        <div class="pw-avatars">
          <span class="pw-avatar" style="background:linear-gradient(135deg,#ff8a65,#ff5a3a)">\u041C<i class="pw-avatar__dot"></i></span>
          <span class="pw-avatar" style="background:linear-gradient(135deg,#a89bff,#7a66ff)">\u0418<i class="pw-avatar__dot"></i></span>
          <span class="pw-avatar" style="background:linear-gradient(135deg,#4fdba6,#22b57a)">\u0421<i class="pw-avatar__dot"></i></span>
          <span class="pw-avatar pw-avatar--letter">A</span>
          <span class="pw-avatar pw-avatar--letter">B</span>
        </div>
        <span class="pw-circle" data-act="head-share"><svg class="pw-ico" viewBox="0 0 16 16"><circle cx="6.5" cy="5.2" r="2.7"/><path d="M1.8 13.5c.4-2.6 2.2-4.1 4.7-4.1 1 0 1.9.2 2.6.7M12.5 8.6v4.6M10.2 10.9h4.6"/></svg></span>
        <div class="pw-people__text"><b>\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0430\u043F\u043A\u0435:</b><span>33 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span></div>
      </div>
      <div class="pw-head__actions">
        <span class="pw-round" data-act="head-more"><svg class="pw-ico" viewBox="0 0 18 18" style="fill:currentColor;stroke:none"><circle cx="4" cy="9" r="1.5"/><circle cx="9" cy="9" r="1.5"/><circle cx="14" cy="9" r="1.5"/></svg></span>
        <span class="pw-btn-add" data-act="add-password">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</span>
      </div>
    </header>`;
var LIVE_DASHBOARD_MARKUP = `
<div class="pw-stage">
<div class="pw-app">
${DASHBOARD_SIDEBAR_MARKUP}
  <div class="pw-main">
${DASHBOARD_HEADER_MARKUP}
    <div class="pw-body">
      <section class="pw-list">
        <div class="pw-label pw-label--folders">\u041F\u0430\u043F\u043A\u0438</div>
        <div class="pw-folders">
          <div class="pw-folder" data-id="servers"><svg viewBox="0 0 22 18"><path fill="#23aad9" d="M1 3.4A1.9 1.9 0 0 1 2.9 1.5h5l2 2h9.2A1.9 1.9 0 0 1 21 5.4v9.2a1.9 1.9 0 0 1-1.9 1.9H2.9A1.9 1.9 0 0 1 1 14.6z"/></svg><span>\u0421\u0435\u0440\u0432\u0435\u0440\u044B</span></div>
          <div class="pw-folder" data-id="mail"><svg viewBox="0 0 22 18"><path fill="#3bc78f" d="M1 3.4A1.9 1.9 0 0 1 2.9 1.5h5l2 2h9.2A1.9 1.9 0 0 1 21 5.4v9.2a1.9 1.9 0 0 1-1.9 1.9H2.9A1.9 1.9 0 0 1 1 14.6z"/></svg><span>\u041F\u043E\u0447\u0442\u0430</span></div>
        </div>
        <div class="pw-list__divider"></div>
        <div class="pw-label pw-label--second">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</div>
        <div class="pw-items"></div>
      </section>
      <section class="pw-detail"></section>
    </div>
  </div>
</div>
<div class="pw-cursors"></div>
</div>
`;

// source/team-dashboards/dashboard-shared.ts
var DASHBOARD_CURSOR_MARKUP = '<svg class="pw-cursor__arrow" viewBox="0 0 22 22"><path d="M1 1v15.3l4.3-3.7 2.9 6.3 2.9-1.3-2.9-6.2h5.5z"/></svg>';
var DASHBOARD_PEOPLE = {
  marina: { full: "\u041C\u0430\u0440\u0438\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u0430", init: "\u041C", color: "#ff6b4a" },
  ilya: { full: "\u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432", init: "\u0418", color: "#8b7cff" },
  sasha: { full: "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432", init: "\u0421", color: "#2fcb8f" }
};
var DASHBOARD_ICONS = {
  copy: '<svg class="pw-ico" viewBox="0 0 16 16"><rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.5"/><path d="M10.5 5.5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2"/></svg>',
  check: '<svg class="pw-ico" viewBox="0 0 16 16"><path d="m3 8.5 3.2 3.2L13 5"/></svg>',
  eye: '<svg class="pw-ico" viewBox="0 0 16 16"><path d="M1.5 8c1.3-3 3.6-4.7 6.5-4.7S13.2 5 14.5 8c-1.3 3-3.6 4.7-6.5 4.7S2.8 11 1.5 8z"/><circle cx="8" cy="8" r="2.1"/></svg>',
  eyeOff: '<svg class="pw-ico" viewBox="0 0 16 16"><path d="M2 2l12 12M6.6 6.7A2 2 0 0 0 9.3 9.4M4.2 4.3C2.8 5.2 1.9 6.5 1.4 8c1.2 3 3.6 4.7 6.6 4.7 1.3 0 2.5-.3 3.5-.9M7 3.4c.3 0 .7-.1 1-.1 3 0 5.4 1.7 6.6 4.7-.4 1-1 1.9-1.7 2.6"/></svg>',
  close: '<svg class="pw-ico" viewBox="0 0 16 16"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg>',
  share: '<svg class="pw-ico" viewBox="0 0 16 16"><circle cx="6.5" cy="5.2" r="2.7"/><path d="M1.8 13.5c.4-2.6 2.2-4.1 4.7-4.1 1 0 1.9.2 2.6.7M12.5 8.6v4.6M10.2 10.9h4.6"/></svg>',
  edit: '<svg class="pw-ico" viewBox="0 0 16 16"><path d="M11.3 2.5l2.2 2.2-7.6 7.6-3 .8.8-3z"/></svg>',
  more: '<svg class="pw-ico" viewBox="0 0 18 18" style="fill:currentColor;stroke:none"><circle cx="4" cy="9" r="1.5"/><circle cx="9" cy="9" r="1.5"/><circle cx="14" cy="9" r="1.5"/></svg>',
  star: '<svg viewBox="0 0 16 16"><path d="m8 1.9 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.7l-3.8 2 .7-4.3-3.1-3 4.3-.6z"/></svg>',
  cloud: '<svg viewBox="0 0 20 20"><path fill="#e3e6ea" d="M5.7 15.6a3.7 3.7 0 0 1-.6-7.3 4.7 4.7 0 0 1 9.1-1.1 3.2 3.2 0 0 1 .9 6.3c-.2.1-.4.1-.6.1z"/></svg>',
  astra: '<svg viewBox="0 0 18 18"><path fill="#0b5f9b" d="M9 1l2.1 5.2 5.6.4-4.3 3.6 1.4 5.5L9 12.7l-4.8 3 1.4-5.5L1.3 6.6l5.6-.4z"/></svg>',
  sprint: '<svg viewBox="0 0 12 12"><path d="M2.6 8.3c1.6 1.3 4.5 1.5 5.8-.2.9-1.4-.5-2.4-2-2.7C5 5 3.6 4.6 3.7 3.3 3.8 2 5.7 1.4 7.3 1.9" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

// source/team-dashboards/dashboard-demo-engine.ts
function initDashboardDemo(embed, workspace, config, options = {}) {
  const stage = embed.querySelector(".pw-stage");
  const panel = embed.closest(".product-features__panel");
  const layer = document.createElement("div");
  layer.className = "pw-cursors";
  const cursor = document.createElement("div");
  cursor.className = "pw-cursor";
  cursor.innerHTML = DASHBOARD_CURSOR_MARKUP;
  layer.appendChild(cursor);
  stage.appendChild(layer);
  let alive = true;
  let visible = false;
  let raf = 0;
  let x = stage.offsetWidth * 0.57;
  let y = stage.offsetHeight * 0.47;
  let highlighted = null;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const q = (selector) => workspace.querySelector(`[data-demo="${selector}"]`);
  const drawCursor = () => {
    cursor.style.transform = `translate(${x - 1}px, ${y - 1}px)`;
  };
  const clearHighlight = () => {
    highlighted?.classList.remove("pw-hl", "pw-pressed");
    highlighted = null;
  };
  const view = () => workspace.querySelector(".pw-it__view");
  const renderView = (html) => {
    clearHighlight();
    view().innerHTML = html;
  };
  const overlay = (html) => {
    workspace.querySelector(".pw-it__overlay-slot").innerHTML = `<div class="pw-it__dialog">${html}</div>`;
  };
  const show = (tab, html, caption, index2) => {
    clearHighlight();
    workspace.innerHTML = `<div class="pw-tabs pw-it__tabs">${config.tabs.map(([id, label]) => `<span class="pw-tab${id === tab ? " is-active" : ""}" data-demo="tab-${id}">${label}</span>`).join("")}</div><div class="pw-it__view">${html}</div><div class="pw-it__caption"><span>${String(index2).padStart(2, "0")} / ${String(config.totalSteps).padStart(2, "0")}</span><strong>${caption}</strong></div>`;
  };
  const hold = (duration = 1800) => ({ duration });
  const scene = (tab, html, caption, index2) => ({ duration: 500, start: () => show(tab, html(), caption, index2) });
  const click = (selector, change) => {
    let startX = 0;
    let startY = 0;
    let pressed = false;
    let changed = false;
    let ripple = null;
    return {
      duration: 1350,
      start: () => {
        clearHighlight();
        startX = x;
        startY = y;
        pressed = false;
        changed = false;
      },
      frame: (progress) => {
        const target = q(selector);
        if (target && progress < 0.68) {
          const bounds = target.getBoundingClientRect();
          const base = stage.getBoundingClientRect();
          const scale = base.width / stage.offsetWidth || 1;
          const toX = (bounds.left + bounds.width * 0.62 - base.left) / scale;
          const toY = (bounds.top + bounds.height * 0.55 - base.top) / scale;
          const t = Math.min(1, progress / 0.56);
          const eased = t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
          const bend = Math.min(26, Math.hypot(toX - startX, toY - startY) * 0.06);
          x = startX + (toX - startX) * eased;
          y = startY + (toY - startY) * eased - Math.sin(Math.PI * eased) * bend;
          drawCursor();
          if (t === 1) {
            target.classList.add("pw-hl");
            highlighted = target;
          }
        }
        if (progress >= 0.64 && !pressed) {
          pressed = true;
          cursor.classList.add("is-pressed");
          target?.classList.add("pw-pressed");
          ripple = document.createElement("div");
          ripple.className = "pw-ripple";
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          layer.appendChild(ripple);
        }
        if (progress >= 0.75 && !changed) {
          changed = true;
          change();
        }
        if (progress >= 0.82) cursor.classList.remove("is-pressed");
      },
      finish: () => {
        clearHighlight();
        ripple?.remove();
        cursor.classList.remove("is-pressed");
      }
    };
  };
  const cues = config.createCues({ scene, click, hold, renderView, overlay, q });
  const total = cues.reduce((sum, cue) => sum + cue.duration, 0);
  let index = 0;
  let elapsed = 0;
  let cueElapsed = 0;
  let previous = 0;
  let started = false;
  show(config.initial.tab, config.initial.html, config.initial.caption, 1);
  drawCursor();
  options.onProgress?.(0);
  const canPlay = () => alive && visible && !document.hidden && !motion.matches && panel?.dataset.active !== "false" && index < cues.length;
  function syncPlayback() {
    const playing = canPlay();
    cursor.classList.toggle("is-visible", playing);
    embed.dataset.demoPaused = String(!playing);
    if (!playing) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      previous = 0;
    } else if (!raf) {
      raf = requestAnimationFrame(tick);
    }
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
    syncPlayback();
  }, { threshold: [0, 0.15] });
  observer.observe(embed);
  const panelObserver = panel ? new MutationObserver(syncPlayback) : null;
  panelObserver?.observe(panel, { attributes: true, attributeFilter: ["data-active"] });
  document.addEventListener("visibilitychange", syncPlayback);
  motion.addEventListener("change", syncPlayback);
  const tick = (now) => {
    raf = 0;
    if (!alive) return;
    if (!canPlay()) {
      syncPlayback();
      return;
    }
    const delta = previous ? Math.min(48, now - previous) : 0;
    previous = now;
    if (!started) {
      started = true;
      cues[0].start?.();
    }
    elapsed = Math.min(total, elapsed + delta);
    cueElapsed += delta;
    while (index < cues.length && cueElapsed >= cues[index].duration) {
      const cue = cues[index];
      cue.frame?.(1);
      cue.finish?.();
      cueElapsed -= cue.duration;
      index += 1;
      cues[index]?.start?.();
    }
    options.onProgress?.(elapsed / total);
    if (index === cues.length) {
      syncPlayback();
      options.onComplete?.();
      return;
    }
    cues[index].frame?.(cueElapsed / cues[index].duration);
    raf = requestAnimationFrame(tick);
  };
  syncPlayback();
  return {
    dispose() {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      panelObserver?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      clearHighlight();
      layer.remove();
      workspace.innerHTML = "";
      delete embed.dataset.demoPaused;
    }
  };
}

// source/team-dashboards/dashboard-demo-ui.ts
var icon = (name) => `<span class="pw-it__icon">${DASHBOARD_ICONS[name]}</span>`;
var action = (id, label, primary = false) => `<span class="pw-it__button${primary ? " pw-it__button--primary" : ""}" data-demo="${id}">${label}</span>`;
var chevron = '<span class="pw-audit__chevron"></span>';
var person = (key) => `<span class="pw-it__person"><span class="pw-mini" style="background:${DASHBOARD_PEOPLE[key].color}">${DASHBOARD_PEOPLE[key].init}</span><span>${DASHBOARD_PEOPLE[key].full}</span></span>`;
var heading = (title, subtitle, control = "") => `<div class="pw-it__heading"><div><h3>${title}</h3><p>${subtitle}</p></div>${control}</div>`;
var field = (label, value, extra = "") => `<div class="pw-it__field"><span>${label}</span><div>${value}</div>${extra}</div>`;
var toggle = (id, on = false) => `<span class="pw-it__toggle${on ? " is-on" : ""}" data-demo="${id}"><i></i></span>`;
var option = (id, label, description, control) => `<div class="pw-it__setting" data-demo="${id}"><div><strong>${label}</strong><p>${description}</p></div>${control}</div>`;
var result = (text) => `<span class="pw-it__result">${icon("check")}${text}</span>`;

// source/team-dashboards/it-dashboard-demo.ts
function accessView(editor = false, revoked = false) {
  return heading("\u041F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", `\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C \xB7 ${revoked ? 32 : 33} \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F`) + `<div class="pw-it__access-table"><div class="pw-label pw-it__access-head"><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u0420\u043E\u043B\u044C \u0432 \u043F\u0430\u043F\u043A\u0435</span><span>\u0414\u043E\u0441\u0442\u0443\u043F</span></div>
    <div class="pw-it__access-row">${person("marina")}<span>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440</span><span class="pw-it__muted">\u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430</span></div>
    <div class="pw-it__access-row${revoked ? " is-revoked" : ""}">${person("ilya")}<span>\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440</span>${revoked ? "<span>\u0414\u043E\u0441\u0442\u0443\u043F \u043E\u0442\u043E\u0437\u0432\u0430\u043D</span>" : action("revoke", "\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F")}</div>
    <div class="pw-it__access-row">${person("sasha")}<span class="pw-it__select" data-demo="role">${editor ? "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440" : "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440"}${chevron}</span><span class="pw-it__muted">${editor ? "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435" : "\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440"}</span></div></div>
    <div class="pw-it__feedback">${editor ? result("\u0420\u043E\u043B\u044C \u0421\u0430\u0448\u0438 \u041E\u0440\u043B\u043E\u0432\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430") : "\u0420\u043E\u043B\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u0437\u0430\u043F\u0438\u0441\u044F\u043C\u0438 \u0432 \u044D\u0442\u043E\u0439 \u043F\u0430\u043F\u043A\u0435"}</div><div class="pw-it__overlay-slot"></div>`;
}
function recordsView(moved = false) {
  return heading("\u041F\u0430\u0440\u043E\u043B\u0438", moved ? "\u041E\u0431\u0449\u0430\u044F \u043F\u0430\u043F\u043A\u0430 \xB7 \u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C" : "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \xB7 3 \u0437\u0430\u043F\u0438\u0441\u0438", action("move", "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C")) + `<div class="pw-it__records">
      <div class="pw-it__record is-selected" data-demo="record"><span class="pw-it__checkbox">${icon("check")}</span><span class="pw-it__service pw-it__service--sprint">${DASHBOARD_ICONS.sprint}</span><span>Sprinthost<small>${moved ? "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 / \u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C" : "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u043E\u0442 \u041C\u0430\u0440\u0438\u043D\u044B \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u043E\u0439"}</small></span><span class="pw-it__tag">Admin</span></div>
      <div class="pw-it__record"><span class="pw-it__checkbox"></span><span class="pw-it__service">${DASHBOARD_ICONS.astra}</span><span>Astra Linux<small>admin@astra.local</small></span><span class="pw-it__tag">Admin</span></div>
      <div class="pw-it__record"><span class="pw-it__checkbox"></span><span class="pw-it__service pw-it__service--cloud">${DASHBOARD_ICONS.cloud}</span><span>Site24x7 Monitoring<small>monitoring@company.ru</small></span></div>
    </div><div class="pw-it__feedback">${moved ? result("Sprinthost \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0451\u043D \u0432 \u043E\u0431\u0449\u0443\u044E \u043F\u0430\u043F\u043A\u0443") : "\u0412\u044B\u0431\u0440\u0430\u043D\u0430 1 \u0437\u0430\u043F\u0438\u0441\u044C"}</div><div class="pw-it__overlay-slot"></div>`;
}
function journalView(openedOnly = false) {
  const rows = openedOnly ? [
    ["14:39", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:32", "marina", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:06", "ilya", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"]
  ] : [
    ["14:38", "marina", "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:37", "marina", "\u041E\u0442\u043E\u0437\u0432\u0430\u043D \u0434\u043E\u0441\u0442\u0443\u043F", "\u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432"],
    ["14:36", "marina", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0440\u043E\u043B\u044C", "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 \u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440"],
    ["14:32", "marina", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:28", "ilya", "\u0418\u0437\u043C\u0435\u043D\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C", "Astra Linux"]
  ];
  return heading("\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439", openedOnly ? "Sprinthost \xB7 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0437\u0430\u043F\u0438\u0441\u0438" : "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C \xB7 \u0432\u0441\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F") + `<div class="pw-it__filters"><span class="pw-it__select">\u0421\u0435\u0433\u043E\u0434\u043D\u044F${chevron}</span><span class="pw-it__select" data-demo="user-filter">\u0412\u0441\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438${chevron}</span><span class="pw-it__select" data-demo="event-filter">${openedOnly ? "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C" : "\u0412\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F"}${chevron}</span></div>
    <div class="pw-it__journal"><div class="pw-label pw-it__journal-head"><span>\u0412\u0440\u0435\u043C\u044F</span><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span><span>\u041E\u0431\u044A\u0435\u043A\u0442</span></div>${rows.map(([time, key, label, object], index) => `<div class="pw-it__journal-row" data-demo="event-${index}"><span>${time}<small>\u0421\u0435\u0433\u043E\u0434\u043D\u044F</small></span>${person(key)}<span>${label}<small class="pw-it__mobile-object">${object}</small></span><span>${object}</span></div>`).join("")}</div><div class="pw-it__overlay-slot"></div>`;
}
function rotationView(enabled = false, saved = false) {
  return heading("\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u043E\u0442\u0430\u0446\u0438\u0438", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C") + option("rotation-row", "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0442\u044C \u043E \u0441\u043C\u0435\u043D\u0435 \u043F\u0430\u0440\u043E\u043B\u0435\u0439", "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0434\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0441\u0440\u043E\u043A\u0430", toggle("rotation", enabled)) + field("\u041F\u0435\u0440\u0438\u043E\u0434 \u0440\u043E\u0442\u0430\u0446\u0438\u0438", '<span class="pw-it__select">30 \u0434\u043D\u0435\u0439' + chevron + "</span>") + field("\u041D\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C \u0437\u0430", '<span class="pw-it__select">3 \u0434\u043D\u044F' + chevron + "</span>") + `<div class="pw-it__form-actions">${action("save-rotation", "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", true)}</div>` + (saved ? `<div class="pw-it__notice">${icon("check")}<div><strong>\u041F\u043E\u0440\u0430 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C Sprinthost</strong><p>\u0414\u043E \u043F\u043B\u0430\u043D\u043E\u0432\u043E\u0439 \u0440\u043E\u0442\u0430\u0446\u0438\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C 3 \u0434\u043D\u044F</p></div></div>` : "");
}
function securityView(twoFactor = false, saved = false) {
  return heading("\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C", "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438") + option("two-factor-row", "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", "\u0417\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044C \u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u043E\u0434 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435", toggle("two-factor", twoFactor)) + field("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u043A", '<span class="pw-it__select">\u0412\u0441\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438' + chevron + "</span>") + field("\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440") + `<div class="pw-it__form-actions">${action("save-security", "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", true)}</div>` + (saved ? `<div class="pw-it__notice">${icon("check")}<div><strong>2\u0424\u0410 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439</strong><p>\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0432\u0445\u043E\u0434 \u2014 \u0441 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435\u043C \u043A\u043E\u0434\u043E\u043C</p></div></div>` : "");
}
function ssoView(connected = false) {
  return heading("\u0415\u0434\u0438\u043D\u044B\u0439 \u0432\u0445\u043E\u0434", "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0447\u0435\u0440\u0435\u0437 SSO") + `<div class="pw-it__sso"><div>${field("\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B", "SAML 2.0")}${field("\u041F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440", "\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0439 SSO")}${field("\u0421\u0442\u0430\u0442\u0443\u0441", "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D")}</div>
    <div class="pw-it__login"><span class="pw-it__login-title">\u0412\u0445\u043E\u0434 \u0432 \u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A</span><span class="pw-it__muted">\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0443\u0447\u0451\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C</span>${connected ? result("\u0412\u0445\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D") : action("sso-login", "\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 SSO", true)}<small>${connected ? "\u041C\u0430\u0440\u0438\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u0430 \xB7 company.ru" : "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442"}</small></div></div>`;
}
function passwordView(tab = "data", attached = false) {
  const tabs = `<div class="pw-tabs pw-it__record-tabs"><span class="pw-tab${tab === "data" ? " is-active" : ""}" data-demo="data">\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u0440\u043E\u043B\u044F</span><span class="pw-tab${tab === "files" ? " is-active" : ""}" data-demo="files">\u0424\u0430\u0439\u043B\u044B</span><span class="pw-tab${tab === "notes" ? " is-active" : ""}" data-demo="notes">\u0417\u0430\u043C\u0435\u0442\u043A\u0438</span><span class="pw-tab" data-demo="record-history">\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439</span></div>`;
  const content = tab === "files" ? `<div class="pw-it__attachment">${icon("copy")}<div><strong>\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E.pdf</strong><small>PDF \xB7 248 \u041A\u0411</small></div>${result("\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D")}</div><div class="pw-it__feedback">\u0424\u0430\u0439\u043B\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C \u0441 \u043F\u0440\u0430\u0432\u0430\u043C\u0438 \u043D\u0430 \u044D\u0442\u0443 \u0437\u0430\u043F\u0438\u0441\u044C</div>` : tab === "notes" ? `<div class="pw-it__note"><span class="pw-label">\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u043A \u0437\u0430\u043F\u0438\u0441\u0438</span><p>\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0435\u0440\u0432\u0435\u0440 \u043A\u043E\u043C\u0430\u043D\u0434\u044B.</p><p>\u0414\u043B\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0439 VPN.<br />\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u2014 \u041C\u0430\u0440\u0438\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u0430.</p><span class="pw-it__muted">\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F, 14:40</span></div>` : field("\u041B\u043E\u0433\u0438\u043D", "admin@company.ru", icon("copy")) + field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>', icon("eye") + icon("copy")) + field("URL-\u0430\u0434\u0440\u0435\u0441", '<span class="pw-it__link">sprinthost.ru</span>', icon("copy")) + field("TOTP", '<span class="pw-it__secret">866 441</span>', icon("copy")) + (attached ? field("\u0424\u0430\u0439\u043B\u044B", "\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E.pdf") : "");
  return heading("Sprinthost", "\u041E\u0431\u0449\u0430\u044F \u043F\u0430\u043F\u043A\u0430 \xB7 \u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C", action("share", icon("share") + "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F")) + tabs + content + '<div class="pw-it__overlay-slot"></div>';
}
function devicesView(open = false) {
  return heading("\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0432\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u0434 \u0440\u0443\u043A\u043E\u0439", "\u041E\u0431\u0449\u0438\u0435 \u0441\u0435\u0439\u0444\u044B \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0438 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438") + `<div class="pw-it__devices"><div class="pw-it__browser"><div class="pw-label pw-it__device-bar">\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430</div><div class="pw-it__device-content"><strong>Sprinthost</strong><span class="pw-it__muted">sprinthost.ru</span>${field("\u041B\u043E\u0433\u0438\u043D", "admin@company.ru")}${field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>')}${action("autofill", "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C", true)}<div class="pw-it__autofill-result"></div></div></div>
    <div class="pw-it__phone"><div class="pw-it__device-bar">\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A<span>9:41</span></div><div class="pw-it__device-content">${open ? `<strong>Sprinthost</strong><span class="pw-it__muted">\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</span>${field("\u041B\u043E\u0433\u0438\u043D", "admin@company.ru")}${field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>')}${result("\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E")}` : `<strong>\u041E\u0431\u0449\u0438\u0435 \u0441\u0435\u0439\u0444\u044B</strong><span class="pw-it__muted">\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</span><span class="pw-it__phone-record" data-demo="phone-record">${DASHBOARD_ICONS.sprint}<span>Sprinthost</span>${chevron}</span><span class="pw-it__phone-record">${DASHBOARD_ICONS.astra}<span>Astra Linux</span>${chevron}</span><span class="pw-it__phone-record">${DASHBOARD_ICONS.cloud}<span>Site24x7</span>${chevron}</span>`}</div></div></div>`;
}
function initItDashboardDemo(embed, workspace, options = {}) {
  return initDashboardDemo(embed, workspace, {
    tabs: [["records", "\u041F\u0430\u0440\u043E\u043B\u0438"], ["access", "\u041F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430"], ["history", "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439"], ["settings", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"]],
    totalSteps: 12,
    initial: { tab: "history", html: journalView(), caption: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439." },
    createCues: ({ scene, click, hold, renderView, overlay, q }) => [
      scene("access", () => accessView(), "\u0412\u044B\u0434\u0430\u0451\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u044B \u043F\u043E \u0440\u043E\u043B\u044F\u043C.", 1),
      hold(1100),
      click("role", () => overlay(`<span class="pw-label">\u0420\u043E\u043B\u044C \u0421\u0430\u0448\u0438 \u041E\u0440\u043B\u043E\u0432\u0430</span><span class="pw-it__menu-item">\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440<small>\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u0438</small></span><span class="pw-it__menu-item" data-demo="editor">\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440<small>\u041F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u0438 \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438</small></span><span class="pw-it__menu-item">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440<small>\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044F\u043C\u0438 \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C</small></span>`)),
      click("editor", () => renderView(accessView(true))),
      hold(),
      scene("access", () => accessView(true), "\u0417\u0430\u0431\u0438\u0440\u0430\u0435\u0442 \u0438\u0445 \u043F\u0440\u0438 \u0443\u0445\u043E\u0434\u0435.", 2),
      click("revoke", () => overlay(`<h4>\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F?</h4><p>\u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432 \u043F\u043E\u0442\u0435\u0440\u044F\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0430\u0440\u043E\u043B\u044F\u043C \u0432 \u043F\u0430\u043F\u043A\u0435 \xAB\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C\xBB.</p>${action("confirm-revoke", "\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F", true)}`)),
      click("confirm-revoke", () => {
        renderView(accessView(true, true));
        const count = embed.querySelector(".pw-people__text span");
        if (count) count.textContent = "32 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
        const avatar = embed.querySelector(".pw-avatars .pw-avatar:nth-child(2)");
        if (avatar) avatar.style.opacity = ".35";
      }),
      hold(),
      scene("records", () => recordsView(), "\u0421\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u0442 \u043F\u0430\u0440\u043E\u043B\u0438 \u0432 \u043E\u0431\u0449\u0438\u0435 \u043F\u0430\u043F\u043A\u0438.", 3),
      click("move", () => overlay(`<h4>\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</h4><span class="pw-label">\u041E\u0431\u0449\u0438\u0435 \u0441\u0435\u0439\u0444\u044B</span><span class="pw-it__menu-item">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</span><span class="pw-it__menu-item" data-demo="shared-folder">\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C${chevron}</span>`)),
      click("shared-folder", () => overlay(`<h4>\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</h4><p>\u041E\u0431\u0449\u0430\u044F \u043F\u0430\u043F\u043A\u0430 \xB7 32 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F<br />\u0417\u0430\u043F\u0438\u0441\u044C \u0443\u043D\u0430\u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u043F\u0440\u0430\u0432\u0430 \u044D\u0442\u043E\u0439 \u043F\u0430\u043F\u043A\u0438.</p>${action("confirm-move", "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0441\u044E\u0434\u0430", true)}`)),
      click("confirm-move", () => renderView(recordsView(true))),
      hold(),
      scene("history", () => journalView(), "\u041F\u0438\u0448\u0435\u0442 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439.", 4),
      click("event-0", () => {
        q("event-0")?.classList.add("is-selected");
        overlay(`<h4>\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C</h4>${person("marina")}<p>\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:38</p>${field("\u0417\u0430\u043F\u0438\u0441\u044C", "Sprinthost")}${field("\u0418\u0437 \u043F\u0430\u043F\u043A\u0438", "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435")}${field("\u0412 \u043F\u0430\u043F\u043A\u0443", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C")}`);
      }),
      hold(2200),
      scene("settings", () => rotationView(), "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442 \u043E \u0440\u043E\u0442\u0430\u0446\u0438\u0438.", 5),
      click("rotation", () => renderView(rotationView(true))),
      click("save-rotation", () => renderView(rotationView(true, true))),
      hold(2200),
      scene("settings", () => securityView(), "\u0422\u0440\u0435\u0431\u0443\u0435\u0442 2\u0424\u0410.", 6),
      click("two-factor", () => renderView(securityView(true))),
      click("save-security", () => renderView(securityView(true, true))),
      hold(),
      scene("settings", () => ssoView(), "\u041F\u0443\u0441\u043A\u0430\u0435\u0442 \u0447\u0435\u0440\u0435\u0437 SSO.", 7),
      hold(900),
      click("sso-login", () => renderView(ssoView(true))),
      hold(2200),
      scene("records", () => passwordView("data", true), "\u0425\u0440\u0430\u043D\u0438\u0442 \u0444\u0430\u0439\u043B\u044B \u0438 \u0437\u0430\u043C\u0435\u0442\u043A\u0438.", 8),
      click("files", () => renderView(passwordView("files"))),
      hold(1300),
      click("notes", () => renderView(passwordView("notes"))),
      hold(2200),
      scene("records", () => passwordView(), "\u0414\u0435\u043B\u0438\u0442\u0441\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435.", 9),
      click("share", () => overlay(`<h4>\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043F\u0430\u0440\u043E\u043B\u0435\u043C</h4>${field("\u041F\u0440\u0430\u0432\u0430", "\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}${field("\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F", "7 \u0434\u043D\u0435\u0439")}${action("create-link", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443", true)}`)),
      click("create-link", () => overlay(`<h4>\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 Sprinthost</h4><p>\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \xB7 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 7 \u0434\u043D\u0435\u0439</p><div class="pw-it__link-field">passwork.company.ru/s/\u2022\u2022\u2022\u2022\u2022\u2022</div>${action("copy-link", icon("copy") + "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443", true)}<div class="pw-it__feedback" data-demo="link-result"></div>`)),
      click("copy-link", () => {
        q("link-result").innerHTML = result("\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430");
      }),
      hold(),
      scene("records", () => passwordView(), "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442, \u043A\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u043B \u043F\u0430\u0440\u043E\u043B\u044C.", 10),
      click("record-history", () => renderView(journalView())),
      click("event-filter", () => overlay(`<span class="pw-label">\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span><span class="pw-it__menu-item" data-demo="opened">${icon("eye")}\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C</span><span class="pw-it__menu-item">${icon("edit")}\u0418\u0437\u043C\u0435\u043D\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C</span><span class="pw-it__menu-item">${icon("copy")}\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C</span>`)),
      click("opened", () => renderView(journalView(true))),
      hold(2200),
      scene("records", () => devicesView(), "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0438 \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435.", 11),
      click("autofill", () => {
        workspace.querySelector(".pw-it__autofill-result").innerHTML = result("\u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u044B");
      }),
      hold(900),
      click("phone-record", () => renderView(devicesView(true))),
      hold(2600),
      scene("history", () => journalView(), "\u0418 \u043C\u043D\u043E\u0433\u043E\u0435 \u0434\u0440\u0443\u0433\u043E\u0435.", 12),
      hold(2400)
    ]
  }, options);
}

// source/team-dashboards/devops-dashboard-demo.ts
function environmentsView(environment = "Production") {
  const counts = { Production: 12, Staging: 8, Development: 6 };
  return heading("\u0421\u0435\u043A\u0440\u0435\u0442\u044B \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F", `${environment} \xB7 ${counts[environment]} \u0437\u0430\u043F\u0438\u0441\u0435\u0439`) + `<div class="pw-devops__environments">${["Production", "Staging", "Development"].map((name) => `<span class="pw-it__button${name === environment ? " is-active" : ""}" data-demo="env-${name}">${name}</span>`).join("")}</div>
    <div class="pw-devops__secrets"><div class="pw-label pw-devops__secret-head"><span>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span><span>\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435</span><span>\u041E\u0431\u043D\u043E\u0432\u043B\u0451\u043D</span></div>
    ${["DATABASE_URL", "REGISTRY_TOKEN", "DEPLOY_KEY"].map((name, i) => `<div class="pw-devops__secret-row"><span>${icon("copy")}<span>${name}<small>${environment.toLowerCase()} / ${i === 0 ? "database" : i === 1 ? "registry" : "deployment"}</small></span></span><span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span><span>${i === 1 ? "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 03:00" : "\u0412\u0447\u0435\u0440\u0430, 18:24"}</span></div>`).join("")}</div>
    <div class="pw-it__feedback">${result("\u041A\u0430\u0436\u0434\u043E\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u2014 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0441\u0435\u0439\u0444 \u0441\u043E \u0441\u0432\u043E\u0438\u043C\u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438")}</div>`;
}
function tokenView(state = "empty") {
  return heading("\u0422\u043E\u043A\u0435\u043D \u0434\u043B\u044F \u0441\u0431\u043E\u0440\u043A\u0438", "CI/CD \xB7 deploy-production \xB7 #248") + `<div class="pw-devops__token-layout"><div>${field("\u0421\u0435\u0439\u0444 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C", "Production / DEPLOY_KEY")}${field("\u041F\u0440\u0430\u0432\u0430", "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435")}${field("\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F", '<span class="pw-it__select">15 \u043C\u0438\u043D\u0443\u0442' + chevron + "</span>")}
      <div class="pw-it__form-actions">${state === "empty" ? action("create-token", "\u0412\u044B\u0434\u0430\u0442\u044C \u0442\u043E\u043A\u0435\u043D", true) : result(state === "active" ? "\u0422\u043E\u043A\u0435\u043D \u0432\u044B\u0434\u0430\u043D \u0441\u0431\u043E\u0440\u043A\u0435 #248" : "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u0435\u043A\u0440\u0435\u0442\u0443 \u0437\u0430\u043A\u0440\u044B\u0442")}</div></div>
      <div class="pw-devops__token-card${state === "revoked" ? " is-revoked" : ""}"><span class="pw-label">\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F</span><strong>deploy-production</strong>
        <span class="pw-devops__token-state">${state === "empty" ? "\u0422\u043E\u043A\u0435\u043D \u0435\u0449\u0451 \u043D\u0435 \u0432\u044B\u0434\u0430\u043D" : state === "active" ? "\u0410\u043A\u0442\u0438\u0432\u0435\u043D" : "\u041E\u0442\u043E\u0437\u0432\u0430\u043D"}</span>
        <code>${state === "empty" ? "\u2014" : "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"}</code><span class="pw-it__muted">${state === "revoked" ? "\u0421\u0431\u043E\u0440\u043A\u0430 #248 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430" : "\u0422\u043E\u043B\u044C\u043A\u043E Production / DEPLOY_KEY"}</span>
        <div class="pw-devops__token-validity">${state === "active" ? "\u0412\u044B\u0434\u0430\u043D \u0432 14:00 \xB7 \u0434\u043E 14:15" : state === "revoked" ? "\u0414\u043E\u0441\u0442\u0443\u043F \u043E\u0442\u043E\u0437\u0432\u0430\u043D \u0432 14:06" : "\u0414\u043E\u0441\u0442\u0443\u043F \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C \u0441\u0431\u043E\u0440\u043A\u0438"}</div>
      </div></div>`;
}
function integrationView(mode = "api", complete = false) {
  const output = mode === "api" ? `<span class="pw-devops__code-status">200 OK</span><pre>{
  "name": "DEPLOY_KEY",
  "vault": "Production",
  "value": "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
}</pre>` : `<pre><span class="pw-devops__code-status">[passwork]</span> \u0421\u0435\u043A\u0440\u0435\u0442 DEPLOY_KEY \u043F\u043E\u043B\u0443\u0447\u0435\u043D
<span class="pw-devops__code-status">[deploy]</span> \u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A Production
<span class="pw-devops__code-status">[deploy]</span> \u0421\u0431\u043E\u0440\u043A\u0430 #248 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430</pre>`;
  return heading("\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u043A\u0440\u0435\u0442\u0430", "Production / DEPLOY_KEY \xB7 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435") + `<div class="pw-devops__integration-tabs"><span class="pw-it__button${mode === "api" ? " is-active" : ""}" data-demo="mode-api">API</span><span class="pw-it__button${mode === "cli" ? " is-active" : ""}" data-demo="mode-cli">CLI</span><span class="pw-it__muted">\u0422\u043E\u043A\u0435\u043D \u0441\u0431\u043E\u0440\u043A\u0438 #248</span></div>
    <div class="pw-devops__console"><div class="pw-devops__console-head"><span>${mode === "api" ? "API \xB7 \u0437\u0430\u043F\u0440\u043E\u0441 \u0441\u0435\u043A\u0440\u0435\u0442\u0430" : "CLI \xB7 deploy.sh"}</span><span>${complete ? "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E" : "\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443"}</span></div>
      <div class="pw-devops__console-body">${mode === "api" ? '<div class="pw-devops__request"><span class="pw-devops__method">GET</span><span>Production / DEPLOY_KEY</span></div><div class="pw-devops__auth">Authorization: Bearer \u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</div>' : '<div class="pw-devops__command"><span>$</span><code data-demo="cli-command">./deploy.sh --env production</code></div>'}
        <div class="pw-devops__output">${complete ? output : '<span class="pw-it__muted">\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F\u2026</span>'}</div>
      </div></div><div class="pw-devops__console-actions">${action(mode === "api" ? "run-api" : "run-cli", mode === "api" ? "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441" : "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C", true)}${complete ? result(mode === "api" ? "\u0421\u0435\u043A\u0440\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043F\u043E API" : "\u0421\u0435\u043A\u0440\u0435\u0442 \u043F\u0435\u0440\u0435\u0434\u0430\u043D \u0432 \u0441\u0431\u043E\u0440\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 CLI") : ""}</div>`;
}
function rotationView2(enabled = false, saved = false) {
  return heading("\u0420\u043E\u0442\u0430\u0446\u0438\u044F \u043A\u043B\u044E\u0447\u0435\u0439", "Production / REGISTRY_TOKEN") + option("rotation-setting", "\u041C\u0435\u043D\u044F\u0442\u044C \u043A\u043B\u044E\u0447 \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E", "\u041D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u043A\u043B\u044E\u0447 \u0432 \u0441\u0435\u0439\u0444\u0435", toggle("devops-rotation", enabled)) + `<div class="pw-devops__rotation-fields">${field("\u041F\u0435\u0440\u0438\u043E\u0434", '<span class="pw-it__select">\u041A\u0430\u0436\u0434\u044B\u0435 30 \u0434\u043D\u0435\u0439' + chevron + "</span>")}${field("\u0412\u0440\u0435\u043C\u044F", '<span class="pw-it__select">03:00 \xB7 \u041C\u0421\u041A' + chevron + "</span>")}</div>
    <div class="pw-it__form-actions">${action("save-schedule", saved ? "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E" : "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435", !saved)}</div>
    <div class="pw-devops__rotation-history"><span class="pw-label">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0440\u043E\u0442\u0430\u0446\u0438\u044F</span><div><span class="pw-devops__version">v13</span><span class="pw-it__muted">\u2192</span><span class="pw-devops__version is-current">v14</span><span>\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 03:00</span>${result("\u041A\u043B\u044E\u0447 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D")}</div></div>
    ${saved ? `<div class="pw-it__feedback">${result("\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0440\u043E\u0442\u0430\u0446\u0438\u044F \u0447\u0435\u0440\u0435\u0437 30 \u0434\u043D\u0435\u0439")}</div>` : ""}`;
}
function journalView2() {
  const rows = [
    ["14:06", "\u0421\u0431\u043E\u0440\u043A\u0430 #248", "\u0422\u043E\u043A\u0435\u043D \u043E\u0442\u043E\u0437\u0432\u0430\u043D", "deploy-production"],
    ["14:05", "CI runner \xB7 CLI", "\u041F\u043E\u043B\u0443\u0447\u0435\u043D \u0441\u0435\u043A\u0440\u0435\u0442", "DEPLOY_KEY"],
    ["14:04", "CI runner \xB7 API", "\u041F\u043E\u043B\u0443\u0447\u0435\u043D \u0441\u0435\u043A\u0440\u0435\u0442", "DEPLOY_KEY"],
    ["14:00", "\u041C\u0430\u0440\u0438\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u0430", "\u0412\u044B\u0434\u0430\u043D \u0442\u043E\u043A\u0435\u043D", "deploy-production"],
    ["03:00", "\u041F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E", "\u041A\u043B\u044E\u0447 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D", "REGISTRY_TOKEN"]
  ];
  return heading("\u0416\u0443\u0440\u043D\u0430\u043B \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439", "Production \xB7 \u0432\u0441\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043A \u0441\u0435\u043A\u0440\u0435\u0442\u0430\u043C") + `<div class="pw-it__filters"><span class="pw-it__select">\u0421\u0435\u0433\u043E\u0434\u043D\u044F${chevron}</span><span class="pw-it__select">\u0412\u0441\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F${chevron}</span></div>
    <div class="pw-it__journal pw-devops__journal"><div class="pw-label pw-it__journal-head"><span>\u0412\u0440\u0435\u043C\u044F</span><span>\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A</span><span>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span><span>\u041E\u0431\u044A\u0435\u043A\u0442</span></div>
    ${rows.map(([time, source, event, object], index) => `<div class="pw-it__journal-row"${index === 2 ? ' data-demo="api-event"' : ""}><span>${time}<small>\u0421\u0435\u0433\u043E\u0434\u043D\u044F</small></span><span>${source}</span><span>${event}<small class="pw-it__mobile-object">${object}</small></span><span>${object}</span></div>`).join("")}</div><div class="pw-it__overlay-slot"></div>`;
}
function initDevopsDashboardDemo(embed, workspace, options = {}) {
  const setEnvironment = (environment) => {
    const crumb = embed.querySelector(".pw-crumbs b");
    if (crumb) crumb.textContent = environment;
    embed.querySelectorAll("[data-environment]").forEach((row) => {
      row.classList.toggle("pw-tree-row--active", row.dataset.environment === environment);
    });
  };
  return initDashboardDemo(embed, workspace, {
    tabs: [["secrets", "\u0421\u0435\u043A\u0440\u0435\u0442\u044B"], ["integrations", "API \u0438 CLI"], ["tokens", "\u0422\u043E\u043A\u0435\u043D\u044B"], ["history", "\u0416\u0443\u0440\u043D\u0430\u043B"]],
    totalSteps: 6,
    initial: { tab: "secrets", html: environmentsView(), caption: "\u0414\u0435\u0440\u0436\u0438\u0442 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0437\u043D\u044B\u0445 \u0441\u0435\u0439\u0444\u0430\u0445." },
    createCues: ({ scene, click, hold, renderView, overlay, q }) => [
      scene("secrets", () => environmentsView(), "\u0414\u0435\u0440\u0436\u0438\u0442 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0437\u043D\u044B\u0445 \u0441\u0435\u0439\u0444\u0430\u0445.", 1),
      hold(1e3),
      click("env-Staging", () => {
        setEnvironment("Staging");
        renderView(environmentsView("Staging"));
      }),
      hold(1500),
      click("env-Production", () => {
        setEnvironment("Production");
        renderView(environmentsView());
      }),
      hold(1500),
      scene("tokens", () => tokenView(), "\u0412\u044B\u0434\u0430\u0451\u0442 \u0442\u043E\u043A\u0435\u043D \u043D\u0430 \u0432\u0440\u0435\u043C\u044F \u0441\u0431\u043E\u0440\u043A\u0438.", 2),
      click("create-token", () => renderView(tokenView("active"))),
      hold(2400),
      scene("integrations", () => integrationView(), "\u041E\u0442\u0434\u0430\u0451\u0442 \u0441\u0435\u043A\u0440\u0435\u0442 \u043F\u043E API. \u0418 \u0447\u0435\u0440\u0435\u0437 CLI.", 3),
      click("run-api", () => renderView(integrationView("api", true))),
      hold(2100),
      click("mode-cli", () => {
        renderView(integrationView("cli"));
        q("cli-command").textContent = "";
      }),
      { duration: 1300, frame: (progress) => {
        q("cli-command").textContent = "./deploy.sh --env production".slice(0, Math.ceil(progress * 27));
      } },
      click("run-cli", () => renderView(integrationView("cli", true))),
      hold(2600),
      scene("secrets", () => rotationView2(), "\u041C\u0435\u043D\u044F\u0435\u0442 \u043A\u043B\u044E\u0447\u0438 \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E.", 4),
      click("devops-rotation", () => renderView(rotationView2(true))),
      click("save-schedule", () => renderView(rotationView2(true, true))),
      hold(2500),
      scene("tokens", () => tokenView("active"), "\u0421\u0431\u043E\u0440\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430 \u2014 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u0435\u043A\u0440\u0435\u0442\u0430\u043C \u0437\u0430\u043A\u0440\u044B\u0442.", 5),
      hold(1400),
      { duration: 300, start: () => renderView(tokenView("revoked")) },
      hold(2400),
      scene("history", () => journalView2(), "\u041F\u043E\u043C\u043D\u0438\u0442 \u043A\u0430\u0436\u0434\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435.", 6),
      hold(1200),
      click("api-event", () => overlay(`<h4>\u0421\u0435\u043A\u0440\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043F\u043E API</h4>${field("\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "CI runner")}${field("\u0421\u0431\u043E\u0440\u043A\u0430", "#248")}${field("\u0417\u0430\u043F\u0438\u0441\u044C", "DEPLOY_KEY")}${field("\u0421\u0435\u0439\u0444", "Production")}${field("\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442", "200 OK")}<p>\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:04 \xB7 \u0442\u043E\u043A\u0435\u043D deploy-production</p>`)),
      hold(3e3)
    ]
  }, options);
}

// source/team-dashboards/security-dashboard-demo.ts
function alertsView() {
  return heading("\u0421\u043E\u0431\u044B\u0442\u0438\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C \xB7 \u0441\u0435\u0433\u043E\u0434\u043D\u044F") + `<div class="pw-sec-demo__alert" data-demo="suspicious-event"><span class="pw-sec-demo__alert-icon">${icon("eye")}</span><div><strong>\u041C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u0435\u0439</strong><p>\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 12 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0437\u0430 2 \u043C\u0438\u043D\u0443\u0442\u044B</p></div><span class="pw-sec-demo__badge">\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438</span><time>14:32</time></div>
    <div class="pw-sec-demo__events"><div class="pw-label pw-sec-demo__event-head"><span>\u0412\u0440\u0435\u043C\u044F</span><span>\u0421\u043E\u0431\u044B\u0442\u0438\u0435</span><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span></div>
      <div class="pw-sec-demo__event"><time>14:28</time><span>${icon("edit")}\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C<small>Sprinthost</small></span>${person("ilya")}</div>
      <div class="pw-sec-demo__event"><time>14:18</time><span>${icon("share")}\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u044B \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430<small>\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C</small></span>${person("marina")}</div>
      <div class="pw-sec-demo__event"><time>13:54</time><span>${icon("copy")}\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C<small>Astra Linux</small></span>${person("sasha")}</div>
    </div><div class="pw-it__feedback">\u041D\u043E\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435</div>`;
}
function alertDetail() {
  return heading("\u041C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u0435\u0439", "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:32 \xB7 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438") + `<div class="pw-sec-demo__incident"><div class="pw-sec-demo__incident-facts">${person("sasha")}${field("\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C")}${field("\u0417\u0430\u043F\u0438\u0441\u0438", "12 \u0437\u0430 2 \u043C\u0438\u043D\u0443\u0442\u044B")}${field("IP-\u0430\u0434\u0440\u0435\u0441", "203.0.113.24")}${field("\u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E", "Chrome \xB7 macOS")}</div>
      <div class="pw-sec-demo__activity"><span class="pw-label">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F</span><div><time>14:32:41</time><span>Sprinthost</span></div><div><time>14:32:36</time><span>Astra Linux</span></div><div><time>14:32:18</time><span>Site24x7</span></div><div><time>14:32:03</time><span>\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430</span></div><small>\u0415\u0449\u0451 8 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u2014 \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435</small></div></div>`;
}
function journalView3(filtered = false, recordOnly = false) {
  const rows = recordOnly ? [
    ["14:32", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:28", "ilya", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C", "Sprinthost"],
    ["14:06", "marina", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["13:41", "ilya", "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"]
  ] : filtered ? [
    ["14:32:41", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:32:36", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Astra Linux"],
    ["14:32:18", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Site24x7"],
    ["14:32:03", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430"]
  ] : [
    ["14:32", "sasha", "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", "Sprinthost"],
    ["14:28", "ilya", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C", "Sprinthost"],
    ["14:18", "marina", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u044B \u043F\u0440\u0430\u0432\u0430", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C"],
    ["13:54", "sasha", "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C", "Astra Linux"]
  ];
  return heading(recordOnly ? "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0437\u0430\u043F\u0438\u0441\u0438" : "\u0416\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439", recordOnly ? "Sprinthost \xB7 \u0432\u0441\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" : filtered ? "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 12 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0439 \u0437\u0430 2 \u043C\u0438\u043D\u0443\u0442\u044B" : "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C \xB7 \u0432\u0441\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438") + `<div class="pw-it__filters"><span class="pw-it__select">\u0421\u0435\u0433\u043E\u0434\u043D\u044F${chevron}</span><span class="pw-it__select" data-demo="security-user-filter">${filtered ? "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432" : "\u0412\u0441\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438"}${chevron}</span></div>
    <div class="pw-it__journal pw-sec-demo__journal"><div class="pw-label pw-it__journal-head"><span>\u0412\u0440\u0435\u043C\u044F</span><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span><span>\u041E\u0431\u044A\u0435\u043A\u0442</span></div>${rows.map(([time, key, event, object], index) => `<div class="pw-it__journal-row" data-demo="security-event-${index}"><span>${time}<small>\u0421\u0435\u0433\u043E\u0434\u043D\u044F</small></span>${person(key)}<span>${event}<small class="pw-it__mobile-object">${object}</small></span><span>${object}</span></div>`).join("")}</div><div class="pw-it__overlay-slot"></div>`;
}
function changesView(selected = false, compared = false) {
  const revision = (version) => `<div class="pw-sec-demo__revision"><span class="pw-label">\u0412\u0435\u0440\u0441\u0438\u044F ${version}${version === 8 ? " \xB7 \u0442\u0435\u043A\u0443\u0449\u0430\u044F" : ""}</span>${field("\u041B\u043E\u0433\u0438\u043D", version === 8 ? "admin@company.ru" : "user@company.ru")}${field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>')}${field("URL", "sprinthost.ru")}</div>`;
  return heading("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438", "Sprinthost \xB7 \u0438\u0437\u043C\u0435\u043D\u0438\u043B \u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432, \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 14:28", action("compare-versions", "\u0421\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0432\u0435\u0440\u0441\u0438\u0438")) + `<div class="pw-sec-demo__versions"><div class="pw-sec-demo__version-list"><span class="pw-sec-demo__version${!selected ? " is-active" : ""}"><strong>\u0412\u0435\u0440\u0441\u0438\u044F 8</strong><small>\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:28</small></span><span class="pw-sec-demo__version${selected ? " is-active" : ""}" data-demo="previous-version"><strong>\u0412\u0435\u0440\u0441\u0438\u044F 7</strong><small>\u0412\u0447\u0435\u0440\u0430, 11:20</small></span></div><div class="pw-sec-demo__comparison${compared ? " is-comparing" : ""}">${compared ? revision(7) + revision(8) : revision(selected ? 7 : 8)}</div></div>
    <div class="pw-it__feedback">${compared ? result("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u044B \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \xB7 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u0430\u0440\u043E\u043B\u0435\u0439 \u0441\u043A\u0440\u044B\u0442\u044B") : "\u0412 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0430\u0432\u0442\u043E\u0440, \u0432\u0440\u0435\u043C\u044F \u0438 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u0432\u0435\u0440\u0441\u0438\u0438 \u0437\u0430\u043F\u0438\u0441\u0438"}</div>`;
}
function accessView2() {
  return heading("\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0437\u0430\u043F\u0438\u0441\u0438", "Sprinthost \xB7 \u043E\u0431\u0449\u0438\u0439 \u0441\u0435\u0439\u0444 \xAB\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\xBB", action("record-access-history", "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432")) + `<div class="pw-sec-demo__access"><div class="pw-label pw-sec-demo__access-head"><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u0420\u043E\u043B\u044C</span><span>\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043E\u0441\u0442\u0443\u043F\u0430</span></div>
      <div class="pw-sec-demo__access-row">${person("marina")}<span>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440</span><span>\u041F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0441\u0435\u0439\u0444</span></div>
      <div class="pw-sec-demo__access-row">${person("ilya")}<span>\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440</span><span>\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E \u043B\u0438\u0447\u043D\u043E</span></div>
      <div class="pw-sec-demo__access-row" data-demo="review-sasha">${person("sasha")}<span>\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440</span><span>\u041F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043F\u0430\u043F\u043A\u0443</span></div>
    </div><div class="pw-it__feedback">\u041F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u0435\u0439\u0444\u0443 \u0438 \u043F\u0430\u043F\u043A\u0435</div><div class="pw-it__overlay-slot"></div>`;
}
function notificationView(enabled = false, saved = false) {
  return heading("\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C \xB7 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B \u0441\u0435\u0439\u0444\u0430") + option("mass-access-rule", "\u041C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u0435\u0439", "10 \u0438 \u0431\u043E\u043B\u0435\u0435 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0437\u0430 2 \u043C\u0438\u043D\u0443\u0442\u044B", toggle("mass-access-enabled", true)) + option("permission-change-rule", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", "\u0412\u044B\u0434\u0430\u0447\u0430, \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0440\u043E\u043B\u0438 \u0438\u043B\u0438 \u043E\u0442\u0437\u044B\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", toggle("notify-permissions", enabled)) + `<div class="pw-sec-demo__delivery">${icon("share")}<span>\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0438</span><strong>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B \u0441\u0435\u0439\u0444\u0430</strong></div><div class="pw-it__form-actions">${action("save-security-rules", saved ? "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B" : "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u0430", !saved)}</div>
    ${saved ? `<div class="pw-it__feedback">${result("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0445 \u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u043F\u0440\u0430\u0432 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B")}</div>` : ""}`;
}
function initSecurityDashboardDemo(embed, workspace, options = {}) {
  return initDashboardDemo(embed, workspace, {
    tabs: [["events", "\u0421\u043E\u0431\u044B\u0442\u0438\u044F"], ["journal", "\u0416\u0443\u0440\u043D\u0430\u043B"], ["changes", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"], ["rules", "\u041F\u0440\u0430\u0432\u0438\u043B\u0430"]],
    totalSteps: 5,
    initial: { tab: "events", html: alertsView(), caption: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0435\u0442 \u043E \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0445." },
    createCues: ({ scene, click, hold, renderView, overlay }) => [
      scene("events", () => alertsView(), "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0435\u0442 \u043E \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0445.", 1),
      hold(1400),
      click("suspicious-event", () => renderView(alertDetail())),
      hold(2600),
      scene("journal", () => journalView3(), "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043F\u043E\u043B\u043D\u044B\u0439 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F.", 2),
      click("security-user-filter", () => overlay(`<span class="pw-label">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span class="pw-it__menu-item">${person("marina")}</span><span class="pw-it__menu-item">${person("ilya")}</span><span class="pw-it__menu-item" data-demo="filter-sasha">${person("sasha")}</span>`)),
      click("filter-sasha", () => renderView(journalView3(true))),
      hold(2e3),
      click("security-event-0", () => overlay(`<h4>\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C Sprinthost</h4>${person("sasha")}${field("\u0412\u0440\u0435\u043C\u044F", "14:32:41")}${field("IP-\u0430\u0434\u0440\u0435\u0441", "203.0.113.24")}${field("\u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E", "Chrome \xB7 macOS")}${field("\u0420\u043E\u043B\u044C", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}`)),
      hold(2200),
      scene("changes", () => changesView(), "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.", 3),
      click("previous-version", () => renderView(changesView(true))),
      hold(1200),
      click("compare-versions", () => renderView(changesView(true, true))),
      hold(2800),
      scene("journal", () => accessView2(), "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442, \u0443 \u043A\u043E\u0433\u043E \u0435\u0441\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u0438 \u043A\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u043B \u043F\u0430\u0440\u043E\u043B\u044C.", 4),
      click("review-sasha", () => overlay(`<h4>\u041F\u0440\u0430\u0432\u0430 \u043D\u0430 Sprinthost</h4>${person("sasha")}${field("\u0420\u043E\u043B\u044C", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}${field("\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C")}<p>\u041C\u043E\u0436\u043D\u043E \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C.<br />\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B.</p>`)),
      hold(2e3),
      { duration: 300, start: () => renderView(accessView2()) },
      click("record-access-history", () => renderView(journalView3(false, true))),
      hold(2300),
      scene("rules", () => notificationView(), "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0441\u043B\u0435\u0434\u0438\u0442\u044C \u0437\u0430 \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C\u044E \u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438.", 5),
      click("notify-permissions", () => renderView(notificationView(true))),
      click("save-security-rules", () => renderView(notificationView(true, true))),
      hold(2600)
    ]
  }, options);
}

// source/team-dashboards/industry-dashboard-ui.ts
function industryRecords(title, subtitle, records) {
  return heading(title, subtitle) + `<div class="pw-industry__records"><div class="pw-label pw-industry__record-head"><span>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span><span>\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435</span><span>\u0414\u043E\u0441\u0442\u0443\u043F</span></div>${records.map((record) => `<div class="pw-industry__record" data-demo="${record.id}"><span>${icon("copy")}<strong>${record.name}</strong></span><span>${record.detail}</span><span class="pw-industry__tag">${record.label}</span></div>`).join("")}</div><div class="pw-it__feedback">\u041F\u0430\u0440\u043E\u043B\u0438 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u043E\u0431\u0449\u0435\u043C \u0441\u0435\u0439\u0444\u0435 \u0441 \u0440\u0430\u0437\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435\u043C \u043F\u0440\u0430\u0432</div>`;
}
function industryPassword(name, subtitle, login, address, copied = false) {
  return heading(name, subtitle) + `<div class="pw-tabs pw-it__record-tabs"><span class="pw-tab is-active">\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u0440\u043E\u043B\u044F</span><span class="pw-tab">\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439</span><span class="pw-tab">\u0420\u0435\u0434\u0430\u043A\u0446\u0438\u0438</span></div>` + field("\u041B\u043E\u0433\u0438\u043D", login, icon("copy")) + field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>', action("copy-industry-password", icon("copy") + "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C")) + field("URL-\u0430\u0434\u0440\u0435\u0441", `<span class="pw-it__link">${address}</span>`) + `<div class="pw-it__feedback">${copied ? result("\u041F\u0430\u0440\u043E\u043B\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \xB7 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0432 \u0436\u0443\u0440\u043D\u0430\u043B") : "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u0437\u0430\u043F\u0438\u0441\u044C\u044E \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435"}</div>`;
}
function industryJournal(title, subtitle, rows, filterLabel = "\u0412\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438") {
  return heading(title, subtitle) + `<div class="pw-it__filters"><span class="pw-it__select">\u0421\u0435\u0433\u043E\u0434\u043D\u044F${chevron}</span><span class="pw-it__select" data-demo="industry-record-filter">${filterLabel}${chevron}</span></div><div class="pw-it__journal pw-industry__journal"><div class="pw-label pw-it__journal-head"><span>\u0412\u0440\u0435\u043C\u044F</span><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span><span>\u041E\u0431\u044A\u0435\u043A\u0442</span></div>${rows.map((row) => `<div class="pw-it__journal-row"${row.id ? ` data-demo="${row.id}"` : ""}><span>${row.time}<small>\u0421\u0435\u0433\u043E\u0434\u043D\u044F</small></span>${person(row.user)}<span>${row.action}<small class="pw-it__mobile-object">${row.object}</small></span><span>${row.object}</span></div>`).join("")}</div><div class="pw-it__overlay-slot"></div>`;
}

// source/team-dashboards/government-dashboard-demo.ts
function rolesView(state = "pending") {
  const granted = state === "granted";
  return heading("\u0420\u043E\u043B\u0438 \u0438 \u0434\u043E\u0441\u0442\u0443\u043F", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442 \xB7 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C") + `<div class="pw-industry__roles"><div class="pw-label pw-industry__role-head"><span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</span><span>\u041F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435</span><span>\u0420\u043E\u043B\u044C</span></div>
      <div class="pw-industry__role-row">${person("marina")}<span>\u0418\u0422-\u043E\u0442\u0434\u0435\u043B</span><span>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440</span></div>
      <div class="pw-industry__role-row">${person("ilya")}<span>\u0418\u0422-\u043E\u0442\u0434\u0435\u043B</span><span>\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440</span></div>
      <div class="pw-industry__role-row${state === "revoked" ? " is-revoked" : ""}">${person("sasha")}<span>\u0414\u0435\u043B\u043E\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E</span><span class="pw-it__select" data-demo="gov-role">${granted ? "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" : "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430"}${chevron}</span></div>
    </div><div class="pw-industry__role-summary">${state === "pending" ? '<span class="pw-it__muted">\u041D\u0430\u0437\u043D\u0430\u0447\u044C\u0442\u0435 \u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439</span>' : granted ? result("\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C") : result("\u0414\u043E\u0441\u0442\u0443\u043F \u0421\u0430\u0448\u0438 \u041E\u0440\u043B\u043E\u0432\u0430 \u0441\u043D\u044F\u0442 \xB7 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430")}${granted ? action("gov-revoke", "\u0421\u043D\u044F\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F") : ""}</div><div class="pw-it__overlay-slot"></div>`;
}
function recordsView2() {
  return industryRecords("\u0412\u0435\u0434\u043E\u043C\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B", "\u041E\u0431\u0449\u0438\u0439 \u0441\u0435\u0439\u0444 \xB7 \u0413\u043E\u0441\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F", [
    { id: "gov-document", name: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442", detail: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442\u0430", label: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" },
    { id: "gov-portal", name: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B", detail: "\u0421\u0435\u0440\u0432\u0438\u0441\u044B \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432", label: "\u041F\u043E \u0440\u043E\u043B\u0438" },
    { id: "gov-mail", name: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0441\u0435\u0440\u0432\u0435\u0440", detail: "\u0421\u043B\u0443\u0436\u0435\u0431\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430", label: "\u041F\u043E \u0440\u043E\u043B\u0438" }
  ]);
}
function journalView4(filtered = false, revoked = false) {
  const events = [
    ...revoked ? [{ time: "14:30", user: "marina", action: "\u0421\u043D\u044F\u0442 \u0434\u043E\u0441\u0442\u0443\u043F", object: "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 \u042D\u0414\u041E", id: "gov-revoked-event" }] : [],
    { time: "14:21", user: "sasha", action: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C", object: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442", id: "gov-copy-event" },
    { time: "14:20", user: "sasha", action: "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", object: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442" },
    { time: "14:18", user: "marina", action: "\u0412\u044B\u0434\u0430\u043D \u0434\u043E\u0441\u0442\u0443\u043F", object: "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" },
    ...!filtered && !revoked ? [{ time: "14:05", user: "ilya", action: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C", object: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B" }] : []
  ];
  return industryJournal("\u0416\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439", revoked ? "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442 \xB7 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0432\u044B\u0434\u0430\u0447\u0438 \u0438 \u0441\u043D\u044F\u0442\u0438\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430" : "\u0412\u0435\u0434\u043E\u043C\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \xB7 \u0432\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u043F\u0430\u0440\u043E\u043B\u044F\u043C\u0438", events, filtered || revoked ? "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442" : "\u0412\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438");
}
function initGovernmentDashboardDemo(embed, workspace, options = {}) {
  return initDashboardDemo(embed, workspace, {
    tabs: [["roles", "\u0420\u043E\u043B\u0438"], ["records", "\u041F\u0430\u0440\u043E\u043B\u0438"], ["journal", "\u0416\u0443\u0440\u043D\u0430\u043B"]],
    totalSteps: 4,
    initial: { tab: "roles", html: rolesView(), caption: "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043F\u043E \u0440\u043E\u043B\u044F\u043C." },
    createCues: ({ scene, click, hold, renderView, overlay }) => [
      scene("roles", () => rolesView(), "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043F\u043E \u0440\u043E\u043B\u044F\u043C.", 1),
      hold(1200),
      click("gov-role", () => overlay(`<h4>\u0420\u043E\u043B\u044C \u0421\u0430\u0448\u0438 \u041E\u0440\u043B\u043E\u0432\u0430</h4><span class="pw-it__menu-item" data-demo="gov-reader">\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440<small>\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</small></span><span class="pw-it__menu-item">\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440<small>\u041F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u0438 \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C</small></span><span class="pw-it__menu-item">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440<small>\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C\u044E \u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438</small></span>`)),
      click("gov-reader", () => renderView(rolesView("granted"))),
      hold(2e3),
      scene("records", () => recordsView2(), "\u0425\u0440\u0430\u043D\u0438\u0442 \u043F\u0430\u0440\u043E\u043B\u0438 \u0432\u0435\u0434\u043E\u043C\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C.", 2),
      click("gov-document", () => renderView(industryPassword("\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442", "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 \u0440\u043E\u043B\u044C \xAB\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\xBB", "edo_operator", "edo.intra"))),
      hold(1200),
      click("copy-industry-password", () => renderView(industryPassword("\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442", "\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 \u0440\u043E\u043B\u044C \xAB\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\xBB", "edo_operator", "edo.intra", true))),
      hold(1800),
      scene("journal", () => journalView4(), "\u0424\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u0442 \u0432\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u043F\u0430\u0440\u043E\u043B\u044F\u043C\u0438.", 3),
      click("industry-record-filter", () => overlay(`<span class="pw-label">\u0417\u0430\u043F\u0438\u0441\u044C</span><span class="pw-it__menu-item" data-demo="gov-filter-document">\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442</span><span class="pw-it__menu-item">\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B</span><span class="pw-it__menu-item">\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0441\u0435\u0440\u0432\u0435\u0440</span>`)),
      click("gov-filter-document", () => renderView(journalView4(true))),
      hold(1300),
      click("gov-copy-event", () => overlay(`<h4>\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C</h4>${person("sasha")}${field("\u0417\u0430\u043F\u0438\u0441\u044C", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442")}${field("\u0412\u0440\u0435\u043C\u044F", "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:21")}${field("\u0420\u043E\u043B\u044C", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}${field("IP-\u0430\u0434\u0440\u0435\u0441", "10.20.0.14")}`)),
      hold(2400),
      scene("roles", () => rolesView("granted"), "\u0421\u043D\u0438\u043C\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0440\u0438\u044E.", 4),
      click("gov-revoke", () => overlay(`<h4>\u0421\u043D\u044F\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F?</h4><p>\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0441\u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442\u0430.</p>${action("gov-confirm-revoke", "\u0421\u043D\u044F\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F", true)}`)),
      click("gov-confirm-revoke", () => renderView(rolesView("revoked"))),
      hold(1600),
      click("tab-journal", () => {
        workspace.querySelectorAll(".pw-it__tabs .pw-tab").forEach((tab) => tab.classList.toggle("is-active", tab.getAttribute("data-demo") === "tab-journal"));
        renderView(journalView4(true, true));
      }),
      hold(2600)
    ]
  }, options);
}

// source/team-dashboards/manufacturing-dashboard-demo.ts
function systemsView() {
  return industryRecords("\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B", "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0435\u0442\u044C \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", [
    { id: "plant-scada", name: "SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", detail: "\u0418\u043D\u0436\u0435\u043D\u0435\u0440\u044B \u0410\u0421\u0423 \u0422\u041F", label: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440" },
    { id: "plant-gateway", name: "\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0448\u043B\u044E\u0437", detail: "\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430", label: "\u041F\u043E \u0440\u043E\u043B\u0438" },
    { id: "plant-station", name: "\u0421\u0442\u0430\u043D\u0446\u0438\u044F \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430", detail: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435", label: "\u041F\u043E \u0440\u043E\u043B\u0438" }
  ]);
}
function changesView2(compared = false) {
  const version = (current) => `<div class="pw-industry__version"><span class="pw-label">\u0412\u0435\u0440\u0441\u0438\u044F ${current ? "12 \xB7 \u0442\u0435\u043A\u0443\u0449\u0430\u044F" : "11"}</span>${field("\u041B\u043E\u0433\u0438\u043D", "scada_service")}${field("\u041F\u0430\u0440\u043E\u043B\u044C", '<span class="pw-it__secret">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>')}<div class="pw-industry__version-author">${person(current ? "ilya" : "marina")}<small>${current ? "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 09:42" : "\u0412\u0447\u0435\u0440\u0430, 16:10"}</small></div></div>`;
  return heading("\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0430\u0440\u043E\u043B\u044F", "SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", action("plant-compare", "\u0421\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0432\u0435\u0440\u0441\u0438\u0438")) + `<div class="pw-industry__versions${compared ? " is-comparing" : ""}">${compared ? version(false) : ""}${version(true)}</div>
    <div class="pw-it__feedback">${compared ? result("\u041F\u0430\u0440\u043E\u043B\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u043B \u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432 \xB7 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430") : "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u0432\u0440\u0435\u043C\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0438 \u0430\u0432\u0442\u043E\u0440 \u043A\u0430\u0436\u0434\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438"}</div>`;
}
function rotationView3(enabled = false, saved = false) {
  return heading("\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u043E\u0442\u0430\u0446\u0438\u0438", "\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0448\u043B\u044E\u0437 \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1") + option("plant-rotation-row", "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0442\u044C \u043E \u0441\u043C\u0435\u043D\u0435 \u043F\u0430\u0440\u043E\u043B\u044F", "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043E\u0432", toggle("plant-rotation", enabled)) + `<div class="pw-industry__rotation-fields">${field("\u041F\u0435\u0440\u0438\u043E\u0434", '<span class="pw-it__select">30 \u0434\u043D\u0435\u0439' + chevron + "</span>")}${field("\u041D\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C \u0437\u0430", '<span class="pw-it__select">3 \u0434\u043D\u044F' + chevron + "</span>")}</div>
    <div class="pw-it__form-actions">${action("plant-save-rotation", saved ? "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430" : "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443", !saved)}</div>
    ${saved ? `<div class="pw-it__notice">${icon("check")}<div><strong>\u041F\u0430\u0440\u043E\u043B\u044C \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u043E\u0433\u043E \u0448\u043B\u044E\u0437\u0430 \u043F\u043E\u0440\u0430 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</strong><p>\u0414\u043E \u043F\u043B\u0430\u043D\u043E\u0432\u043E\u0439 \u0440\u043E\u0442\u0430\u0446\u0438\u0438 \u2014 3 \u0434\u043D\u044F \xB7 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u044B \u0410\u0421\u0423 \u0422\u041F \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u044B</p></div></div>` : ""}`;
}
function alertView(detail = false) {
  return heading("\u041F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C", "\u041B\u0438\u043D\u0438\u044F \u2116 1 \xB7 \u0441\u0435\u0433\u043E\u0434\u043D\u044F") + `<div class="pw-industry__alert" data-demo="plant-alert"><span class="pw-industry__alert-icon">${icon("eye")}</span><div><strong>\u041C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u0435\u0439</strong><p>\u0421\u0430\u0448\u0430 \u041E\u0440\u043B\u043E\u0432 \xB7 8 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0437\u0430 1 \u043C\u0438\u043D\u0443\u0442\u0443</p></div><span>10:14</span></div>` + (detail ? `<div class="pw-industry__alert-details">${person("sasha")}${field("\u0420\u043E\u043B\u044C", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}${field("\u0421\u0435\u0439\u0444", "\u041B\u0438\u043D\u0438\u044F \u2116 1")}${field("\u0421\u043E\u0431\u044B\u0442\u0438\u0435", "\u041E\u0442\u043A\u0440\u044B\u0442\u044B 8 \u0437\u0430\u043F\u0438\u0441\u0435\u0439")}</div><div class="pw-it__feedback">${result("\u0414\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0436\u0443\u0440\u043D\u0430\u043B \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438")}</div>` : `<div class="pw-industry__recent"><span class="pw-label">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F</span><div><time>10:14</time><span>\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C SCADA</span>${person("sasha")}</div><div><time>10:05</time><span>\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u043E\u0442\u0430\u0446\u0438\u0438</span>${person("marina")}</div><div><time>09:42</time><span>\u0418\u0437\u043C\u0435\u043D\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C SCADA</span>${person("ilya")}</div></div>`);
}
function journalView5(filtered = false) {
  const events = [
    { time: "10:14", user: "sasha", action: "\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C", object: "SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", id: "plant-open-event" },
    ...!filtered ? [{ time: "10:05", user: "marina", action: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430", object: "\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0448\u043B\u044E\u0437" }] : [],
    { time: "09:42", user: "ilya", action: "\u0418\u0437\u043C\u0435\u043D\u0451\u043D \u043F\u0430\u0440\u043E\u043B\u044C", object: "SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1" },
    { time: "09:30", user: "ilya", action: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0430\u0440\u043E\u043B\u044C", object: "SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1" }
  ];
  return industryJournal("\u0416\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439", "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0435\u0442\u044C \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", events, filtered ? "SCADA" : "\u0412\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438");
}
function initManufacturingDashboardDemo(embed, workspace, options = {}) {
  return initDashboardDemo(embed, workspace, {
    tabs: [["systems", "\u0421\u0438\u0441\u0442\u0435\u043C\u044B"], ["changes", "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"], ["rotation", "\u0420\u043E\u0442\u0430\u0446\u0438\u044F"], ["journal", "\u0416\u0443\u0440\u043D\u0430\u043B"]],
    totalSteps: 5,
    initial: { tab: "systems", html: systemsView(), caption: "\u0420\u0430\u0437\u0434\u0435\u043B\u044F\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u043C." },
    createCues: ({ scene, click, hold, renderView, overlay }) => [
      scene("systems", () => systemsView(), "\u0420\u0430\u0437\u0434\u0435\u043B\u044F\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u043C.", 1),
      hold(1400),
      click("plant-scada", () => renderView(industryPassword("SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", "\u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432 \xB7 \u0438\u043D\u0436\u0435\u043D\u0435\u0440 \u0410\u0421\u0423 \u0422\u041F \xB7 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440", "scada_service", "scada.line-1.intra"))),
      hold(1100),
      click("copy-industry-password", () => renderView(industryPassword("SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1", "\u0418\u043B\u044C\u044F \u0421\u043C\u0438\u0440\u043D\u043E\u0432 \xB7 \u0438\u043D\u0436\u0435\u043D\u0435\u0440 \u0410\u0421\u0423 \u0422\u041F \xB7 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440", "scada_service", "scada.line-1.intra", true))),
      hold(1800),
      scene("changes", () => changesView2(), "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u0430\u0440\u043E\u043B\u044F.", 2),
      click("plant-compare", () => renderView(changesView2(true))),
      hold(2500),
      scene("rotation", () => rotationView3(), "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442 \u043E \u0440\u043E\u0442\u0430\u0446\u0438\u0438 \u043F\u043E \u0437\u0430\u0434\u0430\u043D\u043D\u043E\u0439 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435.", 3),
      click("plant-rotation", () => renderView(rotationView3(true))),
      click("plant-save-rotation", () => renderView(rotationView3(true, true))),
      hold(2400),
      scene("journal", () => alertView(), "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0435\u0442 \u043E \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438.", 4),
      click("plant-alert", () => renderView(alertView(true))),
      hold(2600),
      scene("journal", () => journalView5(), "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435.", 5),
      click("industry-record-filter", () => overlay(`<span class="pw-label">\u0417\u0430\u043F\u0438\u0441\u044C</span><span class="pw-it__menu-item" data-demo="plant-filter-scada">SCADA \xB7 \u041B\u0438\u043D\u0438\u044F \u2116 1</span><span class="pw-it__menu-item">\u0421\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0448\u043B\u044E\u0437</span><span class="pw-it__menu-item">\u0421\u0442\u0430\u043D\u0446\u0438\u044F \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0430</span>`)),
      click("plant-filter-scada", () => renderView(journalView5(true))),
      hold(1200),
      click("plant-open-event", () => overlay(`<h4>\u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u0430\u0440\u043E\u043B\u044C SCADA</h4>${person("sasha")}${field("\u0412\u0440\u0435\u043C\u044F", "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 10:14")}${field("\u0420\u043E\u043B\u044C", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")}${field("\u0421\u0435\u0439\u0444", "\u041B\u0438\u043D\u0438\u044F \u2116 1")}${field("\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F")}`)),
      hold(2500)
    ]
  }, options);
}

// source/team-dashboards/entry.ts
var teamScenarios = [
  {
    id: "it",
    name: "IT-\u043A\u043E\u043C\u0430\u043D\u0434\u044B",
    init: initItDashboardDemo,
    shell: "",
    caption: "\u0420\u0430\u0437\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043F\u043E \u0440\u043E\u043B\u044F\u043C \u0438 \u0433\u0440\u0443\u043F\u043F\u0430\u043C",
    label: "\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0434\u043B\u044F IT-\u043A\u043E\u043C\u0430\u043D\u0434: \u0434\u043E\u0441\u0442\u0443\u043F \u043F\u043E \u0440\u043E\u043B\u044F\u043C \u0438 \u0435\u0433\u043E \u043E\u0442\u0437\u044B\u0432, \u043E\u0431\u0449\u0438\u0435 \u043F\u0430\u043F\u043A\u0438, \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439, \u0440\u043E\u0442\u0430\u0446\u0438\u044F, 2FA, SSO, \u0444\u0430\u0439\u043B\u044B \u0438 \u0437\u0430\u043C\u0435\u0442\u043A\u0438, \u043E\u0431\u043C\u0435\u043D \u0441\u0441\u044B\u043B\u043A\u043E\u0439, \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D."
  },
  {
    id: "devops",
    name: "DevOps",
    init: initDevopsDashboardDemo,
    shell: "pw-devops-embed",
    caption: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u0443\u0447\u0451\u0442\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B",
    label: "\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0434\u043B\u044F DevOps: \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0439\u0444\u044B Production, Staging \u0438 Development, \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0439 \u0442\u043E\u043A\u0435\u043D \u0441\u0431\u043E\u0440\u043A\u0438, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u043A\u0440\u0435\u0442\u0430 \u043F\u043E API \u0438 CLI, \u0440\u043E\u0442\u0430\u0446\u0438\u044F \u043A\u043B\u044E\u0447\u0435\u0439 \u0438 \u0436\u0443\u0440\u043D\u0430\u043B \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439."
  },
  {
    id: "security",
    name: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C",
    init: initSecurityDashboardDemo,
    shell: "pw-security-embed",
    caption: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0438 \u0430\u0443\u0434\u0438\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
    label: "\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0434\u043B\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438: \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u043C \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u043F\u0430\u0440\u043E\u043B\u0435\u0439, \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u0441\u0438\u0439 \u0437\u0430\u043F\u0438\u0441\u0438, \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439."
  },
  {
    id: "government",
    name: "\u0413\u043E\u0441\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
    init: initGovernmentDashboardDemo,
    shell: "pw-industry-embed",
    caption: "\u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0439 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B",
    label: "\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0434\u043B\u044F \u0433\u043E\u0441\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0439: \u0440\u043E\u043B\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432, \u043F\u0430\u0440\u043E\u043B\u0438 \u0432\u0435\u0434\u043E\u043C\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C, \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0438 \u043E\u0442\u0437\u044B\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C \u0438\u0441\u0442\u043E\u0440\u0438\u0438."
  },
  {
    id: "manufacturing",
    name: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E",
    init: initManufacturingDashboardDemo,
    shell: "pw-industry-embed",
    caption: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u0434\u043B\u044F \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0439 \u0438 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043A\u043E\u043C\u0430\u043D\u0434",
    label: "\u041F\u0430\u0441\u0441\u0432\u043E\u0440\u043A \u0434\u043B\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430: \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u043C, \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0430\u0440\u043E\u043B\u044F SCADA, \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u043E\u0442\u0430\u0446\u0438\u0438, \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E \u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438 \u0438 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439."
  }
];
function shellFor(index) {
  let sidebar = DASHBOARD_SIDEBAR_MARKUP;
  let header = DASHBOARD_HEADER_MARKUP;
  if (index === 1) {
    const sharedStart = sidebar.indexOf('<div class="pw-sec"><span class="pw-sec__title">\u041E\u0431\u0449\u0438\u0435 \u0441\u0435\u0439\u0444\u044B');
    const treeStart = sidebar.indexOf('<div class="pw-tree">', sharedStart);
    const sharedEnd = sidebar.indexOf('<div class="pw-sec"><span class="pw-sec__title">\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u0435\u0439\u0444\u044B', treeStart);
    const folder = sidebar.match(/<span class="pw-tree-row__folder">(.*?)<\/span>/)?.[1].replace(/fill="#[^"]+"/g, 'fill="currentColor"') ?? "";
    sidebar = sidebar.slice(0, treeStart) + `<div class="pw-tree pw-devops__vaults">${["Production", "Staging", "Development"].map((name, i) => `<div class="pw-tree-row pw-tree-row--l1${i === 0 ? " pw-tree-row--active" : ""}" data-environment="${name}"><span class="pw-tree-row__folder">${folder}</span><span class="pw-tree-row__text">${name}</span><span class="pw-devops__vault-count">${[12, 8, 6][i]}</span></div>`).join("")}</div>` + sidebar.slice(sharedEnd);
    header = header.replace("\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "DevOps").replace("\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C", "Production").replace("\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0430\u043F\u043A\u0435:", "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u0435\u0439\u0444\u0443:").replace("33 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F", "8 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439").replace("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0435\u043A\u0440\u0435\u0442");
  } else if (index >= 3) {
    const [vault, group, folder, other] = index === 3 ? ["\u0413\u043E\u0441\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F", "\u0412\u0435\u0434\u043E\u043C\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442", "\u0421\u043B\u0443\u0436\u0435\u0431\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044B"] : ["\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E", "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0435\u0442\u044C", "\u041B\u0438\u043D\u0438\u044F \u2116 1", "\u041E\u0444\u0438\u0441\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044B"];
    sidebar = sidebar.replace("\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", vault).replace("\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0438 2FA", group).replace("\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C", folder).replace("\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u0430", "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B").replace(">\u0420\u0435\u043A\u043B\u0430\u043C\u0430<", `>${other}<`);
    header = header.replace("\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", vault).replace("\u0414\u043E\u0441\u0442\u0443\u043F\u044B \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u043C", folder);
  }
  return `<div class="pw-stage" aria-hidden="true"><div class="pw-app"><div class="pw-audit__sidebar">${sidebar}</div><div class="pw-main"><div class="pw-audit__header">${header}</div><div class="pw-audit__workspace pw-it__workspace"></div></div></div></div>`;
}
function mountTeamDashboard(embed, index) {
  const scenario = teamScenarios[index];
  if (!embed || !scenario) return () => {
  };
  let alive = true;
  let controller;
  embed.className = `pw-team-dashboard pw-embed pw-audit-embed pw-it-embed ${scenario.shell}`;
  embed.setAttribute("aria-label", scenario.label);
  embed.dataset.scenario = scenario.id;
  const fit = () => embed.style.setProperty("--pw-s", String(embed.clientWidth / 1344));
  const play = () => {
    if (!alive) return;
    controller?.dispose();
    embed.innerHTML = shellFor(index);
    fit();
    controller = scenario.init(embed, embed.querySelector(".pw-it__workspace"), {
      onComplete: () => queueMicrotask(play)
    });
  };
  const resize = new ResizeObserver(fit);
  resize.observe(embed);
  play();
  return () => {
    alive = false;
    controller?.dispose();
    resize.disconnect();
    embed.replaceChildren();
  };
}
export {
  mountTeamDashboard,
  teamScenarios
};
