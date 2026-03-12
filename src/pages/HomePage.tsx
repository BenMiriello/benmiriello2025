import { projects } from '../data/projects';
import { photoCollections } from '../data/photoCollections';
import CodeCard from '../components/CodeCard';
import PhotoCard from '../components/PhotoCard';
import type { NavigationSection } from '../data/types';

interface HomePageProps {
  activeSection: NavigationSection;
}

const HomePage = ({ activeSection }: HomePageProps) => {
  return (
    <div className='flex-auto overflow-hidden'>
      <div className="h-full flex flex-col md:flex-row items-center md:items-stretch gap-4 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden p-4">
        {activeSection === 'code' ? (
          projects.map((project) => (
            <CodeCard key={project.id} project={project} />
          ))
        ) : (
          photoCollections.map((collection) => (
            <PhotoCard key={collection.id} collection={collection} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
