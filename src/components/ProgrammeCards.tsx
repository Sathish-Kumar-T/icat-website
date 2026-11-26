import React from 'react';
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
  return (
    <div className="icat-prog-grid">
      {programmes.map((prog) => (
        <Link
          key={prog.slug}
          to={`/programs/${prog.slug}?level=${level}`}
          className="icat-prog-card"
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
      ))}
    </div>
  );
};

export default ProgrammeCards;
