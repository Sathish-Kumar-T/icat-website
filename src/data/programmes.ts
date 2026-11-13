export type QualificationId = 'bachelor' | 'pg' | 'master';
export type CampusId = 'chennai' | 'bengaluru' | 'hyderabad';

export interface QualificationItem {
  id: QualificationId;
  label: string;
}

export interface CampusInfo {
  id: CampusId;
  label: string;
  address: string;
}

export interface ProgrammeOffering {
  title: string;
  campuses: CampusId[];
}

export interface ProgrammeSummary {
  slug: string;
  title: string;
  description: string;
  offerings: Partial<Record<QualificationId, ProgrammeOffering>>;
}

export interface ProgrammeDetail {
  title: string;
  slug: string;
  kicker: string;
  hero: string;
  intro: string;
  craft: string[];
  careers: string[];
  works: string[];
  tools: string[];
}

export const QUALIFICATIONS: QualificationItem[] = [
  { id: 'bachelor', label: "Bachelor's" },
  { id: 'pg', label: 'PG Professional' },
  { id: 'master', label: "Master's" },
];

export const CAMPUSES: Record<CampusId, CampusInfo> = {
  chennai: {
    id: 'chennai',
    label: 'Chennai',
    address: '153, Santhome High Road, Mylapore, Chennai 600 004.',
  },
  bengaluru: {
    id: 'bengaluru',
    label: 'Bengaluru',
    address: '424, Bommanahalli, Hosur Main Road, Bengaluru 560 068.',
  },
  hyderabad: {
    id: 'hyderabad',
    label: 'Hyderabad',
    address: 'Bahadurguda, Saroornagar, L.B. Nagar, Hyderabad 500 074.',
  },
};

export const PROGRAMMES: ProgrammeSummary[] = [
  {
    slug: 'animation',
    title: 'Animation',
    description: '2D and 3D character animation, from core principles to studio pipelines.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Animation",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
      pg: {
        title: 'PG Professional Program in Animation',
        campuses: ['chennai', 'bengaluru'],
      },
    },
  },
  {
    slug: 'fashion-design',
    title: 'Fashion Design',
    description: 'Design, illustration, garment construction and a graduate collection.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Fashion Design",
        campuses: ['chennai', 'bengaluru'],
      },
    },
  },
  {
    slug: 'game-art-and-design',
    title: 'Game Art and Design',
    description: 'Characters, environments and level art built for real-time engines.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Game Art and Design",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'game-design-and-development',
    title: 'Game Design and Development',
    description: 'Systems, level design and playtesting: turning ideas into playable builds.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Game Design and Development",
        campuses: ['chennai', 'bengaluru'],
      },
      pg: {
        title: 'PG Professional Program in Game Design',
        campuses: ['chennai', 'bengaluru'],
      },
    },
  },
  {
    slug: 'game-programming',
    title: 'Game Programming',
    description: 'Gameplay and engine programming, from first script to shipped build.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Game Programming",
        campuses: ['chennai', 'hyderabad'],
      },
      pg: {
        title: 'PG Professional Program in Game Programming',
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    description: 'Brand identity, typography and layout across print and digital.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Graphic Design",
        campuses: ['chennai', 'bengaluru'],
      },
    },
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    description: 'Space planning, materials and detailing for residential and commercial interiors.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Interior Design",
        campuses: ['chennai', 'bengaluru'],
      },
      pg: {
        title: 'PG Professional Program in Interior Design',
        campuses: ['chennai'],
      },
    },
  },
  {
    slug: 'multimedia-and-media-technology',
    title: 'Multimedia',
    description: 'Interactive media, motion, design and the technology behind immersive experiences.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Media Technology (Multimedia)",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
      pg: {
        title: 'PG Professional Program in Multimedia Technologies',
        campuses: ['chennai', 'bengaluru'],
      },
      master: {
        title: "Master's Degree in Multimedia",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'photography',
    title: 'Photography',
    description: 'Studio, editorial and documentary photography, ending in a professional portfolio.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Photography",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'ui-ux-design',
    title: 'UI / UX Design',
    description: 'Interface design, user research and product flows for apps and web.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in UI Design and Development",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
      pg: {
        title: 'PG Professional Program in UI Design and Development',
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'visual-effects',
    title: 'Visual Effects',
    description: 'Compositing, rotoscoping, matchmove and CG integration for film, streaming and advertising.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Visual Effects",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
      pg: {
        title: 'PG Professional Program in Visual Effects',
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
  {
    slug: 'visual-media',
    title: 'Visual Media',
    description: 'Film, video and content production for screens, brands and broadcast.',
    offerings: {
      bachelor: {
        title: "Bachelor's Degree in Visual Media",
        campuses: ['chennai'],
      },
    },
  },
  {
    slug: 'game-technology',
    title: 'Game Technology',
    description: 'Advanced game systems, real-time technology and production for graduate learners.',
    offerings: {
      master: {
        title: "Master's Degree in Game Technology",
        campuses: ['chennai', 'bengaluru', 'hyderabad'],
      },
    },
  },
];

export function isQualification(value: string | null): value is QualificationId {
  return QUALIFICATIONS.some((q) => q.id === value);
}

export function findProgramme(slug: string): ProgrammeSummary | undefined {
  return PROGRAMMES.find((p) => p.slug === slug);
}

export function getProgrammesByLevel(level: QualificationId): ProgrammeSummary[] {
  return PROGRAMMES.filter((p) => Boolean(p.offerings[level]));
}

export function isCampusAvailable(
  programme: ProgrammeSummary,
  level: QualificationId,
  campus: string | null | undefined
): campus is CampusId {
  return Boolean(
    campus &&
      campus in CAMPUSES &&
      programme.offerings[level]?.campuses.includes(campus as CampusId)
  );
}

export const PROGRAM_DETAILS: Record<string, ProgrammeDetail> = {
  animation: {
    title: 'Animation',
    slug: 'animation',
    kicker: 'Build worlds, move characters and tell stories frame by frame',
    hero: 'Bring stories to life through movement, performance and craft.',
    intro:
      'Learn 2D and 3D animation through the way studios work: story, design, performance, production and a showreel built for recruiters.',
    craft: [
      'Visual foundations',
      'Story and storyboard',
      '2D animation',
      '3D production',
      'Compositing',
      'Showreel development',
    ],
    careers: [
      '2D Animator',
      '3D Animator',
      'Character Designer',
      'Storyboard Artist',
      '3D Modeller',
      'Lighting Artist',
      'Rigging Artist',
      'Compositor',
    ],
    works: [
      'Character performance',
      'Animated short film',
      '3D environment',
      'Showreel breakdown',
    ],
    tools: ['Maya', 'Blender', 'Adobe Creative Cloud', 'Toon Boom', 'ZBrush', 'DaVinci Resolve'],
  },
  'visual-effects': {
    title: 'Visual Effects',
    slug: 'visual-effects',
    kicker: 'Build the impossible, shot by shot',
    hero: 'Turn live action and digital craft into one believable frame.',
    intro:
      'Learn the complete VFX pipeline, from matchmove and rotoscoping to compositing, CG integration and final delivery, through production briefs built around real screen workflows.',
    craft: [
      'Visual storytelling',
      'Rotoscopy and paint',
      'Matchmove',
      '3D integration',
      'Compositing',
      'Showreel development',
    ],
    careers: [
      'Compositor',
      'Roto Artist',
      'Matchmove Artist',
      'FX Artist',
      'Lighting Artist',
      'Prep Artist',
      'VFX Editor',
      'Production Coordinator',
    ],
    works: [
      'Compositing breakdown',
      'CG integration',
      'Environment extension',
      'VFX showreel',
    ],
    tools: ['Nuke', 'Maya', 'Houdini', 'After Effects', 'Silhouette', 'DaVinci Resolve'],
  },
  'game-art-and-design': {
    title: 'Game Art and Design',
    slug: 'game-art-and-design',
    kicker: 'Design worlds players want to explore',
    hero: 'Create characters, environments and experiences for real-time worlds.',
    intro:
      'Combine visual design with game thinking. Build production-ready characters, props, environments and levels while learning how art direction serves play.',
    craft: [
      'Drawing for games',
      'Character design',
      'Environment art',
      '3D asset creation',
      'Level art',
      'Portfolio production',
    ],
    careers: [
      'Game Artist',
      'Character Artist',
      'Environment Artist',
      'Concept Artist',
      'Level Artist',
      'Texture Artist',
      'Technical Artist',
      'UI Artist',
    ],
    works: [
      'Character project',
      'Environment build',
      'Level art study',
      'Game art portfolio',
    ],
    tools: ['Unreal Engine', 'Unity', 'Maya', 'Blender', 'ZBrush', 'Substance 3D'],
  },
  'game-design-and-development': {
    title: 'Game Design and Development',
    slug: 'game-design-and-development',
    kicker: 'Turn systems into play',
    hero: 'Design, prototype and build games from first rule to final release.',
    intro:
      'Move between ideas and playable builds. Learn systems design, level design, scripting, user testing and production through team-based game projects.',
    craft: [
      'Game systems',
      'Level design',
      'Rapid prototyping',
      'Gameplay scripting',
      'User testing',
      'Team production',
    ],
    careers: [
      'Game Designer',
      'Level Designer',
      'Systems Designer',
      'Gameplay Designer',
      'Narrative Designer',
      'Technical Designer',
      'Producer',
      'QA Designer',
    ],
    works: [
      'Systems prototype',
      'Playable level',
      'Team game build',
      'Design portfolio',
    ],
    tools: ['Unreal Engine', 'Unity', 'C#', 'Blueprints', 'Blender', 'Figma'],
  },
  'game-programming': {
    title: 'Game Programming',
    slug: 'game-programming',
    kicker: 'Code the systems behind the experience',
    hero: 'Build responsive gameplay, tools and real-time systems.',
    intro:
      'Learn programming through games: gameplay architecture, physics, AI, graphics and engine tools, with every technical idea tested inside a working build.',
    craft: [
      'Programming foundations',
      'Gameplay architecture',
      'Physics systems',
      'Game AI',
      'Graphics programming',
      'Engine tools',
    ],
    careers: [
      'Gameplay Programmer',
      'Engine Programmer',
      'AI Programmer',
      'Graphics Programmer',
      'Tools Programmer',
      'Technical Designer',
      'Mobile Game Developer',
      'QA Engineer',
    ],
    works: [
      'Gameplay system',
      'AI prototype',
      'Engine tool',
      'Technical portfolio',
    ],
    tools: ['C++', 'C#', 'Unreal Engine', 'Unity', 'Git', 'Visual Studio'],
  },
  'game-technology': {
    title: 'Game Technology',
    slug: 'game-technology',
    kicker: 'Advance the technology behind real-time experiences',
    hero: 'Develop advanced game systems, tools and real-time technology.',
    intro:
      'A graduate pathway into game systems, real-time development and advanced production, grounded in substantial technical projects.',
    craft: [
      'Advanced programming',
      'Game architecture',
      'Real-time systems',
      'Game AI',
      'Research practice',
      'Major project',
    ],
    careers: [
      'Gameplay Programmer',
      'Engine Programmer',
      'AI Programmer',
      'Graphics Programmer',
      'Tools Programmer',
      'Technical Designer',
      'Technical Producer',
      'Game Technologist',
    ],
    works: [
      'Advanced gameplay system',
      'AI research prototype',
      'Engine technology project',
      "Master's portfolio",
    ],
    tools: ['C++', 'C#', 'Unreal Engine', 'Unity', 'Git', 'Visual Studio'],
  },
  'graphic-design': {
    title: 'Graphic Design',
    slug: 'graphic-design',
    kicker: 'Make ideas visible',
    hero: 'Shape brands, publications and campaigns with clarity and character.',
    intro:
      'Develop a rigorous visual language through typography, image making, identity, editorial and digital design, with projects framed as real communication problems.',
    craft: [
      'Typography',
      'Image making',
      'Brand identity',
      'Editorial design',
      'Campaign systems',
      'Portfolio direction',
    ],
    careers: [
      'Graphic Designer',
      'Brand Designer',
      'Art Director',
      'Editorial Designer',
      'Packaging Designer',
      'Motion Designer',
      'Visual Designer',
      'Design Strategist',
    ],
    works: [
      'Brand identity',
      'Editorial system',
      'Campaign concept',
      'Design portfolio',
    ],
    tools: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Figma', 'Blender'],
  },
  'ui-ux-design': {
    title: 'UI / UX Design',
    slug: 'ui-ux-design',
    kicker: 'Design digital products around people',
    hero: 'Research, structure and craft experiences that feel effortless.',
    intro:
      'Follow the product design process from user research and information architecture to interaction, prototyping and usability testing.',
    craft: [
      'User research',
      'Information architecture',
      'Interaction design',
      'Interface systems',
      'Prototyping',
      'Usability testing',
    ],
    careers: [
      'UI Designer',
      'UX Designer',
      'Product Designer',
      'Interaction Designer',
      'UX Researcher',
      'Design Systems Designer',
      'Information Architect',
      'Experience Strategist',
    ],
    works: [
      'Mobile product',
      'Responsive platform',
      'Design system',
      'UX case study',
    ],
    tools: ['Figma', 'FigJam', 'Adobe Creative Cloud', 'ProtoPie', 'Maze', 'Webflow'],
  },
  'interior-design': {
    title: 'Interior Design',
    slug: 'interior-design',
    kicker: 'Design spaces people remember',
    hero: 'Turn human needs, material and light into purposeful interiors.',
    intro:
      'Learn space planning, materials, construction and visualisation through residential, retail, hospitality and workplace briefs.',
    craft: [
      'Spatial thinking',
      'Technical drawing',
      'Materials and finishes',
      'Lighting design',
      '3D visualisation',
      'Professional practice',
    ],
    careers: [
      'Interior Designer',
      'Spatial Designer',
      'Retail Designer',
      'Set Designer',
      '3D Visualiser',
      'Lighting Designer',
      'Furniture Designer',
      'Design Consultant',
    ],
    works: [
      'Residential concept',
      'Retail interior',
      'Hospitality project',
      'Spatial portfolio',
    ],
    tools: ['AutoCAD', 'SketchUp', '3ds Max', 'Revit', 'Lumion', 'Photoshop'],
  },
  'fashion-design': {
    title: 'Fashion Design',
    slug: 'fashion-design',
    kicker: 'Build a collection from concept to runway',
    hero: 'Translate culture, material and identity into garments.',
    intro:
      'Move from research and illustration to pattern, construction, styling and a graduate collection, with equal focus on concept and making.',
    craft: [
      'Fashion illustration',
      'Textile exploration',
      'Pattern making',
      'Garment construction',
      'Styling',
      'Graduate collection',
    ],
    careers: [
      'Fashion Designer',
      'Apparel Designer',
      'Textile Designer',
      'Fashion Illustrator',
      'Stylist',
      'Pattern Maker',
      'Visual Merchandiser',
      'Costume Designer',
    ],
    works: [
      'Textile story',
      'Garment project',
      'Editorial styling',
      'Graduate collection',
    ],
    tools: ['Illustrator', 'Photoshop', 'CLO 3D', 'Pattern tools', 'Sewing studio', 'Photography studio'],
  },
  photography: {
    title: 'Photography',
    slug: 'photography',
    kicker: 'Learn to see before you shoot',
    hero: 'Build a visual voice across studio, editorial and documentary work.',
    intro:
      'Master light, composition, production and post through portrait, product, fashion, architecture and documentary assignments.',
    craft: [
      'Camera craft',
      'Studio lighting',
      'Visual narrative',
      'Editorial production',
      'Post-production',
      'Portfolio editing',
    ],
    careers: [
      'Commercial Photographer',
      'Fashion Photographer',
      'Product Photographer',
      'Photo Editor',
      'Retoucher',
      'Documentary Photographer',
      'Studio Manager',
      'Content Producer',
    ],
    works: [
      'Studio portrait',
      'Product campaign',
      'Documentary essay',
      'Photography portfolio',
    ],
    tools: [
      'Professional cameras',
      'Studio lighting',
      'Lightroom',
      'Photoshop',
      'Capture One',
      'DaVinci Resolve',
    ],
  },
  'multimedia-and-media-technology': {
    title: 'Multimedia and Media Technology',
    slug: 'multimedia-and-media-technology',
    kicker: 'Connect creative media with emerging technology',
    hero: 'Build interactive, immersive and multi-platform experiences.',
    intro:
      'Explore the technology behind digital experiences through web, motion, interaction, immersive media and connected production workflows.',
    craft: [
      'Digital foundations',
      'Interactive media',
      'Web experiences',
      'Motion design',
      'Immersive production',
      'Integrated project',
    ],
    careers: [
      'Multimedia Designer',
      'Interactive Developer',
      'Motion Designer',
      'XR Designer',
      'Creative Technologist',
      'Web Designer',
      'Digital Producer',
      'Media Specialist',
    ],
    works: [
      'Interactive story',
      'Immersive prototype',
      'Motion system',
      'Multimedia portfolio',
    ],
    tools: ['Adobe Creative Cloud', 'Figma', 'Blender', 'Unity', 'HTML and CSS', 'Creative coding'],
  },
  'visual-media': {
    title: 'Visual Media',
    slug: 'visual-media',
    kicker: 'Create stories for every screen',
    hero: 'Write, shoot, edit and produce moving-image work with purpose.',
    intro:
      'Learn visual storytelling across film, branded content, documentary and social media, from first treatment through production and post.',
    craft: [
      'Story development',
      'Cinematography',
      'Direction',
      'Production',
      'Editing',
      'Screen portfolio',
    ],
    careers: [
      'Filmmaker',
      'Video Editor',
      'Cinematographer',
      'Assistant Director',
      'Content Producer',
      'Production Designer',
      'Colourist',
      'Creative Producer',
    ],
    works: [
      'Narrative short',
      'Documentary piece',
      'Brand film',
      'Directing portfolio',
    ],
    tools: ['Cinema cameras', 'Lighting and sound', 'Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Pro Tools'],
  },
};
