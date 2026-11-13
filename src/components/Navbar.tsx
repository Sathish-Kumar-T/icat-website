import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CAMPUSES, QUALIFICATIONS, getProgrammesByLevel } from '../data/programmes';

type MenuId =
  | 'program'
  | 'admission'
  | 'placements'
  | 'campus'
  | 'student-work'
  | 'events'
  | 'contact';

const NAV_ITEMS: { id: MenuId; label: string }[] = [
  { id: 'program', label: 'Program' },
  { id: 'admission', label: 'Admission' },
  { id: 'placements', label: 'Placements' },
  { id: 'campus', label: 'Campus Life' },
  { id: 'student-work', label: 'Student work' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact Us' },
];

const STANDARD_MENUS: Record<
  'admission' | 'placements' | 'student-work' | 'events',
  { label: string; to: string }[]
> = {
  admission: [
    { label: 'Eligibility', to: '/#admissions' },
    { label: 'Admission Procedure', to: '/#admissions' },
    { label: 'Apply Online', to: '/#apply' },
  ],
  placements: [
    { label: 'Placement Process', to: '/#alumni' },
    { label: 'Top Recruiters', to: '/#alumni' },
    { label: 'Frequent Recruiters', to: '/#alumni' },
    { label: 'Recruiters Feedback', to: '/#alumni' },
    { label: 'Top Placements', to: '/#alumni' },
    { label: 'Placement Report', to: '/#alumni' },
    { label: 'Pre-Placement Support', to: '/#alumni' },
  ],
  'student-work': [
    { label: 'Animation', to: '/#works' },
    { label: 'Graphic Design', to: '/#works' },
    { label: 'Game Programming', to: '/#works' },
    { label: 'Interior Design', to: '/#works' },
    { label: 'Media Technology', to: '/#works' },
    { label: 'UI/UX Design', to: '/#works' },
    { label: 'Visual Effects', to: '/#works' },
  ],
  events: [
    { label: 'Miraki Cultural Fest', to: '/#news' },
    { label: 'Fresher’s Day Celebration', to: '/#news' },
    { label: 'Graduate Showcase', to: '/#news' },
    { label: 'Convocation Ceremony', to: '/#news' },
    { label: 'Social Responsibility', to: '/#news' },
    { label: 'Student Diary', to: '/#news' },
    { label: 'Celebration', to: '/#news' },
    { label: 'News & Events', to: '/#news' },
  ],
};

function NavLogo() {
  return (
    <Link className="icat-nav-logo" to="/" aria-label="ICAT home">
      <img
        className="icat-main-logo"
        src="/assets/icat-logo.svg"
        alt="ICAT College of Design and Media"
      />
      <span aria-hidden="true" />
      <img
        className="icat-years-logo"
        src="/assets/icat-22-years-logo.svg"
        alt="22 years"
      />
    </Link>
  );
}

function ProgrammeDropdown() {
  return (
    <div className="icat-programme-dropdown">
      <div className="icat-programme-columns">
        {QUALIFICATIONS.map((qual) => (
          <div className="icat-dropdown-column" key={qual.id}>
            <h2>
              {qual.id === 'bachelor'
                ? 'Bachelor’s Degree'
                : qual.id === 'pg'
                  ? 'PG Program'
                  : 'Master’s Degree'}
            </h2>
            <div>
              {getProgrammesByLevel(qual.id).map((prog) => (
                <Link key={prog.slug} to={`/programs/${prog.slug}?level=${qual.id}`}>
                  {prog.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="icat-dropdown-statement">
        Programs
        <br />
        That Create
        <br />
        Futures
      </p>
    </div>
  );
}

function CampusDropdown() {
  const images: Record<keyof typeof CAMPUSES, string> = {
    chennai: '/assets/d94b1.png',
    bengaluru: '/assets/1b87a.png',
    hyderabad: '/assets/e47f5.png',
  };

  return (
    <div className="icat-campus-dropdown">
      <div>
        <h2>Campus Life</h2>
        <div className="icat-campus-cards">
          {(Object.keys(CAMPUSES) as (keyof typeof CAMPUSES)[]).map((key) => (
            <Link key={key} className="icat-campus-card" to="/#campus-life">
              <img src={images[key]} alt="" loading="lazy" decoding="async" />
              <span>{CAMPUSES[key].label}</span>
            </Link>
          ))}
        </div>
      </div>
      <p className="icat-dropdown-statement">
        3 Cities
        <br />
        1 Creative
        <br />
        Pulse
      </p>
    </div>
  );
}

function ContactDropdown() {
  return (
    <div className="icat-contact-dropdown">
      <div>
        <h2>Contact us</h2>
        <div className="icat-contact-cities">
          <div>
            <b>Chennai</b>
            <p>{CAMPUSES.chennai.address}</p>
            <p>044 - 4293 4293</p>
            <p>+91 - 95001 28555</p>
          </div>
          <div>
            <b>Bengaluru</b>
            <p>{CAMPUSES.bengaluru.address}</p>
            <p>080 - 4110 7755</p>
            <p>+91 - 96111 73607</p>
          </div>
          <div>
            <b>Hyderabad</b>
            <p>{CAMPUSES.hyderabad.address}</p>
            <p>040 - 2447 7755</p>
            <p>+91 - 75694 34552</p>
          </div>
        </div>
      </div>
      <p className="icat-dropdown-statement">
        Your Creative Story
        <br />
        Starts with Hello
      </p>
    </div>
  );
}

function StandardDropdown({
  menu,
}: {
  menu: 'admission' | 'placements' | 'student-work' | 'events';
}) {
  const titles = {
    admission: 'Join the Creative League',
    placements: 'Your Career Story Starts Here',
    'student-work': 'Student works',
    events: 'Events',
  };

  return (
    <div className="icat-standard-dropdown">
      <div>
        <h2>{titles[menu]}</h2>
        <div>
          {STANDARD_MENUS[menu].map((item) => (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="icat-dropdown-statement">
        {menu === 'admission' && (
          <>
            Join the
            <br />
            Creative League
          </>
        )}
        {menu === 'placements' && (
          <>
            Your Career Story
            <br />
            Starts Here
          </>
        )}
        {menu === 'student-work' && (
          <>
            Made by Minds
            <br />
            Like Yours
          </>
        )}
        {menu === 'events' && (
          <>
            Own the
            <br />
            Stage
          </>
        )}
      </p>
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const { lang, setLang } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
        setLangMenuOpen(false);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  const renderDropdown = () => {
    if (!activeMenu) return null;
    if (activeMenu === 'program') return <ProgrammeDropdown />;
    if (activeMenu === 'campus') return <CampusDropdown />;
    if (activeMenu === 'contact') return <ContactDropdown />;
    return <StandardDropdown menu={activeMenu} />;
  };

  const isNavActive = (id: MenuId): boolean => {
    if (activeMenu === id) return true;
    if (id === 'program') return location.pathname.startsWith('/programs');
    const hashMap: Record<Exclude<MenuId, 'program'>, string[]> = {
      admission: ['#admissions', '#apply'],
      placements: ['#alumni'],
      campus: ['#campus-life'],
      'student-work': ['#works'],
      events: ['#news'],
      contact: ['#footer'],
    };
    return hashMap[id]?.includes(location.hash) ?? false;
  };

  return (
    <>
      <div className="icat-top-alert" role="region" aria-label="Admissions announcement">
        <Link className="icat-top-alert-link" to="/#apply">
          <span className="icat-top-alert-dot" aria-hidden="true" />
          <span>
            {lang === 'ta'
              ? 'சேர்க்கை 2026-27 நடைபெறுகிறது'
              : 'Admissions 2026-27 Underway'}
          </span>
        </Link>
        <div className="icat-top-alert-meta">
          {/* <a href="tel:18008431888">
            {lang === 'ta'
              ? 'கட்டணமில்லா அழைப்பு: 1800 843 1888'
              : 'Toll Free: 1800 843 1888'}
          </a>
          <span className="icat-top-alert-sep" aria-hidden="true">
            |
          </span> */}
          <span>
            {lang === 'ta'
              ? 'வளாகங்கள்: சென்னை · பெங்களூரு · ஹைதராபாத்'
              : 'Campuses: Chennai · Bangalore · Hyderabad'}
          </span>
          <span className="icat-top-alert-sep" aria-hidden="true">
            |
          </span>
          <div className="icat-lang-dropdown" ref={langMenuRef}>
            <button
              type="button"
              className="icat-lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
              aria-label="Select language"
              onClick={() => setLangMenuOpen((open) => !open)}
            >
              <Globe size={13} aria-hidden="true" />
              <span>{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={langMenuOpen ? 'open' : ''}
              />
            </button>
            {langMenuOpen && (
              <div className="icat-lang-menu" role="listbox" aria-label="Language options">
                <button
                  type="button"
                  role="option"
                  aria-selected={lang === 'en'}
                  className={lang === 'en' ? 'active' : ''}
                  onClick={() => {
                    setLang('en');
                    setLangMenuOpen(false);
                  }}
                >
                  <span>English</span>
                  {lang === 'en' && <Check size={13} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang === 'ta'}
                  className={lang === 'ta' ? 'active' : ''}
                  onClick={() => {
                    setLang('ta');
                    setLangMenuOpen(false);
                  }}
                >
                  <span>தமிழ்</span>
                  {lang === 'ta' && <Check size={13} aria-hidden="true" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <header
        className={`icat-navbar${activeMenu ? ' dropdown-open' : ''}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
      <div className="icat-navbar-bar">
        <NavLogo />
        <nav
          className={`icat-main-navigation${mobileOpen ? ' mobile-open' : ''}`}
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <div className="icat-nav-item" key={item.id}>
              <button
                className={isNavActive(item.id) ? 'active' : ''}
                type="button"
                aria-expanded={activeMenu === item.id}
                onMouseEnter={() => setActiveMenu(item.id)}
                onFocus={() => setActiveMenu(item.id)}
                onClick={() =>
                  setActiveMenu(activeMenu === item.id ? null : item.id)
                }
              >
                {item.label}
                <span className="mobile-chevron" aria-hidden="true">
                  {activeMenu === item.id ? '−' : '+'}
                </span>
              </button>
              {activeMenu === item.id && (
                <div className="icat-mobile-menu-panel">{renderDropdown()}</div>
              )}
            </div>
          ))}
          <Link className="icat-mobile-apply" to="/#apply">
            Apply Now 2026
          </Link>
        </nav>
        <Link className="icat-apply-button" to="/#apply">
          Apply Now 2026
        </Link>
        <button
          className="icat-mobile-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setActiveMenu(null);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className={`icat-navbar-dropdown${activeMenu ? ' visible' : ''}`}
        onMouseEnter={() => activeMenu && setActiveMenu(activeMenu)}
      >
        {renderDropdown()}
      </div>
    </header>
    </>
  );
}
