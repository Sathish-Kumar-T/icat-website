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

export const PROGRAMME_MEDIA: Record<string, string> = {
  animation: disciplineAnimationArt,
  'fashion-design': disciplineFashionArt,
  'game-art-and-design': disciplineGameArt,
  'game-design-and-development': disciplineGameDesign,
  'game-programming': disciplineGameProg,
  'graphic-design': disciplineGraphicArt,
  'interior-design': disciplineInteriorArt,
  'multimedia-and-media-technology': disciplineMultimediaArt,
  photography: disciplinePhotoArt,
  'ui-ux-design': disciplineUiUxArt,
  'visual-effects': disciplineVfxArt,
  'visual-media': disciplineVisualMedia,
  'game-technology': disciplineGameTech,
};

export const CAMPUS_MEDIA: Record<CampusId, string> = {
  chennai: '/assets/d94b1.png',
  bengaluru: '/assets/1b87a.png',
  hyderabad: '/assets/e47f5.png',
};

export const EVENT_MEDIA: string[] = [eventGraduateShowcase, eventMirakiFestival];

export const ALUMNI_MEDIA: string[] = [alumniOne, alumniTwo, alumniThree, alumniFour];

export const WORK_MEDIA: string[] = [
  workAnimationReel,
  workVfxBreakdown,
  workGameEnvironment,
  workBrandIdentity,
  workInteriorProject,
  workFashionCollection,
];

export const NEWS_MEDIA: string[] = [
  '/assets/icat-hero-main.jpg',
  eventMirakiFestival,
  newsAnimationExpo,
  newsFashionExpo,
  newsKampusFestival,
  newsVideoEditing,
];

export const SECTION_MEDIA = {
  campusLife: campusStudioLife,
  facilities: studioFacilitiesLab,
  finalCta: finalCtaPortfolio,
} as const;

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
    return gallery[index % gallery.length];
  }
  return PROGRAMME_MEDIA[slug] ?? WORK_MEDIA[index % WORK_MEDIA.length];
}
