import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './ProgrammeCards.css';

export interface ProgrammeItem {
  slug: string;
  title: string;
  description?: string;
}

interface ProgrammeCardsProps {
  programmes: ProgrammeItem[];
  level: string;
  mediaMap: Record<string, string>;
}

export const ProgrammeCards: React.FC<ProgrammeCardsProps> = ({
  programmes,
  level,
  mediaMap,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleSlugs, setVisibleSlugs] = useState<Set<string>>(() => new Set());
  const [settledSlugs, setSettledSlugs] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const allSlugs = programmes.map((p) => p.slug);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisibleSlugs(new Set(allSlugs));
      setSettledSlugs(new Set(allSlugs));
      return;
    }

    setVisibleSlugs(new Set());
    setSettledSlugs(new Set());

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-programme-slug]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const revealed: string[] = [];
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).dataset.programmeSlug;
            if (slug) revealed.push(slug);
            observer.unobserve(entry.target);
          }
        }
        if (revealed.length > 0) {
          setVisibleSlugs((prev) => {
            const next = new Set(prev);
            for (const slug of revealed) next.add(slug);
            return next;
          });
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    for (const card of cards) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, [level, programmes]);

  return (
    <div ref={gridRef} className="icat-prog-grid">
      {programmes.map((prog, index) => {
        const isVisible = visibleSlugs.has(prog.slug);
        const isSettled = settledSlugs.has(prog.slug);
        const cardStyle = !isSettled
          ? ({ '--card-delay': `${(index % 4) * 75}ms` } as React.CSSProperties)
          : undefined;

        return (
          <Link
            key={`${level}-${prog.slug}`}
            to={`/programs/${prog.slug}?level=${level}`}
            data-programme-slug={prog.slug}
            style={cardStyle}
            className={`icat-prog-card${isVisible ? ' is-visible' : ''}${isSettled ? ' is-settled' : ''}`}
            onTransitionEnd={(e) => {
              if (e.target === e.currentTarget && e.propertyName === 'opacity' && isVisible) {
                setSettledSlugs((prev) => {
                  if (prev.has(prog.slug)) return prev;
                  const next = new Set(prev);
                  next.add(prog.slug);
                  return next;
                });
              }
            }}
          >
            <div className="icat-prog-card-media">
              <img
                src={mediaMap[prog.slug]}
                alt={`${prog.title} creative portfolio artwork`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="icat-prog-card-footer">
              <span className="icat-prog-card-title">{prog.title}</span>
              <svg
                className="icat-prog-card-arrow"
                viewBox="0 0 28 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 8H26M26 8L19.5 1.5M26 8L19.5 14.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProgrammeCards;
