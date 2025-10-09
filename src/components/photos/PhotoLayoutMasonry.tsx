import { useNavigate, useParams } from 'react-router-dom';
import type { Photo } from '../../data/types';

interface PhotoLayoutMasonryProps {
  photos: Photo[];
  columns?: number;
  className?: string;
}

const PhotoLayoutMasonry = ({ photos, columns, className = '' }: PhotoLayoutMasonryProps) => {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const columnCount = columns || 'auto';
  const columnWidth = columns ? 'auto' : '300px';

  const getThumbnailSrc = (src: string) => {
    return src.replace('/large/', '/thumbnails/');
  };

  const handlePhotoClick = (photo: Photo) => {
    const filename = photo.src.split('/').pop()?.replace(/\.[^/.]+$/, '');
    navigate(`/photos/${collectionId}/${filename}`);
  };

  return (
    <div
      className={`${className}`}
      style={{
        columnCount,
        columnWidth,
        columnGap: '1rem',
        columnFill: 'balance'
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="inline-block w-full mb-4 cursor-pointer"
          style={{ breakInside: 'avoid' }}
          onClick={() => handlePhotoClick(photo)}
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
  );
};

export default PhotoLayoutMasonry;