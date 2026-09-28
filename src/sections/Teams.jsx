import React, { useLayoutEffect, useRef, useState } from 'react';
import { mountTeamDashboard, teamScenarios } from '../dashboards/teams/entry.ts';
import { fadeThroughScreen, snapshotScreen } from '../motion/screen-transitions.js';
import { siteMotion } from '../motion/site-motion-tokens.js';
import { revealTab, tabKeyHandler } from '../hooks/useTabList.js';
import { tidyCopy } from '../lib/typography.js';

const teamLabels = ['IT-команды', 'DevOps', 'Безопасность', 'Госорганизации', 'Производство'];

export function TeamsHeading() {
  return <section className="teams-heading" id="teams"><h2>Пассворк решает<br />{' '}задачи разных команд</h2></section>;
}

// Tabs, scenario dashboard and caption switch together with one crossfade.
export default function Teams() {
  const [selected, setSelected] = useState(0);
  const dashboard = useRef(null);
  const caption = useRef(null);
  const outgoing = useRef(null);
  const transition = useRef(null);

  useLayoutEffect(() => {
    const stop = mountTeamDashboard(dashboard.current, selected);
    const previous = outgoing.current;
    outgoing.current = null;
    if (previous) transition.current = fadeThroughScreen(previous.screen, dashboard.current,
      previous.caption, caption.current, null, siteMotion.ui);
    return () => { transition.current?.progress(1); stop(); };
  }, [selected]);

  const select = index => {
    if (index === selected) return;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const oldCaption = caption.current.cloneNode(true);
      oldCaption.classList.add('team-caption-outgoing');
      oldCaption.removeAttribute('aria-live');
      oldCaption.setAttribute('aria-hidden', 'true');
      caption.current.parentElement.append(oldCaption);
      outgoing.current = { screen: snapshotScreen(dashboard.current), caption: oldCaption };
    }
    setSelected(index);
    revealTab(document.getElementById(`team-tab-${index}`));
  };
  const onKeyDown = tabKeyHandler(teamLabels.length, select);

  return <>
    <div className="team-tabs" role="tablist" aria-label="Пассворк для вашей команды">
      {teamLabels.map((label, index) => <button key={label} id={`team-tab-${index}`} role="tab" type="button"
        aria-selected={index === selected} aria-controls="team-panel" tabIndex={index === selected ? 0 : -1}
        onClick={() => select(index)} onKeyDown={event => onKeyDown(event, index)}>{label}</button>)}
    </div>
    <section className="team-scene" id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${selected}`} tabIndex="0">
      <img src="/passwork-assets/img1PxDots8PxPitch800600Source.svg" alt="" className="scene-dots" />
      <img src="/passwork-assets/img1PxDots8PxPitch800600Source.svg" alt="" className="scene-dots dot-glint" aria-hidden="true" />
      <div className="team-dashboard-window team-screenshot"><div className="pw-team-dashboard pw-embed" ref={dashboard} role="img" /></div>
      <p className="team-caption" ref={caption} aria-live="polite">{tidyCopy(teamScenarios[selected].caption)}</p>
    </section>
  </>;
}
