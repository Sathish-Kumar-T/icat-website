import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export function MediaPlaceholder({
  portrait = false,
  src,
  videoSrc,
  videoControls = false,
  alt = '',
  priority = false,
}: {
  portrait?: boolean;
  src?: string;
  videoSrc?: string;
  videoControls?: boolean;
  alt?: string;
  priority?: boolean;
}) {
  const hasMedia = Boolean(src || videoSrc);
  const videoRef = useRef<HTMLVideoElement>(null);
  const didAttemptAutoplay = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    didAttemptAutoplay.current = false;
    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {});
  }, [videoSrc]);

  return (
    <div
      className={`media-placeholder${portrait ? ' portrait' : ''}${hasMedia ? ' has-image' : ''}`}
      aria-hidden={hasMedia ? undefined : true}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={videoControls}
          preload="metadata"
          aria-label={alt || 'ICAT showcase video'}
          onCanPlay={(e) => {
            if (didAttemptAutoplay.current) return;
            didAttemptAutoplay.current = true;
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
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
