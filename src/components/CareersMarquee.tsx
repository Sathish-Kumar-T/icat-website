import React, { useEffect, useRef, useState } from 'react';
import './CareersMarquee.css';

interface IndustryItem {
  id: string;
  title: string;
  delay: string;
  renderIcon: (isFace: boolean) => React.ReactNode;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'animation-film',
    title: 'Animation and film studios',
    delay: '0s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="24" width="48" height="30" rx="6" fill={face ? '#1746A2' : '#102B5C'} />
        <path
          d="M8 22L54 12C55.6 11.6 57.2 12.7 57.5 14.3L58.8 20.5L10.5 31L8 22Z"
          fill={face ? '#3478F6' : '#102B5C'}
        />
        {face && (
          <>
            <path d="M18 19.8L25 18.3L22 28.4L15 29.9L18 19.8Z" fill="#EAF1FF" />
            <path d="M32 16.8L39 15.3L36 25.4L29 26.9L32 16.8Z" fill="#EAF1FF" />
            <path d="M46 13.8L53 12.3L50 22.4L43 23.9L46 13.8Z" fill="#EAF1FF" />
            <polygon points="27,33 27,47 40,40" fill="#FFFFFF" />
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'vfx-post',
    title: 'Visual effects and post-production',
    delay: '-1.2s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 42L54 31L32 20L10 31L32 42Z"
          transform="translate(0, 12)"
          fill={face ? '#102B5C' : '#0B1E42'}
        />
        <path
          d="M32 42L54 31L32 20L10 31L32 42Z"
          transform="translate(0, 3)"
          fill={face ? '#1746A2' : '#102B5C'}
        />
        <path d="M32 34L54 23L32 12L10 23L32 34Z" fill={face ? '#3478F6' : '#1746A2'} />
        {face && <circle cx="32" cy="23" r="4" fill="#EAF1FF" />}
      </svg>
    ),
  },
  {
    id: 'games-interactive',
    title: 'Games and interactive entertainment',
    delay: '-2.4s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 20H45C51.6 20 57 25.4 57 32C57 38.6 52.8 45 47 45C43.5 45 41 42.5 39 40H25C23 42.5 20.5 45 17 45C11.2 45 7 38.6 7 32C7 25.4 12.4 20 19 20Z"
          fill={face ? '#1746A2' : '#102B5C'}
        />
        {face && (
          <>
            <rect x="19" y="26" width="4" height="12" rx="2" fill="#EAF1FF" />
            <rect x="15" y="30" width="12" height="4" rx="2" fill="#EAF1FF" />
            <circle cx="43" cy="29" r="2.6" fill="#3478F6" />
            <circle cx="48" cy="34" r="2.6" fill="#EB2030" />
            <circle cx="38" cy="34" r="2.6" fill="#EAF1FF" />
            <circle cx="43" cy="39" r="2.6" fill="#3478F6" />
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'digital-social',
    title: 'Digital and social media',
    delay: '-3.6s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 16C12 12.7 14.7 10 18 10H46C49.3 10 52 12.7 52 16V38C52 41.3 49.3 44 46 44H26L15 53V44H18C14.7 44 12 41.3 12 38V16Z"
          fill={face ? '#3478F6' : '#102B5C'}
        />
        {face && (
          <>
            <polygon points="27,20 27,34 40,27" fill="#FFFFFF" />
            <circle cx="46" cy="16" r="4" fill="#EB2030" />
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'ecommerce-product',
    title: 'E-commerce and product companies',
    delay: '-4.8s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 22V18C22 12.5 26.5 8 32 8C37.5 8 42 12.5 42 18V22"
          stroke={face ? '#102B5C' : '#0B1E42'}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M13 22H51L54 52C54.3 54.8 52.1 57 49.3 57H14.7C11.9 57 9.7 54.8 10 52L13 22Z"
          fill={face ? '#1746A2' : '#102B5C'}
        />
        {face && (
          <>
            <circle cx="24" cy="30" r="2.8" fill="#EAF1FF" />
            <circle cx="40" cy="30" r="2.8" fill="#EAF1FF" />
            <path
              d="M24 30C24 35.5 27.6 39 32 39C36.4 39 40 35.5 40 30"
              stroke="#3478F6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'it-corporate',
    title: 'IT, consulting and corporate design',
    delay: '-6.0s',
    renderIcon: (face) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 20V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V20"
          stroke={face ? '#102B5C' : '#0B1E42'}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <rect x="8" y="20" width="48" height="34" rx="7" fill={face ? '#1746A2' : '#102B5C'} />
        {face && (
          <>
            <path
              d="M8 27C8 23.1 11.1 20 15 20H49C52.9 20 56 23.1 56 27V33H8V27Z"
              fill="#3478F6"
            />
            <rect x="27" y="29" width="10" height="7" rx="2.5" fill="#EAF1FF" />
          </>
        )}
      </svg>
    ),
  },
];

// Slimmer 3D extrusion depth (8 slices across 5.5px)
const SLICES = 8;
const DEPTH_PX = 5.5;
const SLICE_INDICES = Array.from({ length: SLICES }, (_, i) => i);

// 4 identical sets guarantee seamless infinite looping even on ultrawide monitors
const REPEAT_SETS = [0, 1, 2, 3];

export const CareersMarquee: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isDraggingUI, setIsDraggingUI] = useState<boolean>(false);

  const isPausedRef = useRef<boolean>(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let setWidth = 0;
    let offset = 0;
    let velocity = 0;
    let isHovered = false;
    let isDragging = false;
    let pointerId: number | null = null;
    let lastClientX = 0;
    let lastTime = 0;
    let rafId = 0;

    const AUTO_SPEED = 0.55; // px per frame (~33px/sec)
    const FRICTION = 0.94;

    const measure = () => {
      const children = track.children;
      if (children.length > INDUSTRIES.length) {
        const firstCard = children[0] as HTMLElement;
        const secondSetFirstCard = children[INDUSTRIES.length] as HTMLElement;
        setWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
      } else {
        setWidth = track.scrollWidth / REPEAT_SETS.length;
      }
      wrapOffset();
    };

    const wrapOffset = () => {
      if (setWidth <= 0) return;
      // Keep offset strictly in (-setWidth, 0] for gapless bi-directional infinite scroll
      while (offset <= -setWidth) offset += setWidth;
      while (offset > 0) offset -= setWidth;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging = true;
      pointerId = e.pointerId;
      lastClientX = e.clientX;
      lastTime = performance.now();
      velocity = 0;
      setIsDraggingUI(true);
      viewport.setPointerCapture(pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = e.clientX - lastClientX;
      const dt = Math.max(now - lastTime, 1);

      offset += dx;
      velocity = (dx / dt) * 16;
      lastClientX = e.clientX;
      lastTime = now;
      wrapOffset();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging || (pointerId !== null && e.pointerId !== pointerId)) return;
      isDragging = false;
      setIsDraggingUI(false);
      if (pointerId !== null && viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }
      pointerId = null;
    };

    const handleWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;

      if (delta !== 0) {
        e.preventDefault();
        offset -= delta * 0.85;
        velocity = 0;
        wrapOffset();
      }
    };

    const tick = () => {
      if (!isDragging) {
        if (Math.abs(velocity) > 0.08) {
          offset += velocity;
          velocity *= FRICTION;
        } else {
          velocity = 0;
          if (!isPausedRef.current && !isHovered) {
            offset -= AUTO_SPEED;
          }
        }
        wrapOffset();
      }
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    viewport.addEventListener('mouseenter', handleMouseEnter);
    viewport.addEventListener('mouseleave', handleMouseLeave);
    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);
    viewport.addEventListener('wheel', handleWheel, { passive: false });

    measure();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      viewport.removeEventListener('mouseenter', handleMouseEnter);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', handlePointerUp);
      viewport.removeEventListener('pointercancel', handlePointerUp);
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section
      className={`icat-careers-section${isPaused ? ' is-paused' : ''}`}
      aria-labelledby="icat-careers-heading"
    >
      <div className="icat-careers-container">
        <p className="icat-careers-eyebrow">Careers</p>
        <h2 id="icat-careers-heading" className="icat-careers-heading">
          The industries ICAT graduates move into
        </h2>
        <p className="icat-careers-subtext">
          Media and design skills carry into nearly every sector. These are the ones ICAT&apos;s
          placement division recruits into year after year.
        </p>
      </div>

      <div className="icat-careers-controls">
        <span className="icat-careers-hint" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" />
          </svg>
          Drag to scroll
        </span>

        <button
          type="button"
          className="icat-careers-toggle"
          aria-pressed={isPaused}
          aria-label={isPaused ? 'Play industry marquee' : 'Pause industry marquee'}
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="7,4 20,12 7,20" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
          <span>{isPaused ? 'Play' : 'Pause'}</span>
        </button>
      </div>

      <div
        ref={viewportRef}
        className={`icat-marquee-viewport${isDraggingUI ? ' is-dragging' : ''}`}
        role="region"
        aria-label="Industries ICAT graduates move into"
      >
        <div ref={trackRef} className="icat-marquee-track">
          {REPEAT_SETS.map((setIdx) =>
            INDUSTRIES.map((item) => (
              <article
                key={`${setIdx}-${item.id}`}
                className="icat-industry-card"
                aria-hidden={setIdx !== 0 ? true : undefined}
              >
                <div className="icat-icon-stage" aria-hidden="true">
                  <div className="icat-icon-3d" style={{ animationDelay: item.delay }}>
                    {SLICE_INDICES.map((sliceIdx) => {
                      const z = (sliceIdx / (SLICES - 1) - 0.5) * DEPTH_PX;
                      const isFace = sliceIdx === 0 || sliceIdx === SLICES - 1;
                      return (
                        <div
                          key={sliceIdx}
                          className="icat-icon-slice"
                          style={{ transform: `translateZ(${z.toFixed(2)}px)` }}
                        >
                          {item.renderIcon(isFace)}
                        </div>
                      );
                    })}
                  </div>
                  <div className="icat-icon-shadow" style={{ animationDelay: item.delay }} />
                </div>

                <h3 className="icat-industry-title">{item.title}</h3>
              </article>
            ))
          )}
        </div>
      </div>

      //<div className="icat-careers-divider" aria-hidden="true" />
    </section>
  );
};

export default CareersMarquee;
