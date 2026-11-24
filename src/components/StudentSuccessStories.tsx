import { useRef } from 'react';
import { featuredAlumni } from '../data/alumniData';
import './StudentSuccessStories.css';

export default function StudentSuccessStories() {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.success-story-card');
    const distance = card ? card.getBoundingClientRect().width + 20 : 300;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section className="success-stories-section" id="success-stories" aria-labelledby="success-stories-title">
      <div className="success-stories-inner">
        <header className="success-stories-heading">
          <span className="success-stories-eyebrow">Success Stories</span>
          <h2 id="success-stories-title">Students We Placed. Careers We Built</h2>
          <p>Where young dreams landed, after choosing ICAT.</p>
        </header>

        <div className="success-stories-toolbar">
          <span className="success-stories-count">Featured ICAT graduates</span>
          <div className="success-stories-controls" aria-label="Success stories carousel controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous success stories">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next success stories">→</button>
          </div>
        </div>

        <div className="success-stories-track" ref={trackRef}>
          {featuredAlumni.map((alumnus) => {
            const initials = alumnus.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('');
            return (
              <article className="success-story-card" key={alumnus.name}>
                <div className="success-story-portrait">
                  {alumnus.image ? (
                    <img src={alumnus.image} alt={alumnus.name} loading="lazy" />
                  ) : (
                    <span aria-hidden="true">{initials}</span>
                  )}
                </div>
                <div className="success-story-details">
                  <div>
                    <span className="success-story-kicker">ICAT graduate</span>
                    <h3>{alumnus.name}</h3>
                    <p className="success-story-role">{alumnus.designation}</p>
                  </div>
                  <div className="success-story-company">
                    <span className="success-story-company-mark" aria-hidden="true">{alumnus.company.slice(0, 1)}</span>
                    <div>
                      <span className="success-story-meta-label">Career destination</span>
                      <strong>{alumnus.company}</strong>
                    </div>
                  </div>
                  <div className="success-story-footer">
                    {alumnus.program && <span>{alumnus.program}</span>}
                    {alumnus.years && <span>{alumnus.years}</span>}
                    {alumnus.achievement && <p>{alumnus.achievement}</p>}
                    {alumnus.source && (
                      <a href={alumnus.source} target="_blank" rel="noreferrer">View graduate profile <span aria-hidden="true">↗</span></a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
