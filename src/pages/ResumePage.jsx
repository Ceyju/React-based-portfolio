import ActionLink from '../components/ActionLink';
import PageShell from '../components/PageShell';

const resumeUrl = `${import.meta.env.BASE_URL}docs/Kurt-Angelo-Mejorada-Resume.pdf`;
const portraitUrl = encodeURI(`${import.meta.env.BASE_URL}Mejorada, Kurt Angelo B..jpg`);

export default function ResumePage() {
  return (
    <PageShell eyebrow="SYS.06 // RESUME" title="PERSONNEL RECORD" description="A complete, printable record of experience, projects, skills, and education." className="resume-page">
      <div className="resume-layout">
        <div className="resume-viewer hud-panel">
          <object data={resumeUrl} type="application/pdf" aria-label="Kurt Angelo Mejorada résumé">
            <p>Your browser cannot display the PDF inline. <a href={resumeUrl}>Open the résumé</a>.</p>
          </object>
        </div>
        <aside className="resume-aside">
          <div className="resume-portrait">
            <img src={portraitUrl} alt="Kurt Angelo B. Mejorada" />
          </div>
          <span className="panel-label">DOCUMENT // VERIFIED</span>
          <h2>KURT ANGELO<br />B. MEJORADA</h2>
          <p>Full-stack developer specializing in backend architecture, SQL optimization, and healthcare information systems.</p>
          <dl><div><dt>FORMAT</dt><dd>PDF / 1 PAGE</dd></div><div><dt>ACCESS</dt><dd>PUBLIC</dd></div><div><dt>REVISION</dt><dd>2026</dd></div></dl>
          <ActionLink href={resumeUrl} download>DOWNLOAD PDF</ActionLink>
          <ActionLink href={resumeUrl} secondary newTab>OPEN IN NEW TAB</ActionLink>
        </aside>
      </div>
    </PageShell>
  );
}
