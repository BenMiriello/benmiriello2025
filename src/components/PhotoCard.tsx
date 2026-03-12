import { useNavigate } from 'react-router-dom';
import type { PhotoCollection } from '../data/types';

interface PhotoCardProps {
  collection: PhotoCollection;
}

const PhotoCard = ({ collection }: PhotoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photos/${collection.id}`);
  };

  return (
    <div
      className="rounded-lg shadow-md flex-shrink-0 w-full h-80 md:w-[52rem] md:h-auto md:aspect-[5/4] relative overflow-hidden bg-stone-500 cursor-pointer"
      style={{
        backgroundImage: collection.coverImage ? `url(${collection.coverImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      role="img"
      aria-label={collection.alt || collection.title || 'Photo collection card background image'}
      onClick={handleClick}
    >
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="text-white">
          {collection.title && (
            <h3 className="text-xl mb-2 major-mono-display-regular tracking-wider">
              {collection.title}
            </h3>
          )}
          {collection.description && (
            <p className="text-sm">{collection.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
