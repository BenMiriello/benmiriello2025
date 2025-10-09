import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { photoCollections } from '../data/photoCollections';
import Card from '../components/Card';
import type { NavigationSection } from '../data/types';

interface HomePageProps {
  activeSection: NavigationSection;
}

const HomePage = ({ activeSection }: HomePageProps) => {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(collectionId || null);

  const cards = activeSection === 'code' ? projects : photoCollections;

  useEffect(() => {
    if (collectionId) {
      setExpandedCardId(collectionId);
    } else {
      setExpandedCardId(null);
    }
  }, [collectionId]);

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.type === 'photo') {
      setExpandedCardId(card.id);
      navigate(`/photos/${card.id}`);
    }
  };

  const handleBackClick = () => {
    setExpandedCardId(null);
    navigate('/photos');
  };

  if (expandedCardId) {
    const expandedCollection = photoCollections.find(c => c.id === expandedCardId);
    if (expandedCollection) {
      return (
        <Card
          id={expandedCollection.id}
          title={expandedCollection.title}
          description={expandedCollection.description}
          image={expandedCollection.coverImage}
          alt={expandedCollection.alt}
          isExpanded={true}
          photoCollection={expandedCollection}
          onBackClick={handleBackClick}
        />
      );
    }
  }

  return (
    <div className='flex-auto overflow-hidden'>
      <div className="h-full flex flex-col md:flex-row items-center md:items-stretch gap-4 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`flex-shrink-0 w-full h-80 md:w-[52rem] md:h-auto md:aspect-[5/4] ${card.type === 'photo' ? 'cursor-pointer' : ''}`}
          >
            <Card
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.type === 'project' ? card.image : card.coverImage}
              alt={card.alt}
              link={card.type === 'project' ? card.link : undefined}
              linkDisplayText={card.type === 'project' ? card.linkDisplayText : undefined}
              photoCollection={card.type === 'photo' ? card : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
