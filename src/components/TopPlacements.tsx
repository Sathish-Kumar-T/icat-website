import React, { useState } from 'react';
import './TopPlacements.css';

type CardHue = 'cobalt' | 'violet' | 'teal' | 'amber' | 'rose' | 'lime';

export interface PlacedStudent {
  id: string;
  name: string;
  discipline: string;
  ctc: string;
  company?: string;
  hue: CardHue;
  image?: string;
}

/**
 * Top ICAT Placement Records
 * To add real student portraits, place square photos inside:
 *   public/assets/placements/<filename>.webp (or .jpg)
 * and set the `image` path below. Until an image is added,
 * a color-matched initials card is displayed automatically.
 */
const TOP_PLACEMENTS: PlacedStudent[] = [
  {
    id: 'mohammed-nafees',
    name: 'Mohammed Nafees',
    discipline: 'UI Design & Dev',
    ctc: '10 LPA',
    hue: 'cobalt',
    image: '/assets/placements/mohammed-nafees.webp',
  },
  {
    id: 'mariselvam',
    name: 'Mariselvam S.',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    company: 'Illumine',
    hue: 'violet',
    image: '/assets/placements/mariselvam.webp',
  },
  {
    id: 'anu-murugan',
    name: 'Anu Murugan',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    company: 'Illumine',
    hue: 'teal',
    image: '/assets/placements/anu-murugan.webp',
  },
  {
    id: 'thanga-vignesh',
    name: 'Thanga Vignesh D.',
    discipline: 'Multimedia',
    ctc: '7 LPA',
    company: 'TCS',
    hue: 'amber',
    image: '/assets/placements/thanga-vignesh.webp',
  },
  {
    id: 'shivangi-shristti',
    name: 'Shivangi Shristti',
    discipline: 'Multimedia',
    ctc: '7 LPA',
    company: 'TCS',
    hue: 'rose',
    image: '/assets/placements/shivangi-shristti.webp',
  },
  {
    id: 'faustino-vijo',
    name: 'Faustino Vijo V.',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    hue: 'lime',
    image: '/assets/placements/faustino-vijo.webp',
  },
  {
    id: 'aravindd-c',
    name: 'Aravindd C.',
    discipline: 'M.Sc Multimedia',
    ctc: '7 LPA',
    hue: 'cobalt',
    image: '/assets/placements/aravindd-c.webp',
  },
  {
    id: 'rohith-kumar',
    name: 'Rohith Kumar S.',
    discipline: 'UI Design & Dev',
    ctc: '6.3 LPA',
    company: 'TCS',
    hue: 'violet',
    image: '/assets/placements/rohith-kumar.webp',
  },
  {
    id: 'prasath-dillibabu',
    name: 'Prasath Dillibabu',
    discipline: 'Game Programming',
    ctc: '6.3 LPA',
    company: 'TCS',
    hue: 'teal',
    image: '/assets/placements/prasath-dillibabu.webp',
  },
  {
    id: 'yogitha-r',
    name: 'Yogitha R.',
    discipline: 'Graphic Design',
    ctc: '6.3 LPA',
    company: 'TCS',
    hue: 'amber',
    image: '/assets/placements/yogitha-r.webp',
  },
  {
    id: 'karan-verma',
    name: 'Karan Verma',
    discipline: 'Game Design & Dev',
    ctc: '6.3 LPA',
    company: 'TCS',
    hue: 'rose',
    image: '/assets/placements/karan-verma.webp',
  },
  {
    id: 'jatin-agarwal',
    name: 'Jatin Agarwal',
    discipline: 'Game Art & Design',
    ctc: '6 LPA',
    company: 'BeBetta',
    hue: 'lime',
    image: '/assets/placements/jatin-agarwal.webp',
  },
];

function getInitials(name: string): string {
  const parts = name.replace(/\./g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const PlacementCard: React.FC<{ student: PlacedStudent; hidden?: boolean }> = ({
  student,
  hidden = false,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(student.image) && !imgFailed;

  return (
    <article
      className="icat-pwall__card"
      data-hue={student.hue}
      aria-hidden={hidden ? true : undefined}
    >
      <div className="icat-pwall__frame">
        {showImage ? (
          <img
            src={student.image}
            alt={hidden ? '' : `${student.name} — ${student.discipline}`}
            loading="lazy"
            decoding="async"
            width={460}
            height={460}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="icat-pwall__fallback" aria-hidden="true">
            <span className="icat-pwall__initials">{getInitials(student.name)}</span>
            {student.company && (
              <span className="icat-pwall__company-chip">{student.company}</span>
            )}
          </div>
        )}
        <span className="icat-pwall__package">{student.ctc}</span>
      </div>

      <div className="icat-pwall__meta">
        <b className="icat-pwall__name">{student.name}</b>
        <span className="icat-pwall__sector">
          {student.company ? `${student.discipline} · ${student.company}` : student.discipline}
        </span>
      </div>
    </article>
  );
};

export const TopPlacements: React.FC = () => {
  return (
    <section
      className="icat-pwall-section"
      aria-labelledby="icat-top-placements-heading"
    >
      <div className="icat-pwall-header">
        <p className="icat-pwall-eyebrow">Top Placements</p>
        <h2 id="icat-top-placements-heading" className="icat-pwall-title">
          Real success, real stories
        </h2>
        <p className="icat-pwall-sub">
          Recent top placements from ICAT — the discipline each graduate trained in, and the
          package they stepped into.
        </p>
      </div>

      <div className="icat-pwall" role="region" aria-label="ICAT top placed students">
        <div className="icat-pwall__track">
          {TOP_PLACEMENTS.map((student) => (
            <PlacementCard key={student.id} student={student} />
          ))}
          {TOP_PLACEMENTS.map((student) => (
            <PlacementCard key={`dup-${student.id}`} student={student} hidden />
          ))}
        </div>
      </div>

      <div className="icat-pwall-footer">
        <a
          className="icat-pwall-link"
          href="https://www.icat.ac.in/highest-ctc-placements.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View all top placements</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

export default TopPlacements;
