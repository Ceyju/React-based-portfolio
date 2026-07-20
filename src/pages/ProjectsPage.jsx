import { useState } from 'react';
import ActionLink from '../components/ActionLink';
import PageShell from '../components/PageShell';
import { projects } from '../data/portfolio';

export default function ProjectsPage() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const move = (direction) => setActive((active + direction + projects.length) % projects.length);

  return (
    <PageShell eyebrow="SYS.04 // PROJECTS" title="DEPLOYED SYSTEMS" description="Selected builds spanning health, operations, media, and machine intelligence." className="projects-page">
      <div className="project-deck captures-arrows" tabIndex="0" onKeyDown={(event) => {
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
      }}>
        <article className="project-visual" aria-label={`${project.title} project visual`}>
          <div className="project-index">{String(active + 1).padStart(2, '0')}</div>
          <div className="project-glyph"><span>{project.title.slice(0, 2).toUpperCase()}</span></div>
          <p>{project.eyebrow}</p>
          <div className="project-status">STATUS // {project.status.toUpperCase()}</div>
        </article>
        <article className="project-info">
          <span className="panel-label">CASE FILE {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <h2>{project.title}</h2><h3>{project.eyebrow}</h3><p>{project.summary}</p>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <div className="project-actions">
            {project.repoUrl && <ActionLink href={project.repoUrl}>SOURCE</ActionLink>}
            {project.demoUrl && <ActionLink href={project.demoUrl} secondary>LIVE SYSTEM</ActionLink>}
            {!project.repoUrl && <span className="private-badge">PRIVATE</span>}
          </div>
        </article>
        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button>
          <div>{projects.map((item, index) => <button key={item.id} className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-label={`View ${item.title}`} />)}</div>
          <button type="button" onClick={() => move(1)} aria-label="Next project">→</button>
        </div>
      </div>
    </PageShell>
  );
}
