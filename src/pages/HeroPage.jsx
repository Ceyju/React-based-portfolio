import { Link } from 'react-router-dom';
import { profile } from '../data/portfolio';

export default function HeroPage() {
  return (
    <section className="hero-page">
      <div className="hero-copy">
        <span className="section-code">SYS.01 // IDENTITY</span>
        <p className="availability"><i /> AVAILABLE FOR HIGH-IMPACT SYSTEMS</p>
        <h1 data-text="KURT MEJORADA">KURT ANGELO<br /><span>MEJORADA</span></h1>
        <p className="hero-role">{profile.role} <em>//</em> BACKEND ARCHITECTURE <em>//</em> HEALTHCARE TECH</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <Link className="cyber-action" to="/projects"><span>EXPLORE SYSTEMS</span><i>→</i></Link>
          <Link className="cyber-action secondary" to="/resume"><span>OPEN RESUME</span><i>↗</i></Link>
        </div>
      </div>
      <div className="monogram-zone" aria-hidden="true">
        <div className="target-ring ring-one" />
        <div className="target-ring ring-two" />
        <div className="km-monogram"><span>K</span><span>M</span></div>
        <div className="telemetry telemetry-a">CORE_ID // 0x4B4D</div>
        <div className="telemetry telemetry-b">STATUS // VERIFIED</div>
      </div>
    </section>
  );
}
