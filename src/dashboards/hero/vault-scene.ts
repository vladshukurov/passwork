/*
 * Живое окно в hero по макетам Figma. Один курсор проходит сценарий
 * (~16 с на круг) и возвращается в покой:
 *   стартовый экран → поиск → цветовой тег → карточка Мегаплана → показать пароль → скопировать.
 * Принципы движения прежние: курсор летит по мягкой дуге с easeInOutQuart и лёгкой
 * случайностью, состояния проявляются поверх старых, всё замирает вне экрана.
 */

import { DASHBOARD_CURSOR_MARKUP } from './dashboard-shared';
import { PASSWORD, PASSWORD_MASK, VAULT_MARKUP } from './vault-markup';

export { VAULT_MARKUP };

const WIDTH = 1400;

type Point = { x: number; y: number };
type Target = string | Element | (() => Element | null | undefined);
type GoOptions = { fx?: number; fy?: number; dur?: number };

const random = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
/* Плавный ход курсора: медленный старт, мягкое торможение без рывка на финише. */
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

/* Что проявляется каскадом, когда панель приходит на экран. */
const RISE = '.pwv-group--filters, .pwv-head > *, .pwv-folder, .pwv-entry, .pwv-label, .pwv-tr, .pwv-card__head, .pwv-card__meta, .pwv-tabs, .pwv-row';

export function initVaultScene(embed: HTMLElement, { animate = true }: { animate?: boolean } = {}): () => void {
  const stage = embed.querySelector<HTMLElement>('.pwv-stage');
  if (!stage) return () => undefined;

  const $ = <T extends Element = HTMLElement>(selector: string) => stage.querySelector<T>(selector);

  let alive = true;
  let offscreen = false;
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (alive) fn();
    }, ms);
    timers.add(id);
    return id;
  };

  /* ---------- масштаб под контейнер ---------- */
  const fit = () => embed.style.setProperty('--pw-s', String(embed.clientWidth / WIDTH || 1));
  fit();
  const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
  if (resizeObserver) resizeObserver.observe(embed);
  else window.addEventListener('resize', fit);

  /* ---------- переключение состояний ---------- */
  /* Новая панель ложится поверх и проявляется, её строки поднимаются каскадом;
     старая остаётся под ней, пока проявление не закончится. */
  const show = (pane: HTMLElement | null) => {
    if (!pane || pane.classList.contains('is-active')) return;
    const group = pane.parentElement;
    group?.querySelectorAll<HTMLElement>(':scope > .is-active').forEach((old) => {
      old.classList.remove('is-active', 'is-entering');
      old.classList.add('is-leaving');
      later(() => old.classList.remove('is-leaving'), 420);
    });
    pane.querySelectorAll<HTMLElement>(RISE).forEach((el, i) => {
      el.classList.add('pwv-rise');
      el.style.setProperty('--i', String(Math.min(i, 14)));
    });
    pane.classList.remove('is-entering');
    pane.getBoundingClientRect(); // перезапуск анимации проявления
    pane.classList.add('is-active', 'is-entering');
    later(() => pane.classList.remove('is-entering'), 1000);
  };
  const side = $('.pwv-side');
  const setSidebar = (mode: 'nav' | 'search') => {
    side?.classList.toggle('is-searching', mode === 'search');
    show($(`.pwv-side__${mode}`));
  };
  const setView = (view: 'folder' | 'results' | 'found') => {
    show($(view === 'folder' ? '.pwv-head--folder' : '.pwv-head--results'));
    show($(`.pwv-body--${view}`));
  };
  const setColor = (color: string | null) =>
    stage.querySelectorAll<HTMLElement>('.pwv-color').forEach((el) => el.classList.toggle('is-selected', el.dataset.color === color));

  /* ---------- пароль в открытой карточке ---------- */
  const secretCell = () => $('.pwv-body--found [data-role="secret"]');
  const eyeButton = () => $('.pwv-body--found [data-act="eye"]');
  const hidePassword = () => {
    const cell = secretCell();
    if (cell) cell.innerHTML = `<span class="pwv-dots">${PASSWORD_MASK}</span>`;
    eyeButton()?.classList.remove('is-on');
  };

  /* ---------- пауза вне экрана / в фоновой вкладке ---------- */
  const isPaused = () => offscreen || document.hidden;
  const playbackWaiters = new Set<() => void>();
  const wakePlayback = () => {
    if (alive && isPaused()) return;
    const waiters = [...playbackWaiters];
    playbackWaiters.clear();
    waiters.forEach((resolve) => resolve());
  };
  const waitForPlayback = () =>
    new Promise<void>((resolve) => {
      if (!alive || !isPaused()) resolve();
      else playbackWaiters.add(resolve);
    });
  const intersection =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            offscreen = !entries[0].isIntersecting;
            wakePlayback();
          },
          { threshold: 0.02 },
        )
      : null;
  if (intersection) intersection.observe(embed);
  document.addEventListener('visibilitychange', wakePlayback);

  const sleep = async (ms: number) => {
    let left = ms;
    while (alive && left > 0) {
      await waitForPlayback();
      if (!alive) return;
      const slice = Math.min(left, 90);
      const started = performance.now();
      await new Promise<void>((resolve) => {
        later(resolve, slice);
      });
      if (!isPaused()) left -= performance.now() - started;
    }
  };

  const tween = (duration: number, frame: (p: number) => void) =>
    new Promise<void>((resolve) => {
      let elapsed = 0;
      let last: number | null = null;
      const step = async (ts: number) => {
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

  /* Пароль проявляется посимвольно слева направо, как расшифровка. */
  const revealTyped = async () => {
    const cell = secretCell();
    if (!cell) return;
    eyeButton()?.classList.add('is-on');
    cell.innerHTML = '<span class="pwv-secret"></span>';
    const text = cell.firstElementChild as HTMLElement;
    for (let i = 1; i <= PASSWORD.length; i++) {
      if (!alive) return;
      text.textContent = `${PASSWORD.slice(0, i)}${'•'.repeat(PASSWORD.length - i)}`;
      await sleep(26);
    }
  };
  const showCopied = () => {
    const cell = secretCell();
    if (cell) cell.innerHTML = '<span class="pwv-copied">Скопировано</span>';
    eyeButton()?.classList.remove('is-on');
  };

  /* ---------- курсор ---------- */
  const layer = $('.pwv-cursors');
  // Координаты курсора — в пикселях канваса, с учётом внешнего scale окна hero.
  const stageRect = (el: Element) => {
    const r = el.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const visualScale = s.width / stage.offsetWidth || 1;
    return { left: (r.left - s.left) / visualScale, top: (r.top - s.top) / visualScale, width: r.width / visualScale, height: r.height / visualScale };
  };
  const press = (el: Element | null) => {
    if (!el) return;
    el.classList.add('pwv-pressed');
    later(() => el.classList.remove('pwv-pressed'), 150);
  };

  class Cursor {
    x: number;
    y: number;
    el: HTMLElement;
    hoverEl: Element | null = null;
    hoverTarget: Target | null = null;

    constructor(start: Point) {
      this.x = start.x;
      this.y = start.y;
      this.el = document.createElement('div');
      this.el.className = 'pw-cursor';
      this.el.innerHTML = DASHBOARD_CURSOR_MARKUP;
      layer?.appendChild(this.el);
      this.render();
    }
    render() {
      this.el.style.transform = `translate(${this.x - 1}px, ${this.y - 1}px)`;
    }
    set(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.render();
    }
    show() {
      this.el.classList.add('is-visible');
    }
    hide() {
      this.el.classList.remove('is-visible');
    }
    resolve(target: Target | null): Element | null {
      if (!target || !alive) return null;
      if (typeof target === 'string') return $(target);
      if (typeof target === 'function') return target() ?? null;
      return target.isConnected ? target : null;
    }
    pointIn(el: Element, o: GoOptions): Point {
      const r = stageRect(el);
      const fx = o.fx ?? (r.width < 60 ? 0.5 + random(-0.06, 0.06) : random(0.14, 0.5));
      const fy = o.fy ?? (r.height < 40 ? 0.5 + random(-0.08, 0.08) : random(0.35, 0.65));
      return { x: r.left + r.width * fx, y: r.top + r.height * fy };
    }
    /* Ход по слегка изогнутой дуге: старт и финиш мягкие, без прямых «телепортов».
       Темп чуть быстрее прежнего, чтобы весь круг уложился в 15–20 секунд. */
    async moveTo(p: Point, o: GoOptions = {}) {
      this.unhover();
      const from = { x: this.x, y: this.y };
      const dx = p.x - from.x;
      const dy = p.y - from.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;
      const duration = o.dur ?? clamp(380 + dist * 0.95, 480, 1150) * random(0.95, 1.08);
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
    async go(target: Target, o: GoOptions = {}): Promise<Element | null> {
      let el = this.resolve(target);
      if (!el) return null;
      await this.moveTo(this.pointIn(el, o), o);
      el = this.resolve(target);
      if (!el) return null;
      this.setHover(el, target);
      return el;
    }
    setHover(el: Element, target: Target) {
      if (this.hoverEl && this.hoverEl !== el) this.unhover();
      el.classList.add('pwv-hover');
      this.hoverEl = el;
      this.hoverTarget = target;
    }
    unhover() {
      const el = this.hoverEl;
      if (!el) return;
      this.hoverEl = null;
      this.hoverTarget = null;
      el.classList.remove('pwv-hover');
    }
    ripple() {
      const r = document.createElement('div');
      r.className = 'pw-ripple';
      r.style.left = `${this.x}px`;
      r.style.top = `${this.y}px`;
      layer?.appendChild(r);
      later(() => r.remove(), 600);
    }
    async click(action?: (el: Element | null) => void) {
      const el = this.hoverTarget ? this.resolve(this.hoverTarget) : this.hoverEl;
      if (this.hoverTarget && !el) return false;
      this.el.classList.add('is-pressed');
      this.ripple();
      if (el) press(el);
      await sleep(130);
      this.el.classList.remove('is-pressed');
      if (action && alive) action(el);
      await sleep(160);
      return true;
    }
    idle(a: number, b = a) {
      return sleep(random(a, b));
    }
  }

  /* ---------- сценарий ---------- */
  const reset = () => {
    hidePassword();
    setColor(null);
    setSidebar('nav');
    setView('folder');
  };

  const scenario = async (c: Cursor) => {
    await c.idle(700, 900);
    c.show();
    while (alive) {
      // со стартового экрана — в поиск
      if (await c.go('[data-id="search"]', { fx: 0.3 })) {
        await c.idle(220, 320);
        await c.click(() => setSidebar('search'));
        await c.idle(500, 650);
      }
      // цветовой тег
      if (await c.go('.pwv-color[data-color="blue"]', { fx: 0.5, fy: 0.5 })) {
        await c.idle(300, 400);
        await c.click(() => {
          setColor('blue');
          setView('results');
        });
        await c.idle(900, 1100);
      }
      // карточка Мегаплана
      if (await c.go('.pwv-body--results .pwv-tr[data-id="megaplan"]', { fx: 0.12 })) {
        await c.idle(380, 480);
        await c.click(() => setView('found'));
        await c.idle(850, 1000);
      }
      // смотрим пароль
      if (await c.go('.pwv-body--found [data-act="eye"]')) {
        await c.idle(260, 340);
        await c.click();
        await revealTyped();
        await c.idle(1000, 1200);
      }
      // копируем пароль
      if (await c.go('.pwv-body--found [data-copy="pass"]')) {
        await c.idle(240, 320);
        await c.click(() => showCopied());
        await c.idle(1300, 1500);
        hidePassword();
      }
      // «Отмена» закрывает поиск и возвращает к папке, курсор отходит в сторону
      if (await c.go('[data-act="cancel"]')) {
        await c.idle(260, 340);
        await c.click(() => reset());
        await c.idle(500, 650);
      } else {
        reset();
      }
      await c.moveTo({ x: random(980, 1180), y: random(600, 700) });
      await c.idle(1000, 1200);
    }
  };

  const cursor = new Cursor({ x: 1040, y: 640 });
  if (animate) void scenario(cursor);

  return () => {
    alive = false;
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
    resizeObserver?.disconnect();
    if (!resizeObserver) window.removeEventListener('resize', fit);
    intersection?.disconnect();
    document.removeEventListener('visibilitychange', wakePlayback);
    wakePlayback();
    cursor.unhover();
    cursor.hide();
    if (layer) layer.innerHTML = '';
  };
}
