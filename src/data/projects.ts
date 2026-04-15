import type { ProjectCard } from './types';
import grabMeetingCollage from '../assets/grabameetingcollage.jpg';
import riddlemethisBG from '../assets/riddlemethis-screenshot.png';
import storymarkBG from '../assets/storymark-bg.png';
import narrativeIntelligenceOdyssey2 from '../assets/narrative-intelligence-odyssey-2.png';
import overviewEffectScreenshot from '../assets/overview-effect-screenshot.png';

export const projects: ProjectCard[] = [
  {
    id: 1,
    type: 'project',
    title: "Noetic",
    description: "Narrative intelligence for writers. Reads your manuscript, builds a knowledge graph of characters and events, and lets you navigate the structure through graph, timeline, and editor views.",
    image: narrativeIntelligenceOdyssey2,
    alt: 'A graph of all characters in the Odyssey and their relationships to each other',
    link: 'https://writenoetic.com',
    linkDisplayText: 'Visit Site',
    expandable: true,
    wide: true,
    content: `Noetic is what I'm currently building — a narrative intelligence platform for writers working on complex, long-form, or nonlinear projects.

This is based on my history as a writer and editor, and my experience with AI tools. It's becoming more possible now to work in a creative flow state, letting the AI handle structure and organization. But across large documents this work becomes more difficult quickly. And such tools are just not designed for writing and narrative work. As I explored what was possible, a whole spectrum of opportunities began opening up that I could only explore by building it.

Start by uploading or pasting your text. A narrative analysis pipeline reads it, extracting every character, place, and event, anchoring each mention to an exact position in the text, and building a knowledge graph of how they connect. The model updates as you write.

You view that model through a suite of synchronized views. In the text editor, entity names highlight in contextual colors — each character, place, and event tied to who they are in the graph. Switch to graph view and the same model renders as an interactive force-directed network. The timeline view is based on NLE (non-linear editor) interfaces you'd usually find in a DAW or video editing software. It displays the document or timeline horizontal tracks, showing events in the order they're written or in chronological order. Structures in the document and story are visible through different layers such as positional mentions, a semantic embedding similarity heat map, timelines and character arcs. Character portraits are generated with full awareness of the extracted character attributes — not a generic prompt, but one the system builds from what it's already read.

A graph database, FalkorDB, stores the knowledge graph in three layers — text-grounded entity nodes, a causal DAG with typed edges (CAUSES, ENABLES, PREVENTS, HAPPENS_BEFORE), and a domain relationship taxonomy for narrative-specific analysis. NLP handles extraction. PostgreSQL handles documents and version history. The frontend is React and TypeScript with TipTap for the editor, ReactFlow for graph rendering, and D3 force layout for physics.

The site is in early access currently. The interesting engineering problems have been developing an ontology for narrative modeling that is flexible so as to allow insight and viewing from many different perspectives. Future work includes:
- greater levels of automation and customization
- modular and progressive extraction and udpates
- causal reasoning tools
- ability to directly edit graph entities as a user
- cross-document graph merging and overlays
- a whole lot more`
  },
  {
    id: 0,
    type: 'project',
    title: "Overview Effect",
    description: "Live lightning strikes on a 3D globe, powered by live weather data and physics-based simulations",
    image: overviewEffectScreenshot,
    alt: 'A 3D globe showing Earth from space with real-time lightning strike data',
    link: 'https://overview-effect.io',
    linkDisplayText: 'Visit Site',
    expandable: true,
    content: `Overview Effect is an exploration in learning about how complex natural phenomena actually work by simulating them. The initial focus was on simulating lightning through all phases:
  0. Simulating the moisture, charge, and ionization in the clouds and atmosphere in a live evolving simulation.
  1. Stepped leader: The dim, branching network which searches for a path to the ground, pausing between steps while charge builds. This phase branches extensively because the tip can only "sense" local field conditions, exploring stochastically.
  2. Return stroke: The visible flash. Not current traveling down but a potential wave traveling up from the ground connection point at ~1/3 the speed of light. Orders of magnitude brighter than the leader.
  3. Subsequent strokes / flickering — most flashes are 3–5 strokes. After the first return stroke, a dart leader (continuous, not stepped, 10x faster) reruns the existing channel, triggering another return stroke. The ~40–100ms interstroke interval is what creates the visible flicker.
  4. Fade — Channel cools, glow dims, ionization dissapates, ground and cloud charges recalibrate after making connection.

These strikes play out in real-time lightning strike positions on a 3D globe including:
- Tiled progressive loading of varying levels of ground detail with quick loading, storage and state management for optimized performance.
- Day and night tiles with a gradual terminator line.
- Atmosphere with dusk lighting effect if viewed from the right angle.
- Cloud cover based on real-time cloud data, with shadows and varying heights depending on zoom level.

Live weather simulations display on the globe in different layers including:
- Cloud cover
- Precipitation
- Temperature
- Wind speed and direction
- History replay for all layers when data provides

View the moon close up, with the earth sun and moon all in correct real-time relative positions and lighting.

Stack: React 19, TypeScript, Three.js, @react-three/fiber, react-globe.gl, Vite. Server: Node.js with WebSocket relay.`
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