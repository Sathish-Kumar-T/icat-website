import { useEffect, useRef, useState } from 'react';
import './CareersMarquee.css';

import careerIcon01 from '../assets/images/icat-careers-section-icons-svg/01-animation-and-film-studios.svg';
import careerIcon02 from '../assets/images/icat-careers-section-icons-svg/02-visual-effects-and-post-production.svg';
import careerIcon03 from '../assets/images/icat-careers-section-icons-svg/03-games-and-interactive-entertainment.svg';
import careerIcon04 from '../assets/images/icat-careers-section-icons-svg/04-digital-and-social-media.svg';
import careerIcon05 from '../assets/images/icat-careers-section-icons-svg/05-e-commerce-and-product-companies.svg';
import careerIcon06 from '../assets/images/icat-careers-section-icons-svg/06-it-consulting-and-corporate-design.svg';

const CAREERS = [
  { icon: careerIcon01, title: 'Animation and film studios' },
  { icon: careerIcon02, title: 'Visual effects and post-production' },
  { icon: careerIcon03, title: 'Games and interactive entertainment' },
  { icon: careerIcon04, title: 'Digital and social media' },
  { icon: careerIcon05, title: 'E-commerce and product companies' },
  { icon: careerIcon06, title: 'IT, consulting and corporate design' },
];

export default function CareersMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const scrollStartX = useRef(0);
  const dragged = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Scroll the duplicated track continuously. Dragging and Pause both stop autoplay.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    let previousTime = 0;
    const speed = 34; // pixels per second

    const tick = (time: number) => {
      if (previousTime && !isPaused && !isDragging) {
        const delta = Math.min((time - previousTime) / 1000, 0.05);
        viewport.scrollLeft += speed * delta;
        const loopPoint = viewport.scrollWidth / 2;
        if (loopPoint > 0 && viewport.scrollLeft >= loopPoint) {
          viewport.scrollLeft -= loopPoint;
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPaused, isDragging]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    // Only the primary mouse button; touch and pen are supported too.
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStartX.current = event.clientX;
    scrollStartX.current = viewport.scrollLeft;
    dragged.current = false;
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !isDragging) return;
    const distance = event.clientX - pointerStartX.current;
    if (Math.abs(distance) > 3) dragged.current = true;
    viewport.scrollLeft = scrollStartX.current - distance;
    const loopPoint = viewport.scrollWidth / 2;
    if (loopPoint > 0) {
      if (viewport.scrollLeft < 0) {
        viewport.scrollLeft += loopPoint;
        scrollStartX.current += loopPoint;
      } else if (viewport.scrollLeft >= loopPoint) {
        viewport.scrollLeft -= loopPoint;
        scrollStartX.current -= loopPoint;
      }
    }
  };

  const finishDrag = (event?: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (viewport && event && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const renderCards = (duplicate = false) =>
    CAREERS.map((career, index) => (
      <article className="careers-marquee__card" key={`${duplicate ? 'copy-' : ''}${career.title}`}>
        <span className="careers-marquee__icon-wrap">
          <img
            className="careers-marquee__icon"
            src={career.icon}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ animationDelay: `${index * -1.1}s` }}
          />
        </span>
        <h3>{career.title}</h3>
      </article>
    ));

  return (
    <section className="careers-marquee-section" aria-label="Career opportunities">
      <div className="careers-marquee__heading">
        <p className="careers-marquee__eyebrow">CAREERS</p>
        <h2>The industries ICAT graduates move into</h2>
        <p className="careers-marquee__copy">
          Media and design skills carry into nearly every sector. Explore the industries where creative talent makes an impact.
        </p>
      </div>

      <div
        ref={viewportRef}
        className={`careers-marquee__viewport${isDragging ? ' is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={() => setIsDragging(false)}
        role="region"
        aria-label="Scrollable career industries. Drag or swipe to explore."
        tabIndex={0}
      >
        <div className="careers-marquee__track">
          {renderCards()}
          <div className="careers-marquee__group-copy" aria-hidden="true">
            {renderCards(true)}
          </div>
        </div>
      </div>

      <div className="careers-marquee__controls">
        <span className="careers-marquee__hint">DRAG TO EXPLORE</span>
        <button
          type="button"
          className="careers-marquee__toggle"
          onClick={() => setIsPaused((value) => !value)}
          aria-pressed={isPaused}
        >
          {isPaused ? 'Play marquee' : 'Pause marquee'}
        </button>
      </div>
    </section>
  );
}
