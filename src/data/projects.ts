import type { ProjectCard } from './types';
import grabMeetingCollage from '../assets/grabameetingcollage.jpg';
import riddlemethisBG from '../assets/riddlemethis-screenshot.png';
import storymarkBG from '../assets/storymark-bg.png';

export const projects: ProjectCard[] = [
  {
    id: 1,
    type: 'project',
    title: "Storymark",
    description: "A declarative site builder",
    image: storymarkBG,
    alt: 'Storymark site screenshot',
    link: 'https://storymark-site.pages.dev/',
    linkDisplayText: 'Visit Site'
  },
  {
    id: 2,
    type: 'project',
    title: "Riddle Me This",
    description: "Search in riddles, answer in riddles",
    image: riddlemethisBG,
    alt: 'A screenshot of a website containing a riddle from The Hobbit which begins: This thing all things devours...',
    link: 'https://riddlemethis.io',
    linkDisplayText: 'Visit Site'
  },
  {
    id: 3,
    type: 'project',
    title: "Grab a Meeting",
    description: "An online support group startup",
    image: grabMeetingCollage,
    alt: 'Grab a Meeting site collage'
  },
];