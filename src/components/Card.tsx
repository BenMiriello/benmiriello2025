import { useNavigate, useParams } from 'react-router-dom';
import type { PhotoCollection } from '../data/types';
import PhotoLayoutGrid from './photos/PhotoLayoutGrid';
import PhotoLayoutMasonry from './photos/PhotoLayoutMasonry';

export interface CardProps {
  id: number | string;
  image: string;
  title: string;
  description?: string;
  alt?: string;
  link?: string;
  linkDisplayText?: string;
  isExpanded?: boolean;
  photoCollection?: PhotoCollection;
  onBackClick?: () => void;
}

const Card = (props: CardProps) => {
  const {
    id,
    image,
    description,
    title,
    alt,
    link,
    linkDisplayText,
    isExpanded = false,
    photoCollection,
    onBackClick
  } = props;

  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();

  const getThumbnailSrc = (src: string) => {
    return src.replace('/large/', '/thumbnails/');
  };

  const handlePhotoClick = (photoSrc: string) => {
    const filename = photoSrc.split('/').pop()?.replace(/\.[^/.]+$/, '');
    navigate(`/photos/${collectionId}/${filename}`);
  };

  const containerClasses = isExpanded
    ? "w-full h-full flex flex-col bg-stone-800 rounded-none overflow-y-auto"
    : "rounded-lg shadow-md flex-shrink-0 w-full h-80 md:w-[52rem] md:h-auto md:aspect-[5/4] relative overflow-hidden bg-stone-500";

  return (
    <div
      key={id}
      className={containerClasses}
      style={{
        backgroundImage: !isExpanded && image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      role="img"
      aria-label={alt || title || 'Card background image'}
    >
      {!photoCollection && !isExpanded && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: 0.6 }}
        ></div>
      )}

      {isExpanded && onBackClick && (
        <div className="sticky top-0 bg-stone-800 z-10 p-4 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBackClick();
            }}
            className="absolute left-8 text-white hover:text-orange-300 transition-colors duration-200 cursor-pointer"
            aria-label="Back to photo collections"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5"/>
              <path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-3xl text-white major-mono-display-regular tracking-wider">{title}</h1>
        </div>
      )}

      <div className={isExpanded
        ? "flex-1 overflow-y-auto px-4 pb-8"
        : "absolute bottom-0 left-0 right-0 p-6 z-10"
      }>
        {isExpanded ? (
          <div>

            {photoCollection && (
              <div>
                {photoCollection.layout === 'grid' ? (
                  <PhotoLayoutGrid
                    photos={photoCollection.photos}
                    columns={photoCollection.gridColumns || 3}
                  />
                ) : photoCollection.layout === 'masonry' ? (
                  <PhotoLayoutMasonry
                    photos={photoCollection.photos}
                  />
                ) : (
                  <div className="space-y-6">
                    {photoCollection.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="w-full cursor-pointer"
                        onClick={() => handlePhotoClick(photo.src)}
                      >
                        <img
                          src={getThumbnailSrc(photo.src)}
                          alt={photo.alt}
                          loading="lazy"
                          className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                          style={{
                            aspectRatio: photo.aspectRatio || 'auto',
                            objectFit: photo.aspectRatio ? (photo.fitMode === 'fit' ? 'contain' : 'cover') : 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {photoCollection && photoCollection.photos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-stone-400 text-lg">
                  Photos coming soon to this collection.
                </p>
              </div>
            )}
          </div>
        ) : (
          (title || description || link) && (
            <div className="text-white flex justify-between items-end">
              <div>
                {title && <h3 className="text-xl mb-2 major-mono-display-regular tracking-wider">{title}</h3>}
                {description && <p className="text-sm">{description}</p>}
              </div>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 flex items-center gap-1 ml-4 flex-shrink-0 mb-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkDisplayText || link}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Card;
