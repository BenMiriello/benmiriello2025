import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { photoCollections } from '../data/photoCollections';

const PhotoViewerPage = () => {
  const navigate = useNavigate();
  const { collectionId, photoId } = useParams<{ collectionId: string; photoId: string }>();

  const collection = photoCollections.find(c => c.id === collectionId);
  if (!collection) {
    navigate('/photos');
    return null;
  }

  const photo = collection.photos.find(p => {
    const filename = p.src.split('/').pop()?.replace(/\.[^/.]+$/, '');
    return filename === photoId;
  });

  if (!photo) {
    navigate(`/photos/${collectionId}`);
    return null;
  }

  const currentIndex = collection.photos.indexOf(photo);
  const hasNext = currentIndex < collection.photos.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      const nextPhoto = collection.photos[currentIndex + 1];
      const filename = nextPhoto.src.split('/').pop()?.replace(/\.[^/.]+$/, '');
      navigate(`/photos/${collectionId}/${filename}`);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      const prevPhoto = collection.photos[currentIndex - 1];
      const filename = prevPhoto.src.split('/').pop()?.replace(/\.[^/.]+$/, '');
      navigate(`/photos/${collectionId}/${filename}`);
    }
  };

  const handleBack = () => {
    navigate(`/photos/${collectionId}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, collectionId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleBack}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleBack();
        }}
        className="absolute top-8 left-8 text-white hover:text-orange-300 transition-colors duration-200 cursor-pointer"
        aria-label="Close photo viewer"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18"/>
          <path d="M6 6l12 12"/>
        </svg>
      </button>

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-8 text-white hover:text-orange-300 transition-colors duration-200 p-1.5 bg-stone-900/30 rounded-full cursor-pointer"
          aria-label="Previous photo"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      <img
        src={photo.src}
        alt={photo.alt}
        className="max-w-full max-h-full object-contain"
        style={{ maxWidth: 'calc(100vw - 4rem)', maxHeight: 'calc(100vh - 4rem)' }}
        onClick={(e) => e.stopPropagation()}
      />

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-8 text-white hover:text-orange-300 transition-colors duration-200 p-1.5 bg-stone-900/30 rounded-full cursor-pointer"
          aria-label="Next photo"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default PhotoViewerPage;
