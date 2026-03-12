import { useNavigate, useParams } from 'react-router-dom';
import { photoCollections } from '../data/photoCollections';
import PhotoLayoutGrid from '../components/photos/PhotoLayoutGrid';
import PhotoLayoutMasonry from '../components/photos/PhotoLayoutMasonry';

const PhotoAlbumPage = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();

  const collection = photoCollections.find(c => c.id === collectionId);

  if (!collection) {
    navigate('/photos');
    return null;
  }

  const getThumbnailSrc = (src: string) => {
    return src.replace('/large/', '/thumbnails/');
  };

  const handlePhotoClick = (photoSrc: string) => {
    const filename = photoSrc.split('/').pop()?.replace(/\.[^/.]+$/, '');
    navigate(`/photos/${collectionId}/${filename}`);
  };

  const handleBack = () => {
    navigate('/photos');
  };

  return (
    <div className="w-full h-full flex flex-col bg-stone-800 rounded-none overflow-y-auto">
      <div className="sticky top-0 bg-stone-800 z-10 p-4 flex items-center justify-center">
        <button
          onClick={handleBack}
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
        <h1 className="text-3xl text-white major-mono-display-regular tracking-wider">
          {collection.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {collection.layout === 'grid' ? (
          <PhotoLayoutGrid
            photos={collection.photos}
            columns={collection.gridColumns || 3}
          />
        ) : collection.layout === 'masonry' ? (
          <PhotoLayoutMasonry
            photos={collection.photos}
          />
        ) : (
          <div className="space-y-6">
            {collection.photos.map((photo) => (
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

        {collection.photos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-400 text-lg">
              Photos coming soon to this collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAlbumPage;
