import { projects } from '../data/projects';
import { photoCollections } from '../data/photoCollections';
import CodeCard from '../components/CodeCard';
import PhotoCard from '../components/PhotoCard';
import type { NavigationSection } from '../data/types';

interface HomePageProps {
  activeSection: NavigationSection;
}

const HomePage = ({ activeSection }: HomePageProps) => {
  const items = activeSection === 'code' ? projects : photoCollections;
  const Card = activeSection === 'code' ? CodeCard : PhotoCard;

  return (
    <div className="flex-1 min-h-0">
      <div className="
        h-full flex flex-col gap-6 p-4 overflow-y-auto
        md:flex-row md:items-center md:overflow-x-auto md:overflow-y-hidden
        md:snap-x md:snap-mandatory scroll-smooth
        md:px-[calc(50%-160px)]
      ">
        {items.map((item) => (
          <div key={item.id} className="flex-none md:snap-center">
            {/* @ts-ignore - Dynamic component assignment */}
            <Card {...{ [activeSection === 'code' ? 'project' : 'collection']: item }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
