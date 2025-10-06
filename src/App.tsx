import './index.css'
import { linkedinSvgPath } from './svgPaths';
import grabMeetingCollage from './assets/grabameetingcollage.jpg'
import riddlemethisBG from './assets/riddlemethis-screenshot.png'
import Card, { type CardProps } from './components/Card';

const cards: CardProps[]  = [
  {
    id: 1,
    title: "Riddle Me This",
    description: "Search in riddles, answer in riddles",
    image: riddlemethisBG,
    alt: 'A screenshot of a website containing a riddle from The Hobbit which begins: This thing all things devours...',
    link: 'https://riddlemethis.io',
    linkDisplayText: 'Visit Site'
  },
  {
    id: 2,
    title: "Grab a Meeting",
    description: "An online support group startup",
    image: grabMeetingCollage,
    alt: 'Grab a Meeting site collage'
  },
]

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-stone-800'>
      <div className="w-full bg-stone-900 mt-4 shadow-md flex flex-row items-center">
        <header className="p-8 pl-12">
          <h1 className="text-orange-400 text-2xl tracking-widest major-mono-display-regular">
            Ben Miriello
          </h1>
        </header>

        <div className="ml-auto flex flex-row items-center gap-4 mr-8">
          {/* <button className="text-amber-50">Code Icon</button> */}
          {/* <button className="text-amber-50">Camera Icon</button> */}
          {/* <button className="text-amber-50">Linkedin Link</button> */}
          <a className="text-amber-50" target="_blank" href='https://linkedin.com/in/benmiriello'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
              <path d={linkedinSvgPath}/>
            </svg>
          </a>
          {/* <button className="text-amber-50">Linkedin</button> */}
          {/* Separator then links to other pages. */}
        </div>
      </div>
      <div className='flex-auto overflow-hidden'>
        <div className="h-full flex flex-col md:flex-row items-center md:items-stretch gap-4 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden p-4">
          {cards.map((card) => (
            <Card
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              alt={card.alt}
              link={card.link}
              linkDisplayText={card.linkDisplayText}
            />
          ))}
        </div>
      </div>
      {/* <div className='h-24 mb-4 bg-white'></div> */}
    </div>
  )
}

export default App
