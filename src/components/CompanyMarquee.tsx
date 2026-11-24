import './CompanyMarquee.css';

type Recruiter = {
  name: string;
  slug: string;
};

const recruiters: Recruiter[] = [
  { name: 'Accenture', slug: 'accenture' },
  { name: 'Electronic Arts', slug: 'ea' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Rockstar Games', slug: 'rockstargames' },
  { name: 'Amazon', slug: 'amazon' },
  { name: 'Cognizant', slug: 'cognizant' },
  { name: 'Deloitte', slug: 'deloitte' },
  { name: 'HCLTech', slug: 'hcl' },
  { name: 'NVIDIA', slug: 'nvidia' },
  { name: 'Wipro', slug: 'wipro' },
  { name: 'Freshworks', slug: 'freshworks' },
  { name: 'Oracle', slug: 'oracle' },
  { name: 'KPMG', slug: 'kpmg' },
  { name: 'OPPO', slug: 'oppo' },
  { name: 'Zynga', slug: 'zynga' },
];

function RecruiterGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={`icat-recruiter-marquee__group${duplicate ? " icat-recruiter-marquee__group--duplicate" : ""}`} aria-hidden={duplicate || undefined}>
      {recruiters.map((company) => (
        <div className="icat-recruiter-logo" key={company.name}>
          <img
            className="icat-recruiter-logo__mark"
            src={`https://cdn.simpleicons.org/${company.slug}?viewbox=auto`}
            alt={duplicate ? '' : `${company.name} logo`}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              // Keep the company name visible if a brand mark is unavailable.
              event.currentTarget.hidden = true;
            }}
          />
          <span className="icat-recruiter-logo__name">{company.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function CompanyMarquee() {
  return (
    <section className="icat-recruiters" aria-labelledby="icat-recruiters-title">
      <div className="icat-recruiters__intro">
        <span className="icat-recruiters__eyebrow">INDUSTRY CONNECTIONS</span>
        <h2 id="icat-recruiters-title">Where ICAT Graduates Work</h2>
        <p>
          From creative studios to global technology companies, our graduates
          take their skills into the industries shaping tomorrow.
        </p>
      </div>

      <div className="icat-recruiter-marquee">
        <div className="icat-recruiter-marquee__track">
          <RecruiterGroup />
          <RecruiterGroup duplicate />
        </div>
      </div>

      <div className="icat-recruiters__footer">
        <span>Selected companies from ICAT&apos;s published recruiter list</span>
        <a
          href="https://www.icat.ac.in/frequent-recruiters.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore all recruiters <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
