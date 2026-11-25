import React, { useEffect, useRef, useState } from 'react';
import './CareersMarquee.css';

interface IndustryTheme {
  glow: string;
  shadow: string;
  borderHover: string;
  hoverShadow: string;
}

interface IndustryItem {
  id: string;
  title: string;
  delay: string;
  theme: IndustryTheme;
  renderFace: () => React.ReactNode;
  renderExtrusion: (rimColor: string) => React.ReactNode;
  rimColors: [string, string]; // [outer bevel shade, core solid shade]
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'animation-film',
    title: 'Animation and film studios',
    delay: '0s',
    theme: {
      glow: 'rgba(37, 99, 235, 0.16)',
      shadow: 'rgba(23, 70, 162, 0.34)',
      borderHover: 'rgba(37, 99, 235, 0.32)',
      hoverShadow: 'rgba(23, 70, 162, 0.14)',
    },
    rimColors: ['#163B8C', '#0E2861'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="24" width="48" height="30" rx="6" fill="url(#icat-grad-film)" />
        <path
          d="M8 22L54 12C55.6 11.6 57.2 12.7 57.5 14.3L58.8 20.5L10.5 31L8 22Z"
          fill="url(#icat-grad-film-top)"
        />
        <path d="M18 19.8L25 18.3L22 28.4L15 29.9L18 19.8Z" fill="#EFF6FF" />
        <path d="M32 16.8L39 15.3L36 25.4L29 26.9L32 16.8Z" fill="#EFF6FF" />
        <path d="M46 13.8L53 12.3L50 22.4L43 23.9L46 13.8Z" fill="#EFF6FF" />
        <polygon points="27,33 27,47 40,40" fill="#FFFFFF" />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="24" width="48" height="30" rx="6" fill={rim} stroke={rim} strokeWidth="1.5" />
        <path
          d="M8 22L54 12C55.6 11.6 57.2 12.7 57.5 14.3L58.8 20.5L10.5 31L8 22Z"
          fill={rim}
          stroke={rim}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'vfx-post',
    title: 'Visual effects and post-production',
    delay: '-1.2s',
    theme: {
      glow: 'rgba(124, 58, 237, 0.16)',
      shadow: 'rgba(91, 33, 182, 0.34)',
      borderHover: 'rgba(124, 58, 237, 0.32)',
      hoverShadow: 'rgba(109, 40, 217, 0.14)',
    },
    rimColors: ['#4C1D95', '#3B0764'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 54L54 43L32 32L10 43L32 54Z" fill="#5B21B6" />
        <path d="M32 45L54 34L32 23L10 34L32 45Z" fill="url(#icat-grad-vfx-mid)" />
        <path d="M32 34L54 23L32 12L10 23L32 34Z" fill="url(#icat-grad-vfx)" />
        <circle cx="32" cy="23" r="4.2" fill="#FFFFFF" />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 54L54 43L32 32L10 43L32 54Z" fill={rim} stroke={rim} strokeWidth="1.5" />
        <path d="M32 45L54 34L32 23L10 34L32 45Z" fill={rim} stroke={rim} strokeWidth="1.5" />
        <path d="M32 34L54 23L32 12L10 23L32 34Z" fill={rim} stroke={rim} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'games-interactive',
    title: 'Games and interactive entertainment',
    delay: '-2.4s',
    theme: {
      glow: 'rgba(244, 63, 94, 0.16)',
      shadow: 'rgba(190, 18, 60, 0.34)',
      borderHover: 'rgba(244, 63, 94, 0.34)',
      hoverShadow: 'rgba(225, 29, 72, 0.14)',
    },
    rimColors: ['#B91C1C', '#7F1D1D'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 20H45C51.6 20 57 25.4 57 32C57 38.6 52.8 45 47 45C43.5 45 41 42.5 39 40H25C23 42.5 20.5 45 17 45C11.2 45 7 38.6 7 32C7 25.4 12.4 20 19 20Z"
          fill="url(#icat-grad-games)"
        />
        <rect x="19" y="26" width="4" height="12" rx="2" fill="#FFFFFF" />
        <rect x="15" y="30" width="12" height="4" rx="2" fill="#FFFFFF" />
        <circle cx="43" cy="28.5" r="2.6" fill="#FFE4E6" />
        <circle cx="48.2" cy="33.5" r="2.6" fill="#FEF08A" />
        <circle cx="37.8" cy="33.5" r="2.6" fill="#FFFFFF" />
        <circle cx="43" cy="38.5" r="2.6" fill="#FFE4E6" />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 20H45C51.6 20 57 25.4 57 32C57 38.6 52.8 45 47 45C43.5 45 41 42.5 39 40H25C23 42.5 20.5 45 17 45C11.2 45 7 38.6 7 32C7 25.4 12.4 20 19 20Z"
          fill={rim}
          stroke={rim}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'digital-social',
    title: 'Digital and social media',
    delay: '-3.6s',
    theme: {
      glow: 'rgba(14, 165, 233, 0.16)',
      shadow: 'rgba(3, 105, 161, 0.34)',
      borderHover: 'rgba(14, 165, 233, 0.34)',
      hoverShadow: 'rgba(2, 132, 199, 0.14)',
    },
    rimColors: ['#0369A1', '#0C4A6E'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 16C12 12.7 14.7 10 18 10H46C49.3 10 52 12.7 52 16V38C52 41.3 49.3 44 46 44H26L15 53V44H18C14.7 44 12 41.3 12 38V16Z"
          fill="url(#icat-grad-social)"
        />
        <polygon points="27,20 27,34 40,27" fill="#FFFFFF" />
        <circle cx="46" cy="16" r="4.2" fill="#FB7185" />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 16C12 12.7 14.7 10 18 10H46C49.3 10 52 12.7 52 16V38C52 41.3 49.3 44 46 44H26L15 53V44H18C14.7 44 12 41.3 12 38V16Z"
          fill={rim}
          stroke={rim}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'ecommerce-product',
    title: 'E-commerce and product companies',
    delay: '-4.8s',
    theme: {
      glow: 'rgba(245, 158, 11, 0.16)',
      shadow: 'rgba(194, 65, 12, 0.34)',
      borderHover: 'rgba(245, 158, 11, 0.36)',
      hoverShadow: 'rgba(234, 88, 12, 0.14)',
    },
    rimColors: ['#C2410C', '#7C2D12'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 22V18C22 12.5 26.5 8 32 8C37.5 8 42 12.5 42 18V22"
          stroke="#B45309"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M13 22H51L54 52C54.3 54.8 52.1 57 49.3 57H14.7C11.9 57 9.7 54.8 10 52L13 22Z"
          fill="url(#icat-grad-ecom)"
        />
        <circle cx="24" cy="30.5" r="2.8" fill="#FEF3C7" />
        <circle cx="40" cy="30.5" r="2.8" fill="#FEF3C7" />
        <path
          d="M24 30.5C24 36 27.6 39.5 32 39.5C36.4 39.5 40 36 40 30.5"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 22V18C22 12.5 26.5 8 32 8C37.5 8 42 12.5 42 18V22"
          stroke={rim}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M13 22H51L54 52C54.3 54.8 52.1 57 49.3 57H14.7C11.9 57 9.7 54.8 10 52L13 22Z"
          fill={rim}
          stroke={rim}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'it-corporate',
    title: 'IT, consulting and corporate design',
    delay: '-6.0s',
    theme: {
      glow: 'rgba(16, 185, 129, 0.16)',
      shadow: 'rgba(4, 120, 87, 0.34)',
      borderHover: 'rgba(16, 185, 129, 0.34)',
      hoverShadow: 'rgba(5, 150, 105, 0.14)',
    },
    rimColors: ['#047857', '#064E3B'],
    renderFace: () => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 20V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V20"
          stroke="#065F46"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="8" y="20" width="48" height="34" rx="7" fill="url(#icat-grad-corp)" />
        <path
          d="M8 27C8 23.1 11.1 20 15 20H49C52.9 20 56 23.1 56 27V33H8V27Z"
          fill="url(#icat-grad-corp-top)"
        />
        <rect x="27" y="29" width="10" height="7" rx="2.5" fill="#FFFFFF" />
      </svg>
    ),
    renderExtrusion: (rim) => (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 20V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V20"
          stroke={rim}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <rect x="8" y="20" width="48" height="34" rx="7" fill={rim} stroke={rim} strokeWidth="1.5" />
      </svg>
    ),
  },
];

// Optimized solid 3D extrusion: 7 slices across 3.6px (0.6px step prevents z-fighting & cuts DOM load by 74%)
const SLICES = 7;
const DEPTH_PX = 3.6;
const SLICE_INDICES = Array.from({ length: SLICES }, (_, i) => i);

// 3 identical sets = 3,636px total width (seamless infinite loop with minimal GPU layers)
const REPEAT_SETS = [0, 1, 2];

// Easy manual tuning constants
const AUTO_SPEED_PX_PER_SEC = 75; // Increase for faster glide (e.g., 60 = calm, 95 = brisk)
const DRAG_FRICTION = 0.965;      // Closer to 1.0 = smoother, longer coast (0.95–0.98)
const WHEEL_MULTIPLIER = 1.1;     // Horizontal trackpad/wheel responsiveness

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
    let velocity = 0; // px per second
    let isHovered = false;
    let isDragging = false;
    let pointerId: number | null = null;
    let lastClientX = 0;
    let lastDragTime = 0;
    let lastFrameTime = performance.now();
    let rafId = 0;

    const wrapOffset = () => {
      if (setWidth <= 0) return;
      while (offset <= -setWidth) offset += setWidth;
      while (offset > 0) offset -= setWidth;
    };

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
      lastDragTime = performance.now();
      velocity = 0;
      setIsDraggingUI(true);
      viewport.setPointerCapture(pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = e.clientX - lastClientX;
      const dtSec = Math.max((now - lastDragTime) / 1000, 0.004);

      offset += dx;
      // Smoothly blend velocity (px/sec) to avoid sudden pointer spikes
      const instantVelocity = dx / dtSec;
      velocity = velocity * 0.35 + instantVelocity * 0.65;
      lastClientX = e.clientX;
      lastDragTime = now;
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
        offset -= delta * WHEEL_MULTIPLIER;
        velocity = 0;
        wrapOffset();
      }
    };

    // Delta-time normalized loop (consistent speed on 60Hz, 90Hz, and 120Hz ProMotion displays)
    const tick = (now: number) => {
      const dtSec = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (!isDragging) {
        if (Math.abs(velocity) > 12) {
          offset += velocity * dtSec;
          velocity *= Math.pow(DRAG_FRICTION, dtSec * 60);
        } else {
          velocity = 0;
          if (!isPausedRef.current && !isHovered) {
            offset -= AUTO_SPEED_PX_PER_SEC * dtSec;
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
    lastFrameTime = performance.now();
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
      {/* Shared Gradient Definitions */}
      <svg className="icat-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="icat-grad-film" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1746A2" />
          </linearGradient>
          <linearGradient id="icat-grad-film-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="icat-grad-vfx" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="icat-grad-vfx-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>

          <linearGradient id="icat-grad-games" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="55%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          <linearGradient id="icat-grad-social" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="icat-grad-ecom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="icat-grad-corp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="icat-grad-corp-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>

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
            INDUSTRIES.map((item) => {
              const cardStyle = {
                '--card-glow': item.theme.glow,
                '--card-shadow': item.theme.shadow,
                '--card-border-hover': item.theme.borderHover,
                '--card-hover-shadow': item.theme.hoverShadow,
              } as React.CSSProperties;

              return (
                <article
                  key={`${setIdx}-${item.id}`}
                  className="icat-industry-card"
                  style={cardStyle}
                  aria-hidden={setIdx !== 0 ? true : undefined}
                >
                  <div className="icat-card-aura" aria-hidden="true" />

                  <div className="icat-icon-stage" aria-hidden="true">
                    <div className="icat-icon-3d" style={{ animationDelay: item.delay }}>
                      {SLICE_INDICES.map((sliceIdx) => {
                        const z = (sliceIdx / (SLICES - 1) - 0.5) * DEPTH_PX;
                        const isFront = sliceIdx === SLICES - 1;
                        const isBack = sliceIdx === 0;
                        const isOuterBevel = sliceIdx === 1 || sliceIdx === SLICES - 2;

                        if (isFront) {
                          return (
                            <div
                              key={sliceIdx}
                              className="icat-icon-slice icat-icon-slice--face"
                              style={{ transform: `translateZ(${z.toFixed(2)}px)` }}
                            >
                              {item.renderFace()}
                            </div>
                          );
                        }

                        if (isBack) {
                          return (
                            <div
                              key={sliceIdx}
                              className="icat-icon-slice icat-icon-slice--face"
                              style={{ transform: `translateZ(${z.toFixed(2)}px) rotateY(180deg)` }}
                            >
                              {item.renderFace()}
                            </div>
                          );
                        }

                        const rimShade = isOuterBevel ? item.rimColors[0] : item.rimColors[1];
                        return (
                          <div
                            key={sliceIdx}
                            className="icat-icon-slice"
                            style={{ transform: `translateZ(${z.toFixed(2)}px)` }}
                          >
                            {item.renderExtrusion(rimShade)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="icat-icon-shadow" style={{ animationDelay: item.delay }} />
                  </div>

                  <h3 className="icat-industry-title">{item.title}</h3>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* <div className="icat-careers-divider" aria-hidden="true" />*/}
    </section>
  );
};

export default CareersMarquee;
