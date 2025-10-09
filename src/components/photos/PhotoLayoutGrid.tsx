import { useNavigate, useParams } from 'react-router-dom';
import type { Photo } from '../../data/types';

interface PhotoLayoutGridProps {
  photos: Photo[];
  columns?: number;
  className?: string;
}

const PhotoLayoutGrid = ({ photos, columns = 3, className = '' }: PhotoLayoutGridProps) => {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();

  const getThumbnailSrc = (src: string) => {
    return src.replace('/large/', '/thumbnails/');
  };

  const handlePhotoClick = (photo: Photo) => {
    const filename = photo.src.split('/').pop()?.replace(/\.[^/.]+$/, '');
    navigate(`/photos/${collectionId}/${filename}`);
  };

  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {photos.map((photo) => (
        <div key={photo.id} className="w-full cursor-pointer" onClick={() => handlePhotoClick(photo)}>
          <img
            src={getThumbnailSrc(photo.src)}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            style={{
              aspectRatio: photo.aspectRatio || '1',
              objectFit: photo.aspectRatio ? (photo.fitMode === 'fit' ? 'contain' : 'cover') : 'cover'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoLayoutGrid;