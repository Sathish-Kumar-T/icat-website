import { useState } from 'react';
import './CareersMarquee.css';
import animationIcon from '../assets/images/icat-careers-section-icons-svg/01-animation-and-film-studios.svg';
import vfxIcon from '../assets/images/icat-careers-section-icons-svg/02-visual-effects-and-post-production.svg';
import gamesIcon from '../assets/images/icat-careers-section-icons-svg/03-games-and-interactive-entertainment.svg';
import digitalIcon from '../assets/images/icat-careers-section-icons-svg/04-digital-and-social-media.svg';
import ecommerceIcon from '../assets/images/icat-careers-section-icons-svg/05-e-commerce-and-product-companies.svg';
import corporateIcon from '../assets/images/icat-careers-section-icons-svg/06-it-consulting-and-corporate-design.svg';

const industries = [
  { title: 'Animation and film studios', icon: animationIcon },
  { title: 'Visual effects and post-production', icon: vfxIcon },
  { title: 'Games and interactive entertainment', icon: gamesIcon },
  { title: 'Digital and social media', icon: digitalIcon },
  { title: 'E-commerce and product companies', icon: ecommerceIcon },
  { title: 'IT, consulting and corporate design', icon: corporateIcon },
];

export default function CareersMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="icat-careers-section" aria-labelledby="icat-careers-heading">
      <div className="icat-careers-container">
        <p className="icat-careers-eyebrow">Careers</p>
        <h2 id="icat-careers-heading" className="icat-careers-heading">
          The industries ICAT graduates move into
        </h2>
        <p className="icat-careers-subtext">
          Media and design skills carry into nearly every sector. These are the industries ICAT graduates can build careers in.
        </p>
      </div>

      <div className="icat-careers-controls">
        <span className="icat-careers-hint" aria-hidden="true">↔ Drag or scroll to explore</span>
        <button
          type="button"
          className="icat-careers-toggle"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>

      <div className={`icat-marquee-viewport${paused ? ' is-paused' : ''}`}>
        <div className="icat-marquee-track">
          {[0, 1].map((copy) => (
            <div className="icat-marquee-group" key={copy} aria-hidden={copy === 1}>
              {industries.map((industry) => (
                <article className="icat-industry-card" key={`${copy}-${industry.title}`}>
                  <span className="icat-icon-stage">
                    <img src={industry.icon} alt="" aria-hidden="true" />
                  </span>
                  <h3 className="icat-industry-title">{industry.title}</h3>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="icat-careers-divider" aria-hidden="true" />
    </section>
  );
}
