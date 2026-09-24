// source/live-dashboard/dashboard-shared.ts
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
var DASHBOARD_ACCESS = [
  ["marina", "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440"],
  ["ilya", "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440"],
  ["sasha", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440"]
];

// source/live-dashboard/live-dashboard-engine.ts
var WIDTH = 1344;
var ENTRIES = [
  { id: "emergency", name: "Emergency Server User", icon: "emergency", login: "emergency@passwork.ru", pass: "Qw7#rT2v!mN9xB", urls: ["https://passwork.ru/"], totp: true, tags: ["Admin", "SSH"], access: "1 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C, 1 \u0441\u0441\u044B\u043B\u043A\u0430", fav: false, dot: true },
  { id: "site24x7", name: "Site24x7 Monitoring", icon: "cloud", login: "monitoring@passwork.ru", pass: "zK4$pL8w@cD3hM", urls: ["https://www.site24x7.com/login"], totp: false, tags: ["Monitoring"], access: "3 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0445 \u043F\u0430\u0440\u043E\u043B\u044F", fav: false },
  { id: "perpy", name: "Per.py", icon: "py", login: "deploy@per.py", pass: "Hf6&nV1q%sY5tR", urls: ["https://per.py/"], totp: false, tags: ["DevOps"], access: "\u041D\u0435\u0442 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u0430", fav: false },
  { id: "sprinthost", name: "Sprinthost", icon: "sprinthost", login: "user@passwork.ru", pass: "hT7#kQ9v!x2mLw", urls: ["https://sprinthost.ru/", "https://cp.sprinthost.ru/auth/login"], totp: true, tags: ["Admin", "GIT"], access: "2 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0445 \u043F\u0430\u0440\u043E\u043B\u044F, 1 \u0441\u0441\u044B\u043B\u043A\u0430, 1 \u044F\u0440\u043B\u044B\u043A", fav: true },
  { id: "astra", name: "Astra Linux", icon: "astra", login: "admin@astra.local", pass: "Bp3!wE8c$gU4kZ", urls: ["https://astralinux.ru/"], totp: false, tags: ["Linux", "Admin"], access: "1 \u0441\u0441\u044B\u043B\u043A\u0430, 2 \u044F\u0440\u043B\u044B\u043A\u0430", fav: false }
];
var HISTORY = [
  ["marina", "\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0430 \u043F\u0430\u0440\u043E\u043B\u044C", "\u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E"],
  ["ilya", "\u0438\u0437\u043C\u0435\u043D\u0438\u043B \u043F\u0430\u0440\u043E\u043B\u044C", "\u0432\u0447\u0435\u0440\u0430, 18:42"],
  ["sasha", "\u0434\u043E\u0431\u0430\u0432\u0438\u043B \u044F\u0440\u043B\u044B\u043A \xAB{tag}\xBB", "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"],
  ["marina", "\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0430\u0440\u043E\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E A", "12 \u0430\u0432\u0433"],
  ["ilya", "\u0441\u043E\u0437\u0434\u0430\u043B \u0437\u0430\u043F\u0438\u0441\u044C", "19 \u043C\u0430\u044F"]
];
var VERSIONS = [
  [4, "28 \u0430\u0432\u0433, 18:42", "ilya", true],
  [3, "12 \u0430\u0432\u0433, 10:07", "marina"],
  [2, "3 \u0438\u044E\u043B, 16:51", "sasha"],
  [1, "19 \u043C\u0430\u044F, 09:30", "marina"]
];
var glyph = (kind, large = false) => {
  const cls = `pw-glyph pw-glyph--${kind}${large ? " pw-glyph--lg" : ""}`;
  if (kind === "emergency") return `<span class="${cls} pw-glyph--sq">E</span>`;
  if (kind === "py") return `<span class="${cls} pw-glyph--sq">py</span>`;
  if (kind === "sprinthost") return `<span class="${cls}">${DASHBOARD_ICONS.sprint}</span>`;
  if (kind === "cloud") return `<span class="${cls}">${DASHBOARD_ICONS.cloud}</span>`;
  return `<span class="${cls}">${DASHBOARD_ICONS.astra}</span>`;
};
var random = (a, b) => a + Math.random() * (b - a);
var HOME_ENTRY = "sprinthost";
var FOUND_ENTRY = "astra";
var QUERY = "admin";
var clamp = (v, min, max) => Math.max(min, Math.min(max, v));
var easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
function initLiveDashboard(embed, { animate = true } = {}) {
  const stage = embed.querySelector(".pw-stage");
  const app = embed.querySelector(".pw-app");
  const itemsEl = embed.querySelector(".pw-items");
  const detailEl = embed.querySelector(".pw-detail");
  if (!stage || !app || !itemsEl || !detailEl) return () => void 0;
  const $ = (selector) => app.querySelector(selector);
  const $$ = (selector) => Array.from(app.querySelectorAll(selector));
  let alive = true;
  let scale = 1;
  let offscreen = false;
  const timers = /* @__PURE__ */ new Set();
  const later = (fn, ms) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (alive) fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const fit = () => {
    scale = embed.clientWidth / (stage.offsetWidth || WIDTH) || 1;
    embed.style.setProperty("--pw-s", String(scale));
  };
  fit();
  const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
  if (resizeObserver) resizeObserver.observe(embed);
  else window.addEventListener("resize", fit);
  const state = {
    entry: ENTRIES.find((e) => e.id === HOME_ENTRY) ?? ENTRIES[0],
    tab: "data",
    reveal: false,
    totpCode: "203 572",
    totpSlot: Math.floor(Date.now() / 3e4),
    query: ""
  };
  const searchHits = (raw) => {
    const q = raw.trim().toLowerCase();
    if (!q) return ENTRIES.map((entry) => ({ entry }));
    return ENTRIES.flatMap((entry) => {
      const at = entry.name.toLowerCase().indexOf(q);
      if (at >= 0) return [{ entry, at }];
      if (entry.login.toLowerCase().includes(q)) return [{ entry, hint: entry.login }];
      const chip = entry.tags.find((tag) => tag.toLowerCase().includes(q));
      return chip ? [{ entry, chip }] : [];
    });
  };
  const itemHTML = ({ entry: e, at, hint, chip }, q) => {
    const name = at == null ? e.name : `${e.name.slice(0, at)}<mark>${e.name.slice(at, at + q.length)}</mark>${e.name.slice(at + q.length)}`;
    const extra = hint ? `<span class="pw-item__hint">${hint}</span>` : chip ? `<span class="pw-item__hint pw-item__hint--chip">${chip}</span>` : "";
    return `${e.dot ? '<i class="pw-item__dot"></i>' : ""}${glyph(e.icon)}<span>${name}</span>${extra}`;
  };
  const renderItems = (animate2 = true) => {
    const q = state.query.trim();
    const hits = searchHits(q);
    const list = $(".pw-list");
    if (list) list.classList.toggle("is-searching", q.length > 0);
    const label = $(".pw-label--second");
    if (label) label.textContent = q ? `\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \xB7 ${hits.length}` : "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435";
    const wanted = new Map(hits.map((hit) => [hit.entry.id, hit]));
    const existing = /* @__PURE__ */ new Map();
    for (const el of Array.from(itemsEl.children)) {
      const id = el.dataset.id;
      if (!id || el.classList.contains("is-leaving")) continue;
      if (wanted.has(id)) {
        existing.set(id, el);
      } else if (animate2) {
        el.classList.add("is-leaving");
        el.style.height = `${el.offsetHeight}px`;
        el.getBoundingClientRect();
        el.style.height = "0px";
        later(() => el.remove(), 200);
      } else {
        el.remove();
      }
    }
    let cursor2 = null;
    for (const hit of hits) {
      const id = hit.entry.id;
      let el = existing.get(id);
      if (!el) {
        el = document.createElement("div");
        el.className = `pw-item${animate2 ? " is-entering" : ""}`;
        el.dataset.id = id;
        el.innerHTML = itemHTML(hit, q);
        let ref = cursor2 ? cursor2.nextElementSibling : itemsEl.firstElementChild;
        while (ref && ref.classList.contains("is-leaving")) ref = ref.nextElementSibling;
        itemsEl.insertBefore(el, ref);
        if (animate2) later(() => el?.classList.remove("is-entering"), 260);
      } else {
        const html = itemHTML(hit, q);
        if (el.innerHTML !== html) el.innerHTML = html;
      }
      el.classList.toggle("is-selected", id === state.entry.id);
      cursor2 = el;
    }
    const empty = itemsEl.querySelector(".pw-list__empty");
    if (!hits.length && !empty) {
      const el = document.createElement("div");
      el.className = "pw-list__empty";
      el.textContent = "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E";
      itemsEl.appendChild(el);
    } else if (hits.length && empty) {
      empty.remove();
    }
  };
  const searchEl = $(".pw-search");
  const searchValue = $(".pw-search__value");
  const setQuery = (q) => {
    state.query = q;
    if (searchValue) searchValue.textContent = q;
    if (searchEl) searchEl.classList.toggle("has-value", q.length > 0);
    renderItems();
  };
  const searchFocus = () => searchEl?.classList.add("is-focused");
  const searchBlur = () => searchEl?.classList.remove("is-focused");
  const secretHTML = () => state.reveal ? `<span class="pw-secret">${state.entry.pass}</span>` : `<span class="pw-dots">${"\u2022".repeat(15)}</span>`;
  const rowsHTML = (e) => `<div class="pw-rows">
    <div class="pw-row pw-row--first"><div class="pw-row__label">\u041B\u043E\u0433\u0438\u043D</div><div class="pw-row__val">${e.login}</div><div class="pw-row__acts"><span class="pw-ib" data-act="copy" data-copy="login">${DASHBOARD_ICONS.copy}</span></div></div>
    <div class="pw-row"><div class="pw-row__label">\u041F\u0430\u0440\u043E\u043B\u044C</div><div class="pw-row__val" data-role="secret">${secretHTML()}</div><div class="pw-row__acts"><span class="pw-ib" data-act="eye">${state.reveal ? DASHBOARD_ICONS.eyeOff : DASHBOARD_ICONS.eye}</span><span class="pw-ib" data-act="copy" data-copy="pass">${DASHBOARD_ICONS.copy}</span></div></div>
    <div class="pw-row"><div class="pw-row__label">URL-\u0430\u0434\u0440\u0435\u0441\u0430</div><div class="pw-row__val pw-row__val--col">${e.urls.map((u) => `<a>${u}</a>`).join("")}</div><div class="pw-row__acts pw-row__acts--col">${e.urls.map((_, i) => `<span class="pw-ib" data-act="copy" data-copy="url${i + 1}">${DASHBOARD_ICONS.copy}</span>`).join("")}</div></div>
    ${e.totp ? `<div class="pw-row"><div class="pw-row__label">TOTP</div><div class="pw-row__val"><span class="pw-totp" data-role="totp">${state.totpCode}</span></div><div class="pw-row__acts"><svg class="pw-ring" viewBox="0 0 16 16"><circle class="pw-ring__bg" cx="8" cy="8" r="6"/><circle class="pw-ring__fg" data-role="ring" cx="8" cy="8" r="6"/></svg><span class="pw-ib" data-act="copy" data-copy="totp">${DASHBOARD_ICONS.copy}</span></div></div>` : ""}
    <div class="pw-row pw-row--last"><div class="pw-row__label">\u0422\u0435\u0433\u0438</div><div class="pw-row__val"><div class="pw-chips">${e.tags.map((t) => `<span class="pw-chip">${t}</span>`).join("")}</div></div><div></div></div>
  </div>`;
  const historyHTML = (e, stagger) => `<div class="pw-rows${stagger ? " pw-rows--stagger" : ""}">${HISTORY.map(([key, text, time], i) => {
    const who = DASHBOARD_PEOPLE[key];
    return `<div class="pw-hist${i ? "" : " pw-hist--first"}"><span class="pw-mini" style="background:${who.color}">${who.init}</span><span class="pw-hist__text"><b>${who.full}</b> ${text.replace("{tag}", e.tags[e.tags.length - 1])}</span><span class="pw-hist__time">${time}</span></div>`;
  }).join("")}</div>`;
  const versionsHTML = () => `<div class="pw-rows">${VERSIONS.map(([n, date, key, current], i) => {
    const who = DASHBOARD_PEOPLE[key];
    return `<div class="pw-ver${i ? "" : " pw-ver--first"}"><span class="pw-mini" style="background:${who.color}">${who.init}</span><span class="pw-ver__num">\u0420\u0435\u0434\u0430\u043A\u0446\u0438\u044F ${n}</span><span class="pw-ver__by">${who.full}</span>${current ? '<span class="pw-ver__cur">\u0422\u0435\u043A\u0443\u0449\u0430\u044F</span>' : ""}<span class="pw-ver__meta">${date}</span></div>`;
  }).join("")}</div>`;
  const renderDetail = (opts = {}) => {
    const e = state.entry;
    const tabs = [["data", "\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u0440\u043E\u043B\u044F"], ["history", "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439"], ["versions", "\u0420\u0435\u0434\u0430\u043A\u0446\u0438\u0438"]];
    detailEl.innerHTML = `<div class="pw-detail__head"><div class="pw-detail__title">${glyph(e.icon, true)}<h3>${e.name}</h3><span class="pw-star${e.fav ? " is-on" : ""}" data-act="star">${DASHBOARD_ICONS.star}</span></div><span class="pw-close" data-act="close">${DASHBOARD_ICONS.close}</span></div>
      <div class="pw-detail__meta"><div><div class="pw-meta__title">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F:</div><div class="pw-meta__sub">${e.access}</div></div><div class="pw-circles"><span class="pw-circle" data-act="share">${DASHBOARD_ICONS.share}</span><span class="pw-circle" data-act="edit">${DASHBOARD_ICONS.edit}</span><span class="pw-circle" data-act="more">${DASHBOARD_ICONS.more}</span></div></div>
      <div class="pw-tabs">${tabs.map(([key, label]) => `<span class="pw-tab${state.tab === key ? " is-active" : ""}" data-tab="${key}">${label}</span>`).join("")}</div>
      ${state.tab === "data" ? rowsHTML(e) : state.tab === "history" ? historyHTML(e, Boolean(opts.stagger)) : versionsHTML()}`;
    totpTick();
  };
  const selectEntry = (id) => {
    const e = ENTRIES.find((x) => x.id === id);
    if (!e || e === state.entry) return;
    state.entry = e;
    state.reveal = false;
    state.tab = "data";
    $$(".pw-item").forEach((el) => el.classList.toggle("is-selected", el.dataset.id === id));
    detailEl.classList.remove("is-in");
    detailEl.getBoundingClientRect();
    renderDetail();
    detailEl.classList.add("is-in");
  };
  const setTab = (tab, opts = {}) => {
    if (state.tab === tab) return;
    state.tab = tab;
    detailEl.classList.remove("is-in");
    renderDetail(opts);
    if (!opts.stagger) {
      const rows = $(".pw-rows");
      if (rows) rows.style.animation = "pw-fade-in .22s ease-out";
    }
  };
  const setReveal = (on) => {
    state.reveal = on;
    const secret = $('[data-role="secret"]');
    if (secret) secret.innerHTML = secretHTML();
    const eye = $('[data-act="eye"]');
    if (eye) eye.innerHTML = state.reveal ? DASHBOARD_ICONS.eyeOff : DASHBOARD_ICONS.eye;
  };
  const appRect = (el) => {
    const r = el.getBoundingClientRect();
    const a = app.getBoundingClientRect();
    const visualScale = a.width / app.offsetWidth || scale;
    return {
      left: (r.left - a.left) / visualScale,
      top: (r.top - a.top) / visualScale,
      width: r.width / visualScale,
      height: r.height / visualScale
    };
  };
  const toast = (anchor, text) => {
    const r = appRect(anchor);
    const el = document.createElement("div");
    el.className = "pw-toast";
    el.textContent = text;
    el.style.left = `${r.left + r.width / 2}px`;
    el.style.top = `${r.top - 4}px`;
    app.appendChild(el);
    later(() => el.remove(), 1450);
  };
  const copyFlash = (btn) => {
    if (!btn) return;
    btn.classList.add("is-done");
    btn.innerHTML = DASHBOARD_ICONS.check;
    later(() => {
      if (btn.isConnected) {
        btn.classList.remove("is-done");
        btn.innerHTML = DASHBOARD_ICONS.copy;
      }
    }, 1300);
    toast(btn, "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E");
  };
  const press = (el) => {
    if (!el) return;
    el.classList.add("pw-pressed");
    later(() => el.classList.remove("pw-pressed"), 140);
  };
  const generateCode = () => {
    const digits = String(Math.floor(1e5 + Math.random() * 9e5));
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  };
  function totpTick() {
    if (offscreen || document.hidden) return;
    const now = Date.now();
    const slot = Math.floor(now / 3e4);
    const remaining = 30 - now / 1e3 % 30;
    if (slot !== state.totpSlot) {
      state.totpSlot = slot;
      state.totpCode = generateCode();
      const code = $('[data-role="totp"]');
      if (code) {
        code.classList.remove("is-flip");
        code.getBoundingClientRect();
        code.classList.add("is-flip");
        later(() => {
          code.textContent = state.totpCode;
        }, 160);
      }
    }
    const ring = $('[data-role="ring"]');
    if (ring) {
      const circumference = 2 * Math.PI * 6;
      ring.style.strokeDasharray = String(circumference);
      ring.style.strokeDashoffset = String(circumference * (1 - remaining / 30));
    }
  }
  const totpTimer = window.setInterval(totpTick, 500);
  renderItems(false);
  renderDetail();
  const isPaused = () => offscreen || document.hidden;
  const playbackWaiters = /* @__PURE__ */ new Set();
  const wakePlayback = () => {
    if (alive && isPaused()) return;
    const waiters = [...playbackWaiters];
    playbackWaiters.clear();
    waiters.forEach((resolve) => resolve());
    if (alive) totpTick();
  };
  const waitForPlayback = () => new Promise((resolve) => {
    if (!alive || !isPaused()) resolve();
    else playbackWaiters.add(resolve);
  });
  const intersection = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(
    (entries) => {
      offscreen = !entries[0].isIntersecting;
      wakePlayback();
    },
    { threshold: 0.02 }
  ) : null;
  if (intersection) intersection.observe(embed);
  document.addEventListener("visibilitychange", wakePlayback);
  const sleep = async (ms) => {
    let left = ms;
    while (alive && left > 0) {
      await waitForPlayback();
      if (!alive) return;
      const slice = Math.min(left, 90);
      const started = performance.now();
      await new Promise((resolve) => {
        later(resolve, slice);
      });
      if (!isPaused()) left -= performance.now() - started;
    }
  };
  const typeSearch = async (text) => {
    for (const ch of text) {
      if (!alive) return;
      setQuery(state.query + ch);
      await sleep(random(55, 105));
    }
  };
  const revealTyped = async () => {
    const secret = $('[data-role="secret"]');
    if (!secret) return;
    const pass = state.entry.pass;
    const eye = $('[data-act="eye"]');
    if (eye) eye.innerHTML = DASHBOARD_ICONS.eyeOff;
    state.reveal = true;
    for (let i = 1; i <= pass.length; i++) {
      if (!alive) return;
      secret.innerHTML = `<span class="pw-secret">${pass.slice(0, i)}${"\u2022".repeat(pass.length - i)}</span>`;
      await sleep(28);
    }
  };
  let accessMenu = null;
  const closeAccess = () => {
    accessMenu?.remove();
    accessMenu = null;
  };
  const openAccess = () => {
    closeAccess();
    const anchor = $('[data-act="head-share"]');
    if (!anchor) return;
    const r = appRect(anchor);
    const menu = document.createElement("div");
    menu.className = "pw-menu";
    menu.innerHTML = '<div class="pw-menu__title">\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0430\u043F\u043A\u0435</div>' + DASHBOARD_ACCESS.map(([key, role]) => {
      const who = DASHBOARD_PEOPLE[key];
      return `<div class="pw-access"><span class="pw-mini" style="background:${who.color}">${who.init}</span><span>${who.full}</span><span class="pw-access__role">${role}</span></div>`;
    }).join("") + '<div class="pw-access"><span class="pw-mini pw-mini--more">30</span><span>\u0415\u0449\u0451 30 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439</span><span class="pw-access__role">\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440</span></div>';
    menu.style.left = `${r.left}px`;
    menu.style.top = `${r.top + r.height + 10}px`;
    app.appendChild(menu);
    accessMenu = menu;
  };
  const toggleTree = (row) => {
    const group = row && row.closest(".pw-tree-group");
    if (group) group.classList.toggle("is-open");
  };
  const tween = (duration, frame) => new Promise((resolve) => {
    let elapsed = 0;
    let last = null;
    const step = async (ts) => {
      if (!alive) return resolve();
      if (isPaused()) {
        await waitForPlayback();
        if (!alive) return resolve();
        last = null;
        requestAnimationFrame(step);
        return;
      }
      if (last == null) last = ts;
      elapsed += Math.min(48, ts - last);
      last = ts;
      const p = Math.min(1, elapsed / duration);
      frame(p);
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
  const layer = embed.querySelector(".pw-cursors");
  class Cursor {
    constructor(start) {
      this.hoverEl = null;
      this.hoverTarget = null;
      this.x = start.x;
      this.y = start.y;
      this.el = document.createElement("div");
      this.el.className = "pw-cursor";
      this.el.innerHTML = DASHBOARD_CURSOR_MARKUP;
      layer?.appendChild(this.el);
      this.render();
    }
    render() {
      this.el.style.transform = `translate(${this.x - 1}px, ${this.y - 1}px)`;
    }
    set(x, y) {
      this.x = x;
      this.y = y;
      this.render();
    }
    show() {
      this.el.classList.add("is-visible");
    }
    hide() {
      this.el.classList.remove("is-visible");
    }
    resolve(target) {
      if (!target || !alive) return null;
      if (typeof target === "string") return $(target);
      if (typeof target === "function") return target() ?? null;
      return target.isConnected ? target : null;
    }
    pointIn(el, o) {
      const r = appRect(el);
      const fx = o.fx ?? (r.width < 60 ? 0.5 + random(-0.06, 0.06) : random(0.14, 0.5));
      const fy = o.fy ?? (r.height < 40 ? 0.5 + random(-0.08, 0.08) : random(0.35, 0.65));
      return { x: r.left + r.width * fx, y: r.top + r.height * fy };
    }
    /* Ход по слегка изогнутой дуге: старт и финиш мягкие, без прямых «телепортов». */
    async moveTo(p, o = {}) {
      this.unhover();
      const from = { x: this.x, y: this.y };
      const dx = p.x - from.x;
      const dy = p.y - from.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;
      const duration = o.dur ?? clamp(420 + dist * 1.35, 520, 1600) * random(0.95, 1.1);
      const bend = dist * random(-0.1, 0.1);
      const nx = -dy / dist;
      const ny = dx / dist;
      const cx = (from.x + p.x) / 2 + nx * bend;
      const cy = (from.y + p.y) / 2 + ny * bend;
      await tween(duration, (t) => {
        const e = easeInOutQuart(t);
        const u = 1 - e;
        this.set(u * u * from.x + 2 * u * e * cx + e * e * p.x, u * u * from.y + 2 * u * e * cy + e * e * p.y);
      });
    }
    async go(target, o = {}) {
      let el = this.resolve(target);
      if (!el) return null;
      await this.moveTo(this.pointIn(el, o), o);
      el = this.resolve(target);
      if (!el) return null;
      this.setHover(el, target);
      return el;
    }
    setHover(el, target) {
      if (this.hoverEl && this.hoverEl !== el) this.unhover();
      el.classList.add("pw-hl");
      this.hoverEl = el;
      this.hoverTarget = target;
    }
    unhover() {
      const el = this.hoverEl;
      if (!el) return;
      this.hoverEl = null;
      this.hoverTarget = null;
      el.classList.remove("pw-hl");
    }
    ripple() {
      const r = document.createElement("div");
      r.className = "pw-ripple";
      r.style.left = `${this.x}px`;
      r.style.top = `${this.y}px`;
      layer?.appendChild(r);
      later(() => r.remove(), 600);
    }
    async click(action) {
      const el = this.hoverTarget ? this.resolve(this.hoverTarget) : this.hoverEl;
      if (this.hoverTarget && !el) return false;
      this.el.classList.add("is-pressed");
      this.ripple();
      if (el) press(el);
      await sleep(120);
      this.el.classList.remove("is-pressed");
      if (action && alive) action(el);
      await sleep(160);
      return true;
    }
    idle(a, b = a) {
      return sleep(random(a, b));
    }
  }
  const scenario = async (c) => {
    await c.idle(900, 1300);
    c.show();
    while (alive) {
      if (await c.go('[data-id="search"]', { fx: 0.4 })) {
        await c.idle(260, 420);
        await c.click(() => searchFocus());
        await c.idle(320, 480);
        await typeSearch(QUERY);
        await c.idle(700, 1e3);
      }
      if (await c.go(`.pw-item[data-id="${FOUND_ENTRY}"]`)) {
        await c.idle(300, 460);
        await c.click(() => {
          searchBlur();
          selectEntry(FOUND_ENTRY);
        });
        await c.idle(900, 1300);
      }
      if (await c.go('[data-act="eye"]')) {
        await c.idle(320, 480);
        await c.click();
        await revealTyped();
        await c.idle(1100, 1500);
      }
      if (await c.go('[data-copy="pass"]')) {
        await c.idle(260, 400);
        await c.click((el) => copyFlash(el));
        await c.idle(1300, 1700);
      }
      if (await c.go('[data-act="eye"]')) {
        await c.idle(240, 380);
        await c.click(() => setReveal(false));
        await c.idle(500, 800);
      }
      if (await c.go('[data-tab="history"]')) {
        await c.idle(300, 450);
        await c.click(() => setTab("history", { stagger: true }));
        await c.idle(1300, 1700);
        for (let i = 0; i < 3; i++) {
          if (!await c.go(() => $$(".pw-hist")[i])) break;
          await c.idle(600, 900);
        }
        await c.idle(400, 700);
      }
      if (await c.go('[data-act="head-share"]')) {
        await c.idle(300, 450);
        await c.click(() => openAccess());
        await c.idle(700, 1e3);
        if (await c.go(() => $$(".pw-access")[1])) await c.idle(700, 1e3);
        if (await c.go(() => $$(".pw-access")[2])) await c.idle(600, 900);
        closeAccess();
        await c.idle(400, 700);
      }
      if (await c.go('.pw-tree-row[data-id="test"]')) {
        await c.idle(300, 450);
        await c.click((el) => toggleTree(el));
        await c.idle(900, 1300);
        if (await c.go(() => $$('.pw-tree-group[data-id="test"] .pw-tree-children .pw-tree-row')[1])) {
          await c.idle(700, 1e3);
        }
        if (await c.go('.pw-tree-row[data-id="test"]')) {
          await c.idle(240, 380);
          await c.click((el) => toggleTree(el));
          await c.idle(500, 800);
        }
      }
      if (await c.go('[data-act="search-clear"]')) {
        await c.idle(260, 400);
        await c.click(() => {
          setQuery("");
          searchBlur();
          selectEntry(HOME_ENTRY);
        });
        await c.idle(600, 900);
      }
      await c.moveTo({ x: random(820, 1180), y: random(600, 680) });
      await c.idle(5e3, 7e3);
    }
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cursor = new Cursor({ x: 980, y: 560 });
  if (reducedMotion && animate) {
    state.tab = "history";
    renderDetail();
  } else if (animate) {
    void scenario(cursor);
  }
  return () => {
    alive = false;
    window.clearInterval(totpTimer);
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
    resizeObserver?.disconnect();
    if (!resizeObserver) window.removeEventListener("resize", fit);
    intersection?.disconnect();
    document.removeEventListener("visibilitychange", wakePlayback);
    wakePlayback();
    closeAccess();
    cursor.unhover();
    cursor.hide();
    state.query = "";
    searchBlur();
    app.querySelectorAll(".pw-toast").forEach((el) => el.remove());
    if (layer) layer.innerHTML = "";
  };
}

// source/live-dashboard/live-dashboard-markup.ts
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

// source/live-dashboard/entry.ts
var toolbar = `<div class="pw-window-bar" aria-hidden="true">
  <div class="pw-window-dots"><i></i><i></i><i></i></div>
  <div class="pw-window-arrows" aria-hidden="true"><span class="pw-window-chevron pw-window-chevron--back"></span><span class="pw-window-chevron pw-window-chevron--forward"></span></div>
  <span class="pw-window-title">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438</span>
  <div class="pw-window-user"><span>\u0410\u043D\u0434\u0440\u0435\u0439 \u041F\u044C\u044F\u043D\u043A\u043E\u0432</span><span class="pw-window-avatar">\u0410</span></div>
</div>`;
var markup = LIVE_DASHBOARD_MARKUP.replace('<div class="pw-stage">', `<div class="pw-stage" aria-hidden="true">${toolbar}`);
function mountHeroDashboard(embed) {
  const phone = matchMedia("(max-width: 809.98px)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let stop;
  const initialize = () => {
    stop?.();
    embed.innerHTML = markup;
    stop = initLiveDashboard(embed, { animate: !phone.matches && !reduced.matches });
  };
  initialize();
  phone.addEventListener("change", initialize);
  reduced.addEventListener("change", initialize);
  return () => {
    stop?.();
    phone.removeEventListener("change", initialize);
    reduced.removeEventListener("change", initialize);
  };
}
export {
  mountHeroDashboard
};
