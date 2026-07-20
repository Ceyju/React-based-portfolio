import PageShell from '../components/PageShell';
import { profile, skills } from '../data/portfolio';

export default function ProfilePage() {
  return (
    <PageShell eyebrow="SYS.02 // PROFILE" title="ENGINEER THE SIGNAL" description="A systems-minded developer focused on dependable infrastructure and useful human outcomes." className="profile-page">
      <div className="profile-grid">
        <article className="hud-panel profile-statement">
          <span className="panel-label">OPERATOR PROFILE</span>
          <h2>{profile.role}</h2>
          <p>{profile.summary}</p>
          <div className="specialty-row">{profile.specialties.map((item) => <span key={item}>{item}</span>)}</div>
        </article>
        <article className="hud-panel education-panel">
          <span className="panel-label">EDUCATION LOG</span>
          <h2>{profile.education.school}</h2>
          <p>{profile.education.degree}</p><small>{profile.education.period}</small>
          <div className="cert-list">{profile.certifications.map((item, index) => <p key={item}><b>0{index + 1}</b>{item}</p>)}</div>
        </article>
        <article className="hud-panel skills-panel">
          <span className="panel-label">CAPABILITY MATRIX</span>
          {Object.entries(skills).map(([group, items]) => (
            <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>
          ))}
        </article>
      </div>
    </PageShell>
  );
}
