import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { ActionButton, FooterLinkGroup, MediaPlaceholder, SectionHeading } from '../components/Shared';
import {
  CAMPUSES,
  PROGRAM_DETAILS,
  QUALIFICATIONS,
  findProgramme,
  isCampusAvailable,
  isQualification,
  type CampusId,
  type ProgrammeDetail,
  type ProgrammeSummary,
  type QualificationId,
} from '../data/programmes';

gsap.registerPlugin(ScrollTrigger);

function useProgramMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.program-hero-copy > *', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
      gsap.from('.program-hero .media-placeholder', {
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: 38,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
        });
      });
      gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: 'top 87%', once: true },
          y: 28,
          opacity: 0,
          duration: 0.58,
          stagger: 0.07,
          ease: 'power2.out',
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

function ProgramFooter() {
  return (
    <footer className="program-footer container">
      <div className="program-footer-top">
        <div>
          <Link to="/" className="logo">
            ICAT
          </Link>
          <p>Studio-first education in animation, VFX, games, design and media since 2004.</p>
        </div>
        <FooterLinkGroup title="Programmes">
          <Link to="/programs/animation">Animation</Link>
          <Link to="/programs/visual-effects">Visual Effects</Link>
          <Link to="/programs/game-art-and-design">Game Art and Design</Link>
          <Link to="/programs/graphic-design">Graphic Design</Link>
        </FooterLinkGroup>
        <FooterLinkGroup title="Campuses">
          <Link to="/programs/animation/in-chennai">Chennai</Link>
          <Link to="/#footer">Bengaluru</Link>
          <Link to="/#footer">Hyderabad</Link>
        </FooterLinkGroup>
        <FooterLinkGroup title="Admissions">
          <Link to="/#admissions">How to apply</Link>
          <Link to="/#alumni">Placements</Link>
          <Link to="/#news">News and events</Link>
        </FooterLinkGroup>
      </div>
      <div className="copyright">
        <span>ICAT College of Design and Media. All rights reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

function Breadcrumbs({
  city,
  programme = 'Animation',
  slug = 'animation',
  level,
}: {
  city?: string;
  programme?: string;
  slug?: string;
  level?: QualificationId;
}) {
  return (
    <div className="breadcrumbs container">
      <Link to={level ? `/?level=${level}#programmes` : '/'}>Home</Link>
      <span>/</span>
      <Link to={`/programs/${slug}${level ? `?level=${level}` : ''}`}>{programme}</Link>
      {city && (
        <>
          <span>/</span>
          <span>{city}</span>
        </>
      )}
    </div>
  );
}

function FaqList({ items }: { items: [string, string][] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map(([question, answer], idx) => (
        <div className={`faq${openIdx === idx ? ' open' : ''}`} key={question}>
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <span>{question}</span>
            <i>{openIdx === idx ? '−' : '+'}</i>
          </button>
          <div>
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function QualificationTabs({
  programme,
  selected,
  onChange,
}: {
  programme: ProgrammeSummary;
  selected: QualificationId;
  onChange: (level: QualificationId) => void;
}) {
  return (
    <div
      className="qualification-tabs programme-level-tabs"
      role="tablist"
      aria-label={`Qualification for ${programme.title}`}
    >
      {QUALIFICATIONS.map((qual) => {
        const available = Boolean(programme.offerings[qual.id]);
        return (
          <button
            key={qual.id}
            role="tab"
            type="button"
            aria-selected={selected === qual.id}
            className={selected === qual.id ? 'active' : ''}
            disabled={!available}
            title={
              available
                ? `View ${qual.label}`
                : `${qual.label} is not offered for ${programme.title}`
            }
            onClick={() => available && onChange(qual.id)}
          >
            {qual.label}
          </button>
        );
      })}
    </div>
  );
}

function EnquiryPanel({
  programme,
  level,
  campus,
  onCampusChange,
}: {
  programme: ProgrammeSummary;
  level: QualificationId;
  campus?: CampusId;
  onCampusChange?: (campus: CampusId) => void;
}) {
  const [confirmation, setConfirmation] = useState('');
  const offering = programme.offerings[level];

  return (
    <section className="enquiry-panel reveal" id="enquire">
      <div>
        <span className="eyebrow">Programme enquiry</span>
        <h3>Talk to the admissions team</h3>
        <p>Your programme choices are carried into this form automatically.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const chosenCampus = String(data.get('campus') || '');
          if (isCampusAvailable(programme, level, chosenCampus)) {
            setConfirmation(
              `Enquiry ready for ${String(data.get('qualification'))}, ${String(
                data.get('discipline')
              )}, ${CAMPUSES[chosenCampus].label}.`
            );
          }
        }}
      >
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" required type="email" placeholder="you@email.com" />
        </label>
        <label>
          Qualification
          <input name="qualification" readOnly value={offering?.title || ''} />
        </label>
        <label>
          Discipline
          <input name="discipline" readOnly value={programme.title} />
        </label>
        <label>
          Campus
          {campus && !onCampusChange ? (
            <>
              <input readOnly value={CAMPUSES[campus].label} />
              <input name="campus" type="hidden" value={campus} />
            </>
          ) : (
            <select
              name="campus"
              required
              value={campus || ''}
              onChange={(e) => onCampusChange?.(e.target.value as CampusId)}
            >
              <option value="" disabled>
                Select campus
              </option>
              {(Object.keys(CAMPUSES) as CampusId[]).map((key) => {
                const available = isCampusAvailable(programme, level, key);
                return (
                  <option key={key} value={key} disabled={!available}>
                    {CAMPUSES[key].label}
                    {available ? '' : ' — unavailable'}
                  </option>
                );
              })}
            </select>
          )}
        </label>
        <button className="button dark" type="submit">
          <span>Submit enquiry</span>
        </button>
        {confirmation && (
          <p className="form-confirmation" role="status">
            {confirmation}
          </p>
        )}
      </form>
    </section>
  );
}

function ProgramCta({
  eyebrow = 'Admissions 2026–27',
  title = 'Build the reel that starts your career',
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="program-cta" id="apply">
      <div className="container reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>
          Applications are open across ICAT&apos;s three campuses. Talk to the admissions team about
          the right level and location for you.
        </p>
        <div className="button-row">
          <ActionButton dark>Apply Now</ActionButton>
          <ActionButton href="#enquire">Talk to a counsellor</ActionButton>
        </div>
      </div>
    </section>
  );
}

function ProgramNotFound() {
  return (
    <main className="not-found container">
      <span className="eyebrow">Programme not found</span>
      <h1>That programme is not in the current catalogue.</h1>
      <p>Browse all available creative disciplines from the ICAT homepage.</p>
      <Link className="button dark" to="/#programmes">
        <span>Browse programmes</span>
      </Link>
    </main>
  );
}

function getOverviewFaqs(detail: ProgrammeDetail): [string, string][] {
  return [
    [
      `What ${detail.title} pathways does ICAT offer?`,
      `ICAT offers studio-led ${detail.title} study at undergraduate and professional levels. Exact levels vary by campus.`,
    ],
    [
      `Do I need previous ${detail.title} experience?`,
      'No. The programme starts with core visual and technical foundations before moving into specialist production.',
    ],
    [
      'Which tools will I learn?',
      `The current workflow includes ${detail.tools.join(', ')}. Tools are updated as professional practice changes.`,
    ],
    [
      'Will I graduate with a portfolio?',
      `Yes. Every year contributes finished work, and the final stage focuses on a recruiter-ready ${detail.title} portfolio.`,
    ],
  ];
}

function getCampusFaqs(
  detail: ProgrammeDetail,
  cityLabel: string,
  level: QualificationId
): [string, string][] {
  return [
    [
      `Who can apply for ${detail.title} in ${cityLabel}?`,
      level === 'bachelor'
        ? 'Applicants who have completed Plus Two, or an equivalent qualification in any stream, can apply.'
        : 'Applicants with a completed undergraduate degree, or an equivalent qualification, can apply.',
    ],
    [
      'How is the programme delivered?',
      'This is a full-time, studio-led programme built around practical projects and portfolio production.',
    ],
    [
      'Is the programme university affiliated?',
      'Yes. Degree pathways are delivered with university affiliation. Admissions will confirm the current academic award for your campus.',
    ],
    [
      `Does the ${cityLabel} campus provide placement support?`,
      "Yes. Portfolio preparation, mock interviews and recruiter introductions are coordinated through ICAT's central placement division.",
    ],
  ];
}

export function ProgramOverviewPage() {
  const { programSlug = '' } = useParams();
  const detail = PROGRAM_DETAILS[programSlug];
  const summary = findProgramme(programSlug);
  const [searchParams, setSearchParams] = useSearchParams();
  const rootRef = useProgramMotion();

  const rawLevel = searchParams.get('level');
  const level: QualificationId = isQualification(rawLevel) ? rawLevel : 'bachelor';

  if (!detail || !summary) return <ProgramNotFound />;

  const offering = summary.offerings[level];
  const rawCampus = searchParams.get('campus');
  const campus = isCampusAvailable(summary, level, rawCampus) ? rawCampus : undefined;

  const onLevelChange = (nextLevel: QualificationId) => {
    const next = new URLSearchParams(searchParams);
    next.set('level', nextLevel);
    if (!isCampusAvailable(summary, nextLevel, next.get('campus'))) {
      next.delete('campus');
    }
    setSearchParams(next);
  };

  return (
    <div ref={rootRef} className="program-page">
      <Navbar />
      <Breadcrumbs programme={detail.title} slug={detail.slug} level={level} />
      <main>
        <div className="container programme-level-control">
          <QualificationTabs programme={summary} selected={level} onChange={onLevelChange} />
        </div>
        {offering ? (
          <>
            <section className="program-hero container">
              <div className="program-hero-copy">
                <span className="eyebrow">{offering.title}</span>
                <h1>{detail.hero}</h1>
                <p>{detail.intro}</p>
                <div className="button-row">
                  <ActionButton dark href="#campuses">
                    Explore programmes
                  </ActionButton>
                  <ActionButton href="#enquire">Download brochure</ActionButton>
                </div>
              </div>
              <MediaPlaceholder />
            </section>

            <section className="program-intro container reveal">
              <span className="eyebrow">The discipline</span>
              <div>
                <h2>{detail.kicker}</h2>
                <p>{detail.intro}</p>
                <p>
                  Every brief follows a professional process: research, concept, making, critique,
                  iteration and final presentation.
                </p>
              </div>
            </section>

            <section className="section container">
              <SectionHeading
                eyebrow="Study pathways"
                title="Choose the level that fits where you are"
                copy={`Only confirmed ${detail.title} qualifications and campuses are shown below.`}
              />
              <div className="pathway-grid stagger-grid">
                {QUALIFICATIONS.filter((q) => summary.offerings[q.id]).map((qual, idx) => (
                  <article key={qual.id} className={level === qual.id ? 'active' : ''}>
                    <span>0{idx + 1}</span>
                    <h3>{summary.offerings[qual.id]?.title}</h3>
                    <p>
                      Available in{' '}
                      {summary.offerings[qual.id]?.campuses
                        .map((c) => CAMPUSES[c].label)
                        .join(', ')}
                      .
                    </p>
                    <button type="button" onClick={() => onLevelChange(qual.id)}>
                      {level === qual.id ? 'Selected' : 'View programme'}
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="section container" id="campuses">
              <SectionHeading
                eyebrow="Campuses"
                title={`Choose a campus for ${offering.title}`}
                copy="Available campuses are based on ICAT's published programme records. Unavailable combinations cannot be selected."
              />
              <div className="campus-program-grid stagger-grid">
                {(Object.keys(CAMPUSES) as CampusId[]).map((key) => {
                  const info = CAMPUSES[key];
                  const available = isCampusAvailable(summary, level, key);
                  return (
                    <article
                      key={info.id}
                      className={`media-card campus-option${available ? '' : ' unavailable'}`}
                      aria-disabled={!available}
                    >
                      <MediaPlaceholder />
                      <h3>{info.label}</h3>
                      <p>
                        {available ? info.address : `${offering.title} is not offered at this campus.`}
                      </p>
                      {available ? (
                        <Link
                          to={`/programs/${detail.slug}/in-${info.id}?level=${level}&campus=${info.id}`}
                        >
                          Select {info.label}
                        </Link>
                      ) : (
                        <span className="unavailable-label">Unavailable</span>
                      )}
                    </article>
                  );
                })}
              </div>
              <EnquiryPanel
                programme={summary}
                level={level}
                campus={campus}
                onCampusChange={(nextCampus) => {
                  if (!isCampusAvailable(summary, level, nextCampus)) return;
                  const next = new URLSearchParams(searchParams);
                  next.set('level', level);
                  next.set('campus', nextCampus);
                  setSearchParams(next);
                }}
              />
            </section>

            <section className="program-dark">
              <div className="container">
                <SectionHeading
                  eyebrow="What you will learn"
                  title="A complete professional workflow"
                  copy={`Projects grow in complexity while the focus stays on craft, critical thinking and finished ${detail.title.toLowerCase()} work.`}
                />
                <div className="skill-grid stagger-grid">
                  {detail.craft.map((skill, idx) => (
                    <article key={skill}>
                      <span className="eyebrow">{String(idx + 1).padStart(2, '0')}</span>
                      <h3>{skill}</h3>
                      <p>
                        Build practical understanding through demonstrations, guided exercises and
                        production briefs.
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="section container">
              <SectionHeading
                eyebrow="Student work"
                title="The portfolio is the final assessment"
                copy={`A selection of the projects that shape an ICAT ${detail.title} portfolio.`}
              />
              <div className="program-work-grid stagger-grid">
                {detail.works.map((work) => (
                  <article key={work}>
                    <MediaPlaceholder />
                    <h3>{work}</h3>
                  </article>
                ))}
              </div>
            </section>

            <section className="section container">
              <SectionHeading
                eyebrow="Careers"
                title={`Where ${detail.title.toLowerCase()} can take you`}
                copy="Graduates move into studios, agencies, product companies, production teams and independent creative practice."
              />
              <div className="role-list stagger-grid">
                {detail.careers.map((career) => (
                  <div key={career}>
                    <span>↗</span>
                    <b>{career}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="section container program-faq">
              <SectionHeading
                eyebrow={`${detail.title} FAQs`}
                title="Before you choose your programme"
              />
              <FaqList items={getOverviewFaqs(detail)} />
            </section>

            <ProgramCta title={`Start your ${detail.title.toLowerCase()} portfolio`} />
          </>
        ) : (
          <section className="programme-unavailable container">
            <span className="eyebrow">Qualification unavailable</span>
            <h1>{detail.title} is not offered at this qualification level.</h1>
            <p>
              Choose one of the available qualification tabs above. Your discipline selection has
              been preserved.
            </p>
          </section>
        )}
      </main>
      <ProgramFooter />
    </div>
  );
}

export function ProgramCampusPage() {
  const { programSlug = '', campusPath = '' } = useParams();
  const detail = PROGRAM_DETAILS[programSlug];
  const summary = findProgramme(programSlug);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const campusKey = campusPath.startsWith('in-') ? campusPath.slice(3) : campusPath;
  const campusInfo = campusKey in CAMPUSES ? CAMPUSES[campusKey as CampusId] : undefined;
  const rawLevel = searchParams.get('level');
  const level: QualificationId = isQualification(rawLevel) ? rawLevel : 'bachelor';

  const rootRef = useProgramMotion();
  const [activeYear, setActiveYear] = useState(0);

  if (
    !detail ||
    !summary ||
    !campusInfo ||
    !campusPath.startsWith('in-') ||
    !summary.offerings[level] ||
    !isCampusAvailable(summary, level, campusInfo.id)
  ) {
    return <ProgramNotFound />;
  }

  const cityLabel = campusInfo.label;
  const offering = summary.offerings[level]!;

  const onLevelChange = (nextLevel: QualificationId) => {
    if (isCampusAvailable(summary, nextLevel, campusInfo.id)) {
      navigate(`/programs/${detail.slug}/in-${campusInfo.id}?level=${nextLevel}&campus=${campusInfo.id}`);
    } else {
      navigate(`/programs/${detail.slug}?level=${nextLevel}`);
    }
  };

  const curriculum: [string, string, ...string[]][] = [
    [
      'Year 1',
      'Creative foundations',
      ...detail.craft.slice(0, 2),
      'Visual research',
      'Communication and presentation',
    ],
    [
      'Year 2',
      'Production practice',
      ...detail.craft.slice(2, 4),
      detail.tools[0],
      detail.tools[1],
    ],
    [
      'Year 3',
      'Portfolio and specialisation',
      ...detail.craft.slice(4, 6),
      'Major professional project',
      'Portfolio development',
    ],
  ];

  return (
    <div ref={rootRef} className="program-page">
      <Navbar />
      <Breadcrumbs
        city={cityLabel}
        programme={detail.title}
        slug={detail.slug}
        level={level}
      />
      <main>
        <div className="container programme-level-control">
          <QualificationTabs programme={summary} selected={level} onChange={onLevelChange} />
        </div>

        <section className="program-hero city-hero container">
          <div className="program-hero-copy">
            <span className="eyebrow">{offering.title}</span>
            <h1>
              Study {detail.title.toLowerCase()} in {cityLabel}
            </h1>
            <p>
              {detail.intro} Learn through briefs, critique and finished portfolio work at ICAT{' '}
              {cityLabel}.
            </p>
            <div className="button-row">
              <ActionButton dark href="#admissions">
                Apply for 2026–27
              </ActionButton>
              <ActionButton href="#enquire">Download brochure</ActionButton>
            </div>
          </div>
          <MediaPlaceholder />
        </section>

        <section className="course-facts container stagger-grid">
          {(
            [
              ['Campus', cityLabel],
              ['Study mode', 'Full time'],
              ['Eligibility', level === 'bachelor' ? 'Plus Two or equivalent' : 'Degree or equivalent'],
              ['Programme', offering.title],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </section>

        <nav className="course-nav">
          <div className="container">
            <a href="#overview">Overview</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#facilities">Facilities</a>
            <a href="#careers">Careers</a>
            <a href="#admissions">Admissions</a>
          </div>
        </nav>

        <section className="program-intro container reveal" id="overview">
          <span className="eyebrow">Programme overview</span>
          <div>
            <h2>{detail.kicker}</h2>
            <p>{detail.intro}</p>
            <p>
              Classes operate as working studios: research, briefs, critique, iteration and
              delivery. Students are assessed through both process and finished work.
            </p>
          </div>
        </section>

        <section className="section container">
          <SectionHeading
            eyebrow={`Why ${cityLabel}`}
            title={`A ${detail.title.toLowerCase()} studio built around making`}
            copy={`The ${cityLabel} campus combines dedicated production spaces, practitioner faculty and access to ICAT's central industry network.`}
          />
          <div className="feature-grid stagger-grid">
            {(
              [
                [
                  'Practitioner faculty',
                  'Mentors bring current methods, briefs and professional expectations into class.',
                ],
                [
                  'Specialist studios',
                  `Facilities and tools support the full ${detail.title.toLowerCase()} workflow.`,
                ],
                [
                  'Live project culture',
                  'Team briefs build the review and communication habits used in professional practice.',
                ],
                [
                  'Industry masterclasses',
                  'Working professionals share craft, production insight and portfolio feedback.',
                ],
                [
                  'Graduate Showcase',
                  'Final portfolios are presented to studios, recruiters, peers and families.',
                ],
                [
                  'Central placements',
                  'One placement division connects all three campuses to 800+ recruiter relationships.',
                ],
              ] as const
            ).map(([title, copy], idx) => (
              <article className="feature" key={title}>
                <span className="icon-tile">{String(idx + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="curriculum-section" id="curriculum">
          <div className="container">
            <SectionHeading
              eyebrow="Curriculum"
              title="From foundations to a professional portfolio"
              copy="The curriculum is sequenced as a production journey. Modules may be updated to reflect current university and industry requirements."
            />
            <div className="curriculum-layout">
              <div className="year-tabs" role="tablist">
                {curriculum.map(([yearLabel], idx) => (
                  <button
                    key={yearLabel}
                    type="button"
                    role="tab"
                    aria-selected={activeYear === idx}
                    className={activeYear === idx ? 'active' : ''}
                    onClick={() => setActiveYear(idx)}
                  >
                    <span>0{idx + 1}</span>
                    {yearLabel}
                  </button>
                ))}
              </div>
              <div className="year-panel" role="tabpanel">
                <span className="eyebrow">{curriculum[activeYear][0]}</span>
                <h3>{curriculum[activeYear][1]}</h3>
                <ul>
                  {curriculum[activeYear].slice(2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="split-section container" id="facilities">
          <div className="reveal">
            <MediaPlaceholder />
          </div>
          <div className="reveal">
            <span className="eyebrow">Studios and tools</span>
            <h2>Professional workflows from the first project</h2>
            <p>
              Specialist production spaces support individual and team briefs. Tools change with the
              industry; strong creative process remains central.
            </p>
            <div className="tool-tags">
              {detail.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="careers">
          <SectionHeading
            eyebrow="Careers and placements"
            title="Graduate with work recruiters can review"
            copy="Portfolio reviews, interview preparation and the Graduate Showcase connect final-year work directly to placement."
          />
          <div className="career-outcome">
            <div className="role-list stagger-grid">
              {detail.careers.map((career) => (
                <div key={career}>
                  <span>↗</span>
                  <b>{career}</b>
                </div>
              ))}
            </div>
            <aside>
              <strong>800+</strong>
              <span>recruiter relationships</span>
              <strong>9,500+</strong>
              <span>alumni across creative industries</span>
            </aside>
          </div>
        </section>

        <section className="section container" id="admissions">
          <SectionHeading
            eyebrow="Admissions"
            title={`Your route into ${detail.title} at ${cityLabel}`}
            copy={
              level === 'bachelor'
                ? 'You can begin your application before final Plus Two results are published.'
                : 'You can begin your application while final undergraduate results are pending.'
            }
          />
          <div className="steps stagger-grid">
            {(
              [
                ['01', 'Apply online', 'Share your academic details and programme preference.'],
                [
                  '02',
                  'Aptitude test',
                  'Complete the online test; a portfolio is optional but recommended.',
                ],
                [
                  '03',
                  'Interview and offer',
                  'Speak with admissions and confirm your provisional place.',
                ],
              ] as const
            ).map(([stepNum, stepTitle, stepCopy]) => (
              <article key={stepNum}>
                <strong>{stepNum}</strong>
                <h3>{stepTitle}</h3>
                <p>{stepCopy}</p>
              </article>
            ))}
          </div>
          <ActionButton dark href="#enquire">
            Start your application
          </ActionButton>
          <EnquiryPanel programme={summary} level={level} campus={campusInfo.id} />
        </section>

        <section className="section container program-faq">
          <SectionHeading eyebrow={`${cityLabel} programme FAQs`} title="The practical details" />
          <FaqList items={getCampusFaqs(detail, cityLabel, level)} />
        </section>

        <ProgramCta title={`Start your ${detail.title.toLowerCase()} portfolio in ${cityLabel}`} />
      </main>
      <ProgramFooter />
    </div>
  );
}

export function NotFoundPage() {
  return (
    <main className="not-found container">
      <span className="eyebrow">404</span>
      <h1>That page is not in the portfolio.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button dark" to="/">
        <span>Back to ICAT</span>
      </Link>
    </main>
  );
}
