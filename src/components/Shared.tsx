import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export function MediaPlaceholder({
  portrait = false,
  src,
  alt = '',
  priority = false,
}: {
  portrait?: boolean;
  src?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`media-placeholder${portrait ? ' portrait' : ''}${src ? ' has-image' : ''}`}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      ) : (
        <div className="media-glyph">
          <span />
          <i />
        </div>
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}

export function ActionButton({
  children,
  dark = false,
  href = '#apply',
}: {
  children: ReactNode;
  dark?: boolean;
  href?: string;
}) {
  return (
    <a className={`button${dark ? ' dark' : ''}`} href={href}>
      <span>{children}</span>
    </a>
  );
}

export function AdmissionsBadge({
  href = '#apply',
  children = 'Admissions Open',
}: {
  href?: string;
  children?: ReactNode;
}) {
  return (
    <a href={href} className="hero-admissions-badge">
      {children}
    </a>
  );
}

export function FooterLinkGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`footer-group${isOpen ? ' open' : ''}`}>
      <b className="footer-group-heading">{title}</b>
      <button
        type="button"
        className="footer-group-toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <div id={panelId} className="footer-group-panel">
        <div className="footer-group-links">
          <div className="footer-group-links-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
