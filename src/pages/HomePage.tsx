import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { ProgrammeCards } from '../components/ProgrammeCards';
import CompanyMarquee from '../components/CompanyMarquee';
//import StudentSuccessStories from '../components/StudentSuccessStories';
import { TopPlacements } from '../components/TopPlacements';
import CareersMarquee from '../components/CareersMarquee';
import { useLanguage } from '../context/LanguageContext';
import {
  ActionButton,
  AdmissionsBadge,
  FooterLinkGroup,
  MediaPlaceholder,
  SectionHeading,
} from '../components/Shared';
import {
  QUALIFICATIONS,
  getProgrammesByLevel,
  isQualification,
  type CampusId,
  type QualificationId,
} from '../data/programmes';
import {
  EVENT_MEDIA,
  NEWS_MEDIA,
  PROGRAMME_MEDIA,
  SECTION_MEDIA,
  WORK_MEDIA,
} from '../data/media';
import {
  alumniTestimonials,
  featuredAlumni,
  industryAlumni,
} from '../data/alumniData';
import chennaiCampusImg from '../assets/images/Chennai-campus.png';
import bengaluruCampusImg from '../assets/images/Bengaluru-campus.png';
import hyderabadCampusImg from '../assets/images/Hyderabad-campus.png';
import whyIcon01 from '../assets/images/icat-why-section-icons-svg/01-industry-led-guest-lectures.svg';
import whyIcon02 from '../assets/images/icat-why-section-icons-svg/02-expert-faculty.svg';
import whyIcon03 from '../assets/images/icat-why-section-icons-svg/03-portfolio-focused-learning.svg';
import whyIcon04 from '../assets/images/icat-why-section-icons-svg/04-real-world-projects.svg';
import whyIcon05 from '../assets/images/icat-why-section-icons-svg/05-workshops-and-masterclasses.svg';
import whyIcon06 from '../assets/images/icat-why-section-icons-svg/06-world-class-labs-and-studios.svg';
import careerIcon01 from '../assets/images/icat-careers-section-icons-svg/01-animation-and-film-studios.svg';
import careerIcon02 from '../assets/images/icat-careers-section-icons-svg/02-visual-effects-and-post-production.svg';
import careerIcon03 from '../assets/images/icat-careers-section-icons-svg/03-games-and-interactive-entertainment.svg';
import careerIcon04 from '../assets/images/icat-careers-section-icons-svg/04-digital-and-social-media.svg';
import careerIcon05 from '../assets/images/icat-careers-section-icons-svg/05-e-commerce-and-product-companies.svg';
import careerIcon06 from '../assets/images/icat-careers-section-icons-svg/06-it-consulting-and-corporate-design.svg';

const HOME_CAMPUS_MEDIA: Record<CampusId, string> = {
  chennai: chennaiCampusImg,
  bengaluru: bengaluruCampusImg,
  hyderabad: hyderabadCampusImg,
};

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: whyIcon01,
    title: 'Industry-led guest lectures',
    copy: 'Working professionals from studios, agencies and production houses take sessions through the year.',
  },
  {
    icon: whyIcon02,
    title: 'Expert faculty',
    copy: 'Teachers who work in the craft they teach, and bring current projects into the classroom.',
  },
  {
    icon: whyIcon03,
    title: 'Portfolio-focused learning',
    copy: 'Every semester produces work that goes into the portfolio recruiters review at the Graduate Showcase.',
  },
  {
    icon: whyIcon04,
    title: 'Real-world projects',
    copy: 'Students work on live briefs from studios and clients, not only classroom exercises.',
  },
  {
    icon: whyIcon05,
    title: 'Workshops and masterclasses',
    copy: 'Intensive sessions beyond the syllabus, from software deep-dives to portfolio reviews.',
  },
  {
    icon: whyIcon06,
    title: 'World-class labs and studios',
    copy: 'Animation, VFX, game, fashion, interior and photography studios across the campuses.',
  },
];

const CAMPUSES_LIST = [
  {
    title: 'Chennai',
    copy: '153, Santhome High Road, Mylapore, Chennai 600 004.',
  },
  {
    title: 'Bengaluru',
    copy: '424, Bommanahalli, Hosur Main Road, Bengaluru 560 068.',
  },
  {
    title: 'Hyderabad',
    copy: 'Bahadurguda, Saroornagar, L.B. Nagar, Hyderabad 500 074.',
  },
];

const ALUMNI_LIST = [...featuredAlumni, ...industryAlumni];
const ALUMNI_PAGE_SIZE = 4;
const ALUMNI_SLIDES = Array.from(
  { length: Math.ceil(ALUMNI_LIST.length / ALUMNI_PAGE_SIZE) },
  (_, idx) => ALUMNI_LIST.slice(idx * ALUMNI_PAGE_SIZE, (idx + 1) * ALUMNI_PAGE_SIZE)
);

const CAREERS = [
  { icon: careerIcon01, title: 'Animation and film studios' },
  { icon: careerIcon02, title: 'Visual effects and post-production' },
  { icon: careerIcon03, title: 'Games and interactive entertainment' },
  { icon: careerIcon04, title: 'Digital and social media' },
  { icon: careerIcon05, title: 'E-commerce and product companies' },
  { icon: careerIcon06, title: 'IT, consulting and corporate design' },
];

const WORKS = [
  'Animation: character reel',
  'VFX: compositing breakdown',
  'Game art: environment build',
  'Graphic design: brand identity',
  'Interior design: spatial project',
  'Fashion design: graduate collection',
];

const NEWS = [
  {
    title: 'Graduate Showcase 2026',
    copy: 'Final-year portfolios from all three campuses go on show to recruiters, studios and families.',
  },
  {
    title: 'Miraki 2026',
    copy: 'The intercollegiate festival returns with design, media and cultural competitions across campuses.',
  },
  {
    title: 'Animation Expo 2026',
    copy: "Animation students present the year's reels and short films at the Chennai campus.",
  },
  {
    title: 'Fashion Expo 2026',
    copy: 'Graduate collections from the Fashion Design programme take to the runway.',
  },
  {
    title: 'Kampus 360°',
    copy: 'The inter-campus festival runs across Chennai, Bengaluru and Hyderabad.',
  },
  {
    title: 'Student wins video editing prize',
    copy: 'ICAT student Karnika took first prize for editing in a video competition.',
  },
];

const FAQS: [string, string][] = [
  [
    'What programmes does ICAT offer?',
    'ICAT offers twelve disciplines across animation, games, design and media, at Bachelor’s, PG Professional and Master’s levels.',
  ],
  [
    'What are the eligibility requirements?',
    'Bachelor’s applicants need Plus Two or an equivalent qualification. Master’s and PG requirements vary by programme.',
  ],
  [
    'Can I apply before my 12th results are out?',
    'Yes. You can begin your application and receive provisional guidance while your final results are pending.',
  ],
  [
    'How does the admission process work?',
    'Check your eligibility, apply online, then complete the aptitude test and telephone interview.',
  ],
  [
    'Do I need to submit a portfolio?',
    'A portfolio is optional but recommended. The admissions team can also guide you on what to include.',
  ],
  [
    'Which campus should I choose?',
    'Choose based on programme availability and location. Each campus follows the same studio-first learning model.',
  ],
  [
    'What placement support does ICAT provide?',
    'Students receive portfolio reviews, recruiter introductions, placement preparation and access to the Graduate Showcase.',
  ],
];

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [alumniSlide, setAlumniSlide] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const rawLevel = searchParams.get('level');
  const level: QualificationId = isQualification(rawLevel) ? rawLevel : 'bachelor';
  const programmes = getProgrammesByLevel(level);

  const selectLevel = (nextLevel: QualificationId) => {
    const next = new URLSearchParams(searchParams);
    next.set('level', nextLevel);
    next.delete('campus');
    setSearchParams(next);
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.hero .media-placeholder', {
        scale: 0.92,
        opacity: 0,
        duration: 1.15,
        ease: 'power3.out',
      });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: 44,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
      gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          y: 34,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Navbar />
      <main>
        <section className="hero">
          <video
            ref={heroVideoRef}
            className="hero-background"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(e) => {
              const video = e.currentTarget;
              video.muted = true;
              if (video.paused) {
                video.play().catch(() => {});
              }
            }}
          >
            <source src="/assets/icat-hero-main.mp4" type="video/mp4" />
          </video>
          <div className="container hero-inner">
            <div className="hero-copy">
              <AdmissionsBadge>
                {lang === 'ta' ? 'சேர்க்கை திறக்கப்பட்டுள்ளது' : 'Admissions Open'}
              </AdmissionsBadge>
              <h1>
                {lang === 'ta'
                  ? 'வடிவமைப்பு, அனிமேஷன் மற்றும் கேம் துறைகளில் உங்கள் எதிர்காலம் தொடங்கும் இடம்'
                  : 'Where design, animation and game careers begin'}
              </h1>
              <p>
                {lang === 'ta'
                  ? 'அனிமேஷன், VFX, கேம்ஸ், வடிவமைப்பு மற்றும் ஊடகத்தில் ஸ்டுடியோ சார்ந்த கல்வி. 2004 முதல் மூன்று வளாகங்களில் செயல்படுகிறது.'
                  : 'A studio-first education in animation, VFX, games, design and media. Taught by practitioners, assessed on portfolio, and running across three campuses since 2004.'}
              </p>
              <div className="button-row">
                <ActionButton>{lang === 'ta' ? 'இப்போது விண்ணப்பிக்கவும்' : 'Apply Now'}</ActionButton>
                <ActionButton href="#programmes">
                  {lang === 'ta' ? 'பாடத்திட்டங்களைக் காண்க' : 'Explore programmes'}
                </ActionButton>
              </div>
            </div>
          </div>
        </section>

        <section className="stats container stagger-grid" aria-label="ICAT statistics">
          {(
            [
              ['22+', 'Years of experience'],
              ['9,500+', 'Successful alumni'],
              ['800+', 'Leading recruiters'],
              ['100%', 'Placement support'],
            ] as const
          ).map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

          <section className="section container" id="programmes">
          <SectionHeading
            eyebrow="Programmes"
            title="Twelve disciplines. Three levels. Three campuses."
            copy="Bachelor's, PG Professional and Master's programmes across animation, VFX, games, design and media, offered in Chennai, Bengaluru and Hyderabad. Levels vary by campus, and each programme page lists exactly what runs where."
          />
          <div
            className="qualification-tabs reveal"
            role="tablist"
            aria-label="Programme qualification"
          >
            {QUALIFICATIONS.map((qual) => (
              <button
                key={qual.id}
                role="tab"
                type="button"
                aria-selected={level === qual.id}
                className={level === qual.id ? 'active' : ''}
                onClick={() => selectLevel(qual.id)}
              >
                {qual.label}
              </button>
            ))}
          </div>
          
          <ProgrammeCards programmes={programmes} level={level} mediaMap={PROGRAMME_MEDIA} />
          
          {/*<div className="card-grid stagger-grid programmes-card-grid">
            {programmes.map((prog) => (
              <article className="media-card" key={prog.slug}>
                <MediaPlaceholder
                  src={PROGRAMME_MEDIA[prog.slug]}
                  alt={`${prog.title} creative portfolio artwork`}
                />
                <h3>{prog.title}</h3>
                <p>{prog.description}</p>
                <Link to={`/programs/${prog.slug}?level=${level}`}>Explore</Link>
              </article>
            ))}
          </div>*/}
            
          <ActionButton href="#programmes">Browse all programmes</ActionButton>
        </section>  

        
        <section className="split-section container" id="about">
          <div className="reveal">
            <span className="eyebrow">The ICAT legacy</span>
            <h2>22 years teaching design the way studios work</h2>
            <p>
              ICAT was founded in 2004 by the IMAGE GROUP under Chairman K. Kumar, on the belief that
              creative education belongs in studios rather than textbooks. That model now runs
              across Chennai, Bengaluru and Hyderabad, with programmes at Bachelor&apos;s, PG
              Professional and Master&apos;s level.
            </p>
            <ActionButton href="#about">About ICAT</ActionButton>
          </div>
          <div className="reveal">
            <MediaPlaceholder
              videoSrc="/assets/icat-about.mp4"
              videoControls
              alt="ICAT studio-first design education showcase"
            />
          </div>
        </section>
        
        
       <TopPlacements />

        
        {/*<section className="section container">
          <SectionHeading
            eyebrow="Why ICAT"
            title="Trained the way studios hire"
            copy="What sits behind every ICAT portfolio: practitioner faculty, live briefs, studio-grade facilities, and a placement team working the same 800+ partner list year after year."
          />
          <div className="feature-grid stagger-grid">
            {FEATURES.map((item) => (
              <article className="feature" key={item.title}>
                <span className="icon-tile">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>*/}
        

        <CompanyMarquee />

    

        {/* <StudentSuccessStories /> */}

        <section className="section container">
          <SectionHeading
            eyebrow="Events"
            title="Where the work meets the industry"
            copy="Two fixtures anchor the ICAT year: the Graduate Showcase, where final portfolios go in front of recruiters, and Miraki, the student festival run across all three campuses."
          />
          <div className="event-grid stagger-grid">
            {(
              [
                [
                  'Graduate Showcase',
                  'Every final-year portfolio shown at once: animation, visual effects, game art, graphic design, photography, fashion and interiors, in front of recruiters and families.',
                ],
                [
                  'Miraki',
                  "ICAT's annual intercollegiate festival: design, media and cultural competitions, screenings and performances across Chennai, Bengaluru and Hyderabad.",
                ],
              ] as const
            ).map(([title, copy], idx) => (
              <article className="event-card" key={title}>
                <MediaPlaceholder src={EVENT_MEDIA[idx]} alt={`${title} at ICAT`} />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <a href="#news">See {title}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <SectionHeading
            eyebrow="Campuses"
            title="Three campuses, one ICAT"
            copy="Chennai, Bengaluru and Hyderabad, all running the same studio model and sharing one placement division. Programmes are affiliated to leading universities, and levels differ by campus."
          />
          <div className="card-grid three stagger-grid">
            {CAMPUSES_LIST.map((campus) => (
              <article className="media-card" key={campus.title}>
                <MediaPlaceholder
                  src={HOME_CAMPUS_MEDIA[campus.title.toLowerCase() as CampusId]}
                  alt={`ICAT ${campus.title} campus`}
                />
                <h3>{campus.title}</h3>
                <p>{campus.copy}</p>
                <a href="#footer">View campus</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="alumni">
          <SectionHeading
            eyebrow="Alumni"
            title="Where ICAT graduates work now"
            copy="Alumni work on projects ranging from Hollywood and Indian blockbusters to new-age games, at studios, product companies and consultancies in India and overseas."
          />
          <div className="alumni-grid stagger-grid">
            {ALUMNI_SLIDES[alumniSlide].map((alumnus) => {
              const role = `${alumnus.designation}, ${alumnus.company}`;
              return (
                <article key={`${alumnus.name}-${alumnus.company}`}>
                  <MediaPlaceholder
                    portrait
                    src={alumnus.image || undefined}
                    alt={`${alumnus.name}, ${role}`}
                  />
                  <h3>{alumnus.name}</h3>
                  <p>{role}</p>
                  {alumnus.program && (
                    <p>
                      {alumnus.program}
                      {alumnus.years ? ` (${alumnus.years})` : ''}
                    </p>
                  )}
                  {alumnus.achievement && <p>{alumnus.achievement}</p>}
                </article>
              );
            })}
          </div>
          <div className="slider-controls" aria-label="Alumni slider controls">
            <span>
              {ALUMNI_SLIDES.map((_, idx) =>
                alumniSlide === idx ? <b key={idx} /> : <i key={idx} />
              )}
            </span>
            <div>
              <button
                type="button"
                aria-label="Previous alumni"
                onClick={() =>
                  setAlumniSlide((prev) => (prev - 1 + ALUMNI_SLIDES.length) % ALUMNI_SLIDES.length)
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next alumni"
                onClick={() => setAlumniSlide((prev) => (prev + 1) % ALUMNI_SLIDES.length)}
              >
                →
              </button>
            </div>
          </div>
          <div className="minor-callout reveal">
            <h3>9,500 alumni and counting</h3>
            <p>
              Profiles and testimonials from graduates across animation, visual effects, games,
              design, fashion and interiors.
            </p>
            <ActionButton href="#alumni-testimonials">Read alumni stories</ActionButton>
          </div>
        </section>

        <section className="section container hidden" id="alumni-testimonials" hidden>
          <SectionHeading
            eyebrow="Alumni testimonials"
            title="In our graduates’ own words"
            copy="Hear from ICAT alumni about how studio-first training and portfolio mentorship shaped their careers across leading studios and creative agencies."
          />
          <div className="stagger-grid grid grid-cols-1 gap-6 md:grid-cols-2">
            {alumniTestimonials.map((testimonial) => {
              const initials = testimonial.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? '')
                .join('');

              return (
                <blockquote
                  key={testimonial.name}
                  className="m-0 flex flex-col justify-between gap-6 rounded-xl border border-icat-border bg-icat-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-icat-accent hover:shadow-[0_14px_34px_rgba(16,43,92,0.09)] sm:p-8"
                >
                  <div>
                    <span
                      aria-hidden="true"
                      className="mb-3 block text-3xl leading-none font-semibold text-icat-primary"
                    >
                      &ldquo;
                    </span>
                    <p className="m-0 text-[16px] leading-[1.65] text-icat-text">
                      {testimonial.quote}
                    </p>
                  </div>
                  <footer className="flex items-center gap-3.5 border-t border-icat-border pt-5">
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-icat-light text-xs font-semibold tracking-wide text-icat-primary"
                    >
                      {initials}
                    </span>
                    <div className="flex flex-col">
                      <b className="text-[15px] font-semibold leading-snug text-icat-text">
                        {testimonial.name}
                      </b>
                      <span className="text-[13px] leading-snug text-icat-secondary">
                        {testimonial.program}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </section>

        <CareersMarquee />

        <section className="section container" id="works">
          <SectionHeading
            eyebrow="Student works"
            title="The portfolio is the proof"
            copy="Every programme ends with finished work made to a professional brief. A sample of reels, builds, collections and campaigns from across the disciplines."
          />
          <ActionButton href="#works">Browse student works</ActionButton>
          <div className="work-grid stagger-grid">
            {WORKS.map((work, idx) => (
              <article key={work}>
                <MediaPlaceholder src={WORK_MEDIA[idx]} alt={work} />
                <h3>{work}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section container" id="campus-life">
          <div className="reveal">
            <MediaPlaceholder
              src={SECTION_MEDIA.campusLife}
              alt="ICAT studio workstations and collaborative cohort space"
            />
          </div>
          <div className="reveal">
            <span className="eyebrow">Campus life</span>
            <h2>Studio time, festivals and a cohort you build with</h2>
            <p>
              ICAT&apos;s calendar runs on making: Graduation, Miraki, Kampus 360°, exhibitions,
              workshops, Culturals and Sports, most of it organised by students.
            </p>
            <ul className="check-list">
              <li>Graduation, Culturals and Sports, run by the student body.</li>
              <li>Kampus 360°, the inter-campus festival across all three cities.</li>
              <li>
                Open studio time in the animation, VFX, game, fashion, interior and photography
                labs.
              </li>
            </ul>
            <ActionButton href="#campus-life">Explore campus life</ActionButton>
          </div>
        </section>

        <section className="section container">
          <SectionHeading
            eyebrow="Industry voices"
            title="What industry icons say about ICAT"
            copy="Endorsements from the industries our graduates enter."
          />
          <div className="quotes stagger-grid">
            <blockquote>
              <p>This is the big platform. Where does a project come from? ICAT.</p>
              <footer>
                <b>Mr. Prabhu Solomon</b>
                <span>Director, Indian Film Industry</span>
              </footer>
            </blockquote>
            <blockquote>
              <p>From here you are guided and given an amazing life.</p>
              <footer>
                <b>Mr. Vijay Kapoor</b>
                <span>Managing Director, Derby Clothing</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="section container" id="news">
          <SectionHeading
            eyebrow="Newsroom"
            title="What's happening at ICAT"
            copy="Showcases, festivals, expos and student results from across the three campuses."
          />
          <div className="card-grid stagger-grid">
            {NEWS.map((item, idx) => (
              <article className="media-card news-card" key={item.title}>
                <MediaPlaceholder src={NEWS_MEDIA[idx]} alt={item.title} />
                <span>
                  {['Showcase', 'Festival', 'Expo', 'Expo', 'Campus', 'Achievement'][idx]}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <ActionButton href="#news">All news and events</ActionButton>
        </section>

        <section className="section container" id="admissions">
          <div className="apply-heading reveal">
            <SectionHeading eyebrow="Admissions" title="How to apply" />
            <p>
              Three steps take you from enquiry to provisional admission. The procedure is the same
              for every course and all three campuses.
            </p>
          </div>
          <div className="steps stagger-grid">
            {(
              [
                [
                  '01',
                  'Check your eligibility',
                  "Plus Two or an equivalent qualification for the Bachelor's programmes, or a degree for Master's and PG Professional.",
                ],
                [
                  '02',
                  'Apply online',
                  'Complete the online application, then send your portfolio to the Admissions Department. The portfolio is optional but recommended.',
                ],
                [
                  '03',
                  'Test, interview and admission',
                  'Shortlisted applicants take an online aptitude test and a telephone interview; provisional admission is confirmed once the registration fee is paid.',
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
          <ActionButton dark>Start your application</ActionButton>
        </section>

        <section className="section container faq-section">
          <SectionHeading
            eyebrow="Admissions FAQs"
            title="Questions we get asked most"
            copy="Eligibility, applying before your results, portfolios, campus options and placements. Answered below."
          />
          <div className="faq-list">
            {FAQS.map(([question, answer], idx) => (
              <div className={`faq${openFaq === idx ? ' open' : ''}`} key={question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{question}</span>
                  <i>{openFaq === idx ? '−' : '+'}</i>
                </button>
                <div>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="minor-callout">
            <h3>Can&apos;t find what you need?</h3>
            <p>
              Call the admissions team on +91 95001 28555, or read the full admissions FAQs.
            </p>
            <ActionButton href="#admissions">All admissions FAQs</ActionButton>
          </div>
        </section>

        <section className="final-cta container" id="apply">
          <div className="reveal">
            <span className="eyebrow">Admissions 2026–27</span>
            <h2>
              Your portfolio starts
              <br />
              with one decision
            </h2>
            <p>
              Applications are underway across Chennai, Bengaluru and Hyderabad. If you are not sure
              which programme fits, the admissions team will walk you through the options.
            </p>
            <div className="button-row">
              <ActionButton dark>Apply Now</ActionButton>
              <ActionButton href="#admissions">Talk to a counsellor</ActionButton>
            </div>
          </div>
          <div className="reveal">
            <MediaPlaceholder
              src={SECTION_MEDIA.finalCta}
              alt="ICAT graduate showcase creative portfolio gallery"
            />
          </div>
        </section>
      </main>

      <footer className="footer container" id="footer">
        <div className="footer-grid">
          <div className="footer-address">
            <a href="#" className="logo">
              ICAT
            </a>
            <p>
              <b>Chennai</b>
              <br />
              153, Santhome High Road,
              <br />
              Mylapore, Chennai 600 004
              <br />
              044 4293 4293
            </p>
            <p>
              <b>Bengaluru</b>
              <br />
              424, Bommanahalli, Hosur Main Road,
              <br />
              Bengaluru 560 068
              <br />
              080 4110 7755
            </p>
            <p>
              <b>Hyderabad</b>
              <br />
              Bahadurguda, Saroornagar, L.B. Nagar,
              <br />
              Hyderabad 500 074
              <br />
              040 24477 755
            </p>
          </div>

          <div className="footer-links">
            <FooterLinkGroup title="Animation & Screen">
              <Link to="/programs/animation">Animation</Link>
              <Link to="/programs/visual-effects">Visual Effects</Link>
              <Link to="/programs/visual-media">Visual Media</Link>
              <Link to="/programs/multimedia-and-media-technology">
                Multimedia and Media Technology
              </Link>
            </FooterLinkGroup>
            <FooterLinkGroup title="Admissions & Placements">
              <a href="#admissions">Admissions</a>
              <a href="#admissions">Admission Procedure</a>
              <a href="#alumni">Placements</a>
            </FooterLinkGroup>
          </div>

          <div className="footer-links">
            <FooterLinkGroup title="Games & Design">
              <Link to="/programs/game-art-and-design">Game Art and Design</Link>
              <Link to="/programs/game-design-and-development">Game Development</Link>
              <Link to="/programs/game-programming">Game Programming</Link>
              <Link to="/programs/graphic-design">Graphic Design</Link>
            </FooterLinkGroup>
            <FooterLinkGroup title="The ICAT Legacy">
              <a href="#">About ICAT</a>
              <a href="#alumni">Alumni</a>
              <a href="#works">Student Works</a>
              <a href="#news">Events</a>
            </FooterLinkGroup>
          </div>

          <div className="footer-links">
            <FooterLinkGroup title="Design & Space">
              <Link to="/programs/ui-ux-design">UI / UX Design</Link>
              <Link to="/programs/photography">Photography</Link>
              <Link to="/programs/interior-design">Interior Design</Link>
              <Link to="/programs/fashion-design">Fashion Design</Link>
            </FooterLinkGroup>
          </div>

          <div className="newsletter">
            <b>Get the ICAT newsletter</b>
            <p>Showcase dates, portfolio deadlines and open-day invites from all three campuses.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="copyright">
          <span>ICAT College of Design and Media. All rights reserved.</span>
          <div>
            <a href="#">Refund Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
