import type { PhotoCollection, PhotoCollectionInput, Photo } from './types';

function processPhotoCollection(input: PhotoCollectionInput): PhotoCollection {
  return {
    ...input,
    photos: input.photos.map((photo): Photo => {
      const filename = photo.src.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      return {
        id: `${input.id}-${filename}`,
        src: photo.src,
        alt: `${input.title} - ${filename}`,
        aspectRatio: photo.aspectRatio,
        fitMode: photo.fitMode,
        caption: photo.caption
      };
    })
  };
}

const photoCollectionsInput: PhotoCollectionInput[] = [
  {
    id: 'alps',
    layout: 'masonry',
    type: 'photo',
    title: 'Alps',
    coverImage: '/photos/alps/large/IMG_6770.jpg',
    alt: 'Alps photography collection cover',
    photos: [
      { src: '/photos/alps/large/IMG_0206.jpg' },
      { src: '/photos/alps/large/IMG_0230.jpg' },
      { src: '/photos/alps/large/IMG_5513.jpg' },
      { src: '/photos/alps/large/IMG_5564.jpg' },
      { src: '/photos/alps/large/IMG_5651.jpg' },
      { src: '/photos/alps/large/IMG_5659.jpg' },
      { src: '/photos/alps/large/IMG_5678-2.jpg' },
      { src: '/photos/alps/large/IMG_5689.jpg' },
      { src: '/photos/alps/large/IMG_5770.jpg' },
      { src: '/photos/alps/large/IMG_5773.jpg' },
      { src: '/photos/alps/large/IMG_6101.jpg' },
      { src: '/photos/alps/large/IMG_6128.jpg' },
      { src: '/photos/alps/large/IMG_6178.jpg' },
      { src: '/photos/alps/large/IMG_6257.jpg' },
      { src: '/photos/alps/large/IMG_6340.jpg' },
      { src: '/photos/alps/large/IMG_6506.jpg' },
      { src: '/photos/alps/large/IMG_6790.jpg' },
      { src: '/photos/alps/large/IMG_6636.jpg' },
      { src: '/photos/alps/large/IMG_6701.jpg' },
      { src: '/photos/alps/large/IMG_6744.jpg' },
      { src: '/photos/alps/large/IMG_6748.jpg' },
      { src: '/photos/alps/large/IMG_6770.jpg' },
      { src: '/photos/alps/large/IMG_6781.jpg' },
      { src: '/photos/alps/large/IMG_6785.jpg' },
      { src: '/photos/alps/large/IMG_6825.jpg' },
      { src: '/photos/alps/large/IMG_6828.jpg' },
      { src: '/photos/alps/large/IMG_6855.jpg' },
      { src: '/photos/alps/large/IMG_6860.jpg' },
      { src: '/photos/alps/large/IMG_6990.jpg' },
      { src: '/photos/alps/large/IMG_7003.jpg' },
      { src: '/photos/alps/large/IMG_7029.jpg' },
      { src: '/photos/alps/large/IMG_7341.jpg' },
      { src: '/photos/alps/large/IMG_7343.jpg' },
      { src: '/photos/alps/large/IMG_7416.jpg' },
      { src: '/photos/alps/large/IMG_7451.jpg' },
      { src: '/photos/alps/large/IMG_7464.jpg' }
    ]
  },
  {
    id: 'desert',
    layout: 'masonry',
    type: 'photo',
    title: 'Desert',
    coverImage: '/photos/desert/large/003.jpg',
    alt: 'Desert photography collection cover',
    photos: [
      { src: '/photos/desert/large/001.jpg' },
      { src: '/photos/desert/large/002.jpg' },
      { src: '/photos/desert/large/003.jpg' },
      { src: '/photos/desert/large/004.jpg' },
      { src: '/photos/desert/large/005.jpg' },
      { src: '/photos/desert/large/006.jpg' },
      { src: '/photos/desert/large/012.jpg' },
      { src: '/photos/desert/large/007.jpg' },
      { src: '/photos/desert/large/008.jpg' },
      { src: '/photos/desert/large/010.jpg' },
      { src: '/photos/desert/large/011.jpg' },
      { src: '/photos/desert/large/014.jpg' },
      { src: '/photos/desert/large/016.jpg' }
    ]
  },
  {
    id: 'rome',
    layout: 'masonry',
    type: 'photo',
    title: 'Rome',
    coverImage: '/photos/rome/large/004.jpg',
    alt: 'Rome photography collection cover',
    photos: [
      { src: '/photos/rome/large/001.jpg' },
      { src: '/photos/rome/large/002.jpg' },
      { src: '/photos/rome/large/003.jpg' },
      { src: '/photos/rome/large/004.jpg' },
      { src: '/photos/rome/large/005.jpg' },
      { src: '/photos/rome/large/006.jpg' },
      { src: '/photos/rome/large/007.jpg' }
    ]
  },
]

export const photoCollections: PhotoCollection[] = photoCollectionsInput.map(processPhotoCollection);
