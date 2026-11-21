import type { CampusId } from './programmes';

import disciplineAnimationArt from '../assets/images/discipline_animation_art_1794813807644.jpg';
import disciplineFashionArt from '../assets/images/discipline_fashion_art_1794813808033.jpg';
import disciplineGameArt from '../assets/images/discipline_game_art_1794813808749.jpg';
import disciplineGameDesign from '../assets/images/discipline_game_design_1794813808578.jpg';
import disciplineGameProg from '../assets/images/discipline_game_prog_1794813809552.jpg';
import disciplineGameTech from '../assets/images/discipline_game_tech_1794813813872.jpg';
import disciplineGraphicArt from '../assets/images/discipline_graphic_art_1794813810056.jpg';
import disciplineInteriorArt from '../assets/images/discipline_interior_art_1794813809975.jpg';
import disciplineMultimediaArt from '../assets/images/discipline_multimedia_art_1794813811399.jpg';
import disciplinePhotoArt from '../assets/images/discipline_photo_art_1794813812468.jpg';
import disciplineUiUxArt from '../assets/images/discipline_uiux_art_1794813812129.jpg';
import disciplineVfxArt from '../assets/images/discipline_vfx_art_1794813813007.jpg';
import disciplineVisualMedia from '../assets/images/discipline_visual_media_1794813813222.jpg';

import workAnimationReel from '../assets/images/work_animation_reel_1794813814890.jpg';
import workVfxBreakdown from '../assets/images/work_vfx_breakdown_1794813816120.jpg';
import workGameEnvironment from '../assets/images/work_game_environment_1794813816204.jpg';
import workBrandIdentity from '../assets/images/work_brand_identity_1794813818465.jpg';
import workInteriorProject from '../assets/images/work_interior_project_1794813817718.jpg';
import workFashionCollection from '../assets/images/work_fashion_collection_1794813922708.jpg';

import alumniOne from '../assets/images/alumni_portrait_one_1794813893822.jpg';
import alumniTwo from '../assets/images/alumni_portrait_two_1794813894503.jpg';
import alumniThree from '../assets/images/alumni_portrait_three_1794813818920.jpg';
import alumniFour from '../assets/images/alumni_portrait_four_1794813894631.jpg';

import eventGraduateShowcase from '../assets/images/event_graduate_showcase_1794813894740.jpg';
import eventMirakiFestival from '../assets/images/event_miraki_festival_1794813894818.jpg';
import campusStudioLife from '../assets/images/campus_studio_life_1794813895832.jpg';
import newsAnimationExpo from '../assets/images/news_animation_expo_1794813896501.jpg';
import newsFashionExpo from '../assets/images/news_fashion_expo_1794813896601.jpg';
import newsKampusFestival from '../assets/images/news_kampus_festival_1794813894660.jpg';
import newsVideoEditing from '../assets/images/news_video_editing_1794813897006.jpg';
import studioFacilitiesLab from '../assets/images/studio_facilities_lab_1794813898154.jpg';
import finalCtaPortfolio from '../assets/images/final_cta_portfolio_1794813896758.jpg';
import facilityProductionLab from '../assets/images/facility_production_lab_1795239104568.jpg';
import facilityGreenScreenStage from '../assets/images/facility_green_screen_stage_1795239105189.jpg';
import facilityDesignAtelier from '../assets/images/facility_design_atelier_1795239105870.jpg';
import facilityScreeningCritique from '../assets/images/facility_screening_critique_1795239105328.jpg';

const DEV_MEDIA_VERSION = String(Date.now());

function withMediaVersion(src: string): string {
  if (!import.meta.env.DEV || !src || src.startsWith('data:')) {
    return src;
  }
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}v=${DEV_MEDIA_VERSION}`;
}

export const PROGRAMME_MEDIA: Record<string, string> = {
  animation: withMediaVersion(disciplineAnimationArt),
  'fashion-design': withMediaVersion(disciplineFashionArt),
  'game-art-and-design': withMediaVersion(disciplineGameArt),
  'game-design-and-development': withMediaVersion(disciplineGameDesign),
  'game-programming': withMediaVersion(disciplineGameProg),
  'graphic-design': withMediaVersion(disciplineGraphicArt),
  'interior-design': withMediaVersion(disciplineInteriorArt),
  'multimedia-and-media-technology': withMediaVersion(disciplineMultimediaArt),
  photography: withMediaVersion(disciplinePhotoArt),
  'ui-ux-design': withMediaVersion(disciplineUiUxArt),
  'visual-effects': withMediaVersion(disciplineVfxArt),
  'visual-media': withMediaVersion(disciplineVisualMedia),
  'game-technology': withMediaVersion(disciplineGameTech),
};

export const CAMPUS_MEDIA: Record<CampusId, string> = {
  chennai: withMediaVersion('/assets/d94b1.png'),
  bengaluru: withMediaVersion('/assets/1b87a.png'),
  hyderabad: withMediaVersion('/assets/e47f5.png'),
};

export const EVENT_MEDIA: string[] = [
  withMediaVersion(eventGraduateShowcase),
  withMediaVersion(eventMirakiFestival),
];

export const ALUMNI_MEDIA: string[] = [
  withMediaVersion(alumniOne),
  withMediaVersion(alumniTwo),
  withMediaVersion(alumniThree),
  withMediaVersion(alumniFour),
];

export const WORK_MEDIA: string[] = [
  withMediaVersion(workAnimationReel),
  withMediaVersion(workVfxBreakdown),
  withMediaVersion(workGameEnvironment),
  withMediaVersion(workBrandIdentity),
  withMediaVersion(workInteriorProject),
  withMediaVersion(workFashionCollection),
];

export const NEWS_MEDIA: string[] = [
  withMediaVersion('/assets/icat-hero-main.jpg'),
  withMediaVersion(eventMirakiFestival),
  withMediaVersion(newsAnimationExpo),
  withMediaVersion(newsFashionExpo),
  withMediaVersion(newsKampusFestival),
  withMediaVersion(newsVideoEditing),
];

export const SECTION_MEDIA = {
  campusLife: withMediaVersion(campusStudioLife),
  facilities: withMediaVersion(studioFacilitiesLab),
  finalCta: withMediaVersion(finalCtaPortfolio),
} as const;

export interface FacilityGallerySlide {
  id: string;
  title: string;
  shortLabel: string;
  category: string;
  caption: string;
  src: string;
  alt: string;
}

const DESIGN_ATELIER_FIRST = new Set([
  'fashion-design',
  'interior-design',
  'graphic-design',
  'ui-ux-design',
]);

const STAGE_FIRST = new Set(['photography', 'visual-effects', 'visual-media']);

export function getCampusFacilityGallery(
  campusId: CampusId,
  campusLabel: string,
  programmeSlug: string,
  programmeTitle: string
): FacilityGallerySlide[] {
  const productionLab: FacilityGallerySlide = {
    id: 'production-lab',
    title: 'Production & Workstation Lab',
    shortLabel: 'Workstation Lab',
    category: 'Digital Production',
    caption: `Calibrated dual-display workstations and pen displays configured for ${programmeTitle.toLowerCase()} pipelines and daily studio critiques.`,
    src: withMediaVersion(facilityProductionLab),
    alt: `${campusLabel} campus production and workstation lab with dual monitors and pen displays`,
  };

  const captureStage: FacilityGallerySlide = {
    id: 'capture-stage',
    title: 'Cyclorama & Capture Stage',
    shortLabel: 'Capture Stage',
    category: 'Stage & Lighting',
    caption: `Overhead cinema lighting grid, seamless cyclorama wall and camera rigs for live-action shoots, lighting studies and VFX plates.`,
    src: withMediaVersion(facilityGreenScreenStage),
    alt: `${campusLabel} campus cyclorama production stage with cinema lighting rig and camera setup`,
  };

  const designAtelier: FacilityGallerySlide = {
    id: 'design-atelier',
    title: 'Design & Prototyping Atelier',
    shortLabel: 'Design Atelier',
    category: 'Craft & Materials',
    caption: `Daylit drafting tables, scale modelling bays, material libraries and pin-up walls built for iterative ${programmeTitle.toLowerCase()} exploration.`,
    src: withMediaVersion(facilityDesignAtelier),
    alt: `${campusLabel} campus design atelier with drafting tables, material swatches and critique wall`,
  };

  const screeningRoom: FacilityGallerySlide = {
    id: 'screening-theatre',
    title: 'Screening & Critique Theatre',
    shortLabel: 'Critique Theatre',
    category: 'Review & Showcase',
    caption: `Acoustically treated tiered screening space used for reel reviews, industry masterclasses and Graduate Showcase presentations.`,
    src: withMediaVersion(facilityScreeningCritique),
    alt: `${campusLabel} campus screening room and portfolio critique theatre`,
  };

  const campusSpace: FacilityGallerySlide = {
    id: 'campus-studio-grounds',
    title: `ICAT ${campusLabel} Campus`,
    shortLabel: `${campusLabel} Campus`,
    category: 'Campus Environment',
    caption: `Dedicated studio floors, collaborative cohort areas and open-access labs supporting full-time ${programmeTitle.toLowerCase()} batches in ${campusLabel}.`,
    src: CAMPUS_MEDIA[campusId],
    alt: `ICAT ${campusLabel} campus building and studio environment`,
  };

  if (DESIGN_ATELIER_FIRST.has(programmeSlug)) {
    return [designAtelier, productionLab, captureStage, screeningRoom, campusSpace];
  }
  if (STAGE_FIRST.has(programmeSlug)) {
    return [captureStage, productionLab, screeningRoom, designAtelier, campusSpace];
  }
  return [productionLab, captureStage, designAtelier, screeningRoom, campusSpace];
}

const PROGRAMME_WORK_GALLERIES: Record<string, string[]> = {
  animation: [workAnimationReel, newsAnimationExpo, campusStudioLife],
  'fashion-design': [workFashionCollection, newsFashionExpo, disciplineFashionArt],
  'game-art-and-design': [workGameEnvironment, disciplineGameArt, studioFacilitiesLab],
  'game-design-and-development': [disciplineGameDesign, workGameEnvironment, disciplineGameTech],
  'game-programming': [disciplineGameProg, disciplineGameTech, studioFacilitiesLab],
  'graphic-design': [workBrandIdentity, disciplineGraphicArt, eventGraduateShowcase],
  'interior-design': [workInteriorProject, disciplineInteriorArt, eventGraduateShowcase],
  'multimedia-and-media-technology': [disciplineMultimediaArt, newsVideoEditing, eventMirakiFestival],
  photography: [disciplinePhotoArt, newsFashionExpo, studioFacilitiesLab],
  'ui-ux-design': [disciplineUiUxArt, workBrandIdentity, campusStudioLife],
  'visual-effects': [workVfxBreakdown, disciplineVfxArt, studioFacilitiesLab],
  'visual-media': [disciplineVisualMedia, newsVideoEditing, disciplinePhotoArt],
  'game-technology': [disciplineGameTech, disciplineGameProg, workGameEnvironment],
};

export function getProgrammeWorkMedia(slug: string, index: number): string {
  const gallery = PROGRAMME_WORK_GALLERIES[slug];
  if (gallery && gallery.length > 0) {
    return withMediaVersion(gallery[index % gallery.length]);
  }
  return withMediaVersion(PROGRAMME_MEDIA[slug] ?? WORK_MEDIA[index % WORK_MEDIA.length]);
}
