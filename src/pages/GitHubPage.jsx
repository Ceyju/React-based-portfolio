import PageShell from '../components/PageShell';
import { skills } from '../data/portfolio';
import { useGitHubData } from '../hooks/useGitHubData';

const colors = ['#f75049', '#00e8aa', '#52d7ff', '#f4d35e', '#a78bfa', '#ff8c42'];

export default function GitHubPage() {
  const { data, loading } = useGitHubData();
  const total = data.languages.reduce((sum, language) => sum + language.bytes, 0) || 1;
  const sourceLabel = loading ? 'SYNCING' : data.source === 'live' ? 'LIVE' : data.source === 'cache' ? 'CACHED' : 'FALLBACK';

  return (
    <PageShell eyebrow="SYS.05 // GITHUB" title="PUBLIC TELEMETRY" description="Language evidence and recent activity from the featured public repositories." className="github-page">
      <div className="github-grid">
        <article className="hud-panel language-panel">
          <div className="panel-heading"><span className="panel-label">VERIFIED LANGUAGE SIGNAL</span><span className={`sync-state ${sourceLabel.toLowerCase()}`}>{sourceLabel}</span></div>
          <div className="language-bar" aria-label="GitHub language distribution">
            {data.languages.map((language, index) => <span key={language.name} style={{ width: `${(language.bytes / total) * 100}%`, background: colors[index % colors.length] }} />)}
          </div>
          <div className="language-list">
            {data.languages.slice(0, 6).map((language, index) => (
              <div key={language.name}><i style={{ background: colors[index % colors.length] }} /><strong>{language.name}</strong><span>{Math.round((language.bytes / total) * 100)}%</span></div>
            ))}
          </div>
          <div className="resume-skills"><span>ADDITIONAL RESUME LANGUAGES</span><p>{skills.languages.filter((item) => !data.languages.some((language) => language.name === item)).join(' / ')}</p></div>
        </article>

        <article className="hud-panel commit-panel">
          <span className="panel-label">RECENT COMMIT LOG</span>
          {loading ? <p className="loading-line">Querying public nodes…</p> : data.commits.length ? (
            <div className="commit-list">{data.commits.slice(0, 5).map((commit) => (
              <a key={`${commit.repository}-${commit.sha}`} href={commit.url} target="_blank" rel="noreferrer">
                <span>{commit.repository}</span><strong>{commit.message}</strong><small>{commit.sha} // {new Date(commit.date).toLocaleDateString()}</small>
              </a>
            ))}</div>
          ) : <p className="empty-state">Live commit data is temporarily unavailable. Project links remain operational.</p>}
        </article>

        <article className="hud-panel push-panel">
          <span className="panel-label">PUSH EVENTS</span>
          {data.pushes.length ? data.pushes.slice(0, 4).map((push) => (
            <div className="push-row" key={push.id}><i /><span><strong>{push.repository}</strong><small>{push.ref} // {push.count} commit{push.count === 1 ? '' : 's'}</small></span><time>{new Date(push.date).toLocaleDateString()}</time></div>
          )) : <p className="empty-state">No recent featured-repository push events returned.</p>}
          <a className="text-link" href="https://github.com/Ceyju" target="_blank" rel="noreferrer">OPEN FULL GITHUB PROFILE ↗</a>
        </article>
      </div>
    </PageShell>
  );
}
