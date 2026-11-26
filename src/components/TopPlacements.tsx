import React, { useState } from 'react';
import './TopPlacements.css';

type CardHue =
  | 'rose'
  | 'lime'
  | 'forest'
  | 'sage'
  | 'teal'
  | 'amber'
  | 'cobalt'
  | 'violet';

export interface PlacedStudent {
  id: string;
  name: string;
  discipline: string;
  ctc: string;
  hue: CardHue;
  image: string;
}

/**
 * Authentic Top Placement Students from icat.ac.in/highest-ctc-placements.aspx
 *
 * HOW TO UPDATE PHOTOS MANUALLY IN GITHUB:
 * Upload portrait photos into: public/assets/placements/
 * using the exact filenames listed below (e.g. mohammed-nafees.jpg).
 * Until each photo is uploaded, a clean initials placeholder renders automatically.
 */
const TOP_PLACEMENTS: PlacedStudent[] = [
  {
    id: 'mohammed-nafees',
    name: 'Mohammed Nafees',
    discipline: 'UI Design & Dev',
    ctc: '10 LPA',
    hue: 'cobalt',
    image: '/assets/placements/mohammed-nafees.jpg',
  },
  {
    id: 'mariselvam',
    name: 'Mariselvam',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    hue: 'rose',
    image: '/assets/placements/mariselvam.jpg',
  },
  {
    id: 'anu-murugan',
    name: 'Anu Murugan',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    hue: 'lime',
    image: '/assets/placements/anu-murugan.jpg',
  },
  {
    id: 'thanga-vignesh',
    name: 'Thanga Vignesh D.',
    discipline: 'Multimedia',
    ctc: '7 LPA',
    hue: 'forest',
    image: '/assets/placements/thanga-vignesh.jpg',
  },
  {
    id: 'shivangi-shristti',
    name: 'Shivangi Shristti',
    discipline: 'Multimedia',
    ctc: '7 LPA',
    hue: 'teal',
    image: '/assets/placements/shivangi-shristti.jpg',
  },
  {
    id: 'azhagarasan-m',
    name: 'Azhagarasan M.',
    discipline: 'M.Sc Game Tech',
    ctc: '7 LPA',
    hue: 'amber',
    image: '/assets/placements/azhagarasan-m.jpg',
  },
  {
    id: 'faustino-vijo',
    name: 'Faustino Vijo V.',
    discipline: 'UI Design & Dev',
    ctc: '7 LPA',
    hue: 'violet',
    image: '/assets/placements/faustino-vijo.jpg',
  },
  {
    id: 'aravindd-c',
    name: 'Aravindd C.',
    discipline: 'M.Sc Multimedia',
    ctc: '7 LPA',
    hue: 'sage',
    image: '/assets/placements/aravindd-c.jpg',
  },
  {
    id: 'jayant-mahobia',
    name: 'Jayant Mahobia',
    discipline: 'Animation',
    ctc: '6.3 LPA',
    hue: 'rose',
    image: '/assets/placements/jayant-mahobia.jpg',
  },
  {
    id: 'yogitha-r',
    name: 'Yogitha R.',
    discipline: 'Graphic Design',
    ctc: '6.3 LPA',
    hue: 'teal',
    image: '/assets/placements/yogitha-r.jpg',
  },
  {
    id: 'prasath-dillibabu',
    name: 'Prasath Dillibabu',
    discipline: 'Game Programming',
    ctc: '6.3 LPA',
    hue: 'amber',
    image: '/assets/placements/prasath-dillibabu.jpg',
  },
  {
    id: 'jatin-agarwal',
    name: 'Jatin Agarwal',
    discipline: 'Game Art & Design',
    ctc: '6 LPA',
    hue: 'cobalt',
    image: '/assets/placements/jatin-agarwal.jpg',
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

  return (
    <article
      className="icat-pwall__card"
      data-hue={student.hue}
      aria-hidden={hidden ? true : undefined}
    >
      <div className="icat-pwall__frame">
        {!imgFailed ? (
          <img
            src={student.image}
            alt={hidden ? '' : `${student.name} — ${student.discipline}`}
            loading="lazy"
            decoding="async"
            width={460}
            height={500}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="icat-pwall__fallback" aria-hidden="true">
            <span className="icat-pwall__initials">{getInitials(student.name)}</span>
            <span className="icat-pwall__photo-hint">ICAT Alumni</span>
          </div>
        )}
        <span className="icat-pwall__package">{student.ctc}</span>
      </div>

      <div className="icat-pwall__meta">
        <b className="icat-pwall__name">{student.name}</b>
        <span className="icat-pwall__sector">{student.discipline}</span>
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
