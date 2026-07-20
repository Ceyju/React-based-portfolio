export default function PageShell({ eyebrow, title, description, children, className = '' }) {
  return (
    <section className={`page-shell ${className}`}>
      <div className="page-heading">
        <span className="section-code">{eyebrow}</span>
        <h1 data-text={title}>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="page-body">{children}</div>
    </section>
  );
}
