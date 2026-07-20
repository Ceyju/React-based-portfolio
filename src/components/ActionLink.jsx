export default function ActionLink({ href, children, secondary = false, download = false, newTab = false }) {
  const external = href?.startsWith('http');
  return (
    <a
      className={`cyber-action ${secondary ? 'secondary' : ''}`}
      href={href}
      download={download || undefined}
      target={external || newTab ? '_blank' : undefined}
      rel={external || newTab ? 'noreferrer' : undefined}
    >
      <span>{children}</span><i aria-hidden="true">↗</i>
    </a>
  );
}
