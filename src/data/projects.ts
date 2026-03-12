import type { ProjectCard } from './types';
import grabMeetingCollage from '../assets/grabameetingcollage.jpg';
import riddlemethisBG from '../assets/riddlemethis-screenshot.png';
import storymarkBG from '../assets/storymark-bg.png';
import narrativeIntelligenceOdyssey2 from '../assets/narrative-intelligence-odyssey-2.png';

export const projects: ProjectCard[] = [
  {
    id: 1,
    type: 'project',
    title: "Narrative Intelligence",
    description: "A platform for narrative analysis with context-aware media generation and graph intelligence.",
    image: narrativeIntelligenceOdyssey2,
    alt: 'A graph of all characters in the Odyssey and their relationships to each other',
    // expandable: true,
    // content: ``
  },
  {
    id: 2,
    type: 'project',
    title: "Grab a Meeting",
    description: "An online support group platform for organizing and hosting meetings",
    image: grabMeetingCollage,
    alt: 'Grab a Meeting site collage',
    expandable: true,
    content: `Grab a Meeting was an online platform designed to connect people for support group meetings.

The platform facilitated scheduling, video conferencing, and community building for various support groups. It aimed to make mental health support more accessible through technology.

The project included features for group discovery, meeting coordination, and secure communication channels.`
  },
  {
    id: 3,
    type: 'project',
    title: "Riddle Me This",
    description: "Search in riddles, answer in riddles, a search engine that won't give straight answers",
    image: riddlemethisBG,
    alt: 'A screenshot of a website containing a riddle from The Hobbit which begins: This thing all things devours...',
    link: 'https://riddlemethis.io',
    linkDisplayText: 'Visit Site',
    expandable: true,
    content: `Riddle Me This is an experimental search engine where queries and results are expressed through riddles.

Instead of traditional keyword searches, users pose questions as riddles and receive answers in the same poetic, puzzle-like format. The project explores creative ways of information retrieval and natural language processing.

Built as an exploration of alternative interfaces for web search and AI-powered content generation.`
  },
  {
    id: 4,
    type: 'project',
    title: "Storymark",
    description: "A declarative site builder to streamline and merge writing and layout design",
    image: storymarkBG,
    alt: 'Storymark site screenshot',
    link: 'https://storymark-site.pages.dev/',
    linkDisplayText: 'Visit Site',
    expandable: true,
    content: `Storymark is a declarative site builder that transforms simple markdown-like syntax into fully functional websites.

Built with modern web technologies, it provides an intuitive way to create and structure web content without dealing with complex frameworks or boilerplate code.

Key features include declarative syntax, component-based architecture, and instant preview capabilities.`
  },
];