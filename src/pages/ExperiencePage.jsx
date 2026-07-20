import { useState } from 'react';
import PageShell from '../components/PageShell';
import { experience } from '../data/portfolio';

export default function ExperiencePage() {
  const [active, setActive] = useState(0);
  const item = experience[active];
  return (
    <PageShell eyebrow="SYS.03 // EXPERIENCE" title="MISSION HISTORY" description="Production systems delivered across national health, hospital operations, and education." className="experience-page">
      <div className="experience-layout">
        <div className="timeline-tabs" role="tablist" aria-label="Career history">
          {experience.map((entry, index) => (
            <button key={entry.code} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <span>{entry.code}</span><strong>{entry.role}</strong><small>{entry.period}</small>
            </button>
          ))}
        </div>
        <article className="hud-panel mission-card" role="tabpanel">
          <div className="mission-header"><div><span className="panel-label">ACTIVE RECORD // {item.code}</span><h2>{item.role}</h2></div><strong>{item.period}</strong></div>
          <p className="organization">{item.team}<br /><b>{item.organization}</b></p>
          <ol>{item.highlights.map((highlight, index) => <li key={highlight}><span>0{index + 1}</span><p>{highlight}</p></li>)}</ol>
        </article>
      </div>
    </PageShell>
  );
}
