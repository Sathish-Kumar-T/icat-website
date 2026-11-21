import { useEffect, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import type { FacilityGallerySlide } from '../data/media';

interface FacilityGalleryProps {
  campusLabel: string;
  programmeTitle: string;
  tools: string[];
  slides: FacilityGallerySlide[];
}

export function FacilityGallery({
  campusLabel,
  programmeTitle,
  tools,
  slides,
}: FacilityGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [campusLabel, programmeTitle]);

  const total = slides.length;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const goTo = (index: number) => {
    if (total === 0) return;
    setActiveIndex(((index % total) + total) % total);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, total]);

  const handleThumbKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(idx + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(idx - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(total - 1);
    }
  };

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  if (!activeSlide) return null;

  return (
    <section className="section container facility-gallery" id="facilities">
      <div className="facility-gallery-header">
        <div className="facility-gallery-intro">
          <span className="eyebrow">Studios and facilities</span>
          <h2>Professional workflows from the first project</h2>
          <p>
            Explore the specialist production spaces at ICAT {campusLabel} supporting{' '}
            {programmeTitle.toLowerCase()} briefs, critique sessions and final portfolio shoots.
          </p>
          <div className="tool-tags" aria-label="Core studio tools">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <div className="facility-gallery-controls" aria-label="Facility photo gallery controls">
          <span className="facility-counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="facility-nav-buttons">
            <button
              type="button"
              className="facility-icon-btn"
              onClick={goPrev}
              aria-label="Previous facility photo"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="facility-icon-btn"
              onClick={goNext}
              aria-label="Next facility photo"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="facility-icon-btn"
              onClick={() => setLightboxOpen(true)}
              aria-label="Expand facility photo"
            >
              <Maximize2 size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="facility-stage-wrap">
        <div
          className="facility-stage"
          role="tabpanel"
          id={`facility-panel-${activeSlide.id}`}
          aria-labelledby={`facility-tab-${activeSlide.id}`}
        >
          {failedImages[activeSlide.id] ? (
            <div className="facility-fallback" role="img" aria-label={activeSlide.alt}>
              <ImageIcon size={36} aria-hidden="true" />
              <strong>{activeSlide.title}</strong>
              <span>{campusLabel} Campus</span>
            </div>
          ) : (
            <img
              key={activeSlide.id}
              src={activeSlide.src}
              alt={activeSlide.alt}
              referrerPolicy="no-referrer"
              decoding="async"
              onError={() => markImageFailed(activeSlide.id)}
              onClick={() => setLightboxOpen(true)}
            />
          )}

          <div className="facility-stage-caption">
            <div className="facility-stage-meta">
              <span>{activeSlide.category}</span>
              <span aria-hidden="true">·</span>
              <span>{campusLabel} Campus</span>
            </div>
            <h3>{activeSlide.title}</h3>
            <p>{activeSlide.caption}</p>
          </div>
        </div>

        <div
          className="facility-thumbs"
          role="tablist"
          aria-label={`Select a ${campusLabel} campus facility photo`}
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                id={`facility-tab-${slide.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`facility-panel-${slide.id}`}
                className={`facility-thumb${isActive ? ' active' : ''}`}
                onClick={() => goTo(idx)}
                onKeyDown={(event) => handleThumbKeyDown(event, idx)}
              >
                <span className="facility-thumb-media">
                  {failedImages[slide.id] ? (
                    <span className="facility-thumb-fallback" aria-hidden="true">
                      <ImageIcon size={18} />
                    </span>
                  ) : (
                    <img
                      src={slide.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(slide.id)}
                    />
                  )}
                </span>
                <span className="facility-thumb-label">
                  <span className="facility-thumb-index">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="facility-thumb-title">{slide.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="facility-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSlide.title} — ${campusLabel} Campus`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="facility-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <div className="facility-lightbox-bar">
              <div className="facility-lightbox-meta">
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                <span aria-hidden="true">·</span>
                <span>{activeSlide.title}</span>
                <span aria-hidden="true">·</span>
                <span>{campusLabel} Campus</span>
              </div>
              <button
                type="button"
                className="facility-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close fullscreen gallery"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="facility-lightbox-frame">
              <button
                type="button"
                className="facility-lightbox-nav prev"
                onClick={goPrev}
                aria-label="Previous facility photo"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>

              {failedImages[activeSlide.id] ? (
                <div className="facility-fallback" role="img" aria-label={activeSlide.alt}>
                  <ImageIcon size={40} aria-hidden="true" />
                  <strong>{activeSlide.title}</strong>
                  <span>{campusLabel} Campus</span>
                </div>
              ) : (
                <img
                  key={`lightbox-${activeSlide.id}`}
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  onError={() => markImageFailed(activeSlide.id)}
                />
              )}

              <button
                type="button"
                className="facility-lightbox-nav next"
                onClick={goNext}
                aria-label="Next facility photo"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>

            <p className="facility-lightbox-caption">{activeSlide.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
