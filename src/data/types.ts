export interface ProjectCard {
  id: number | string;
  type: 'project';
  title: string;
  description: string;
  image: string;
  alt?: string;
  link?: string;
  linkDisplayText?: string;
  expandable?: boolean;
  content?: string;
}

export interface PhotoInput {
  src: string;
  aspectRatio?: number;
  fitMode?: 'crop' | 'fit';
  caption?: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  aspectRatio?: number;
  fitMode?: 'crop' | 'fit';
  caption?: string;
}

export interface PhotoCollectionInput {
  id: string;
  type: 'photo';
  title: string;
  description?: string;
  coverImage: string;
  alt?: string;
  layout?: 'stack' | 'grid' | 'masonry';
  gridColumns?: number;
  photos: PhotoInput[];
}

export interface PhotoCollection {
  id: string;
  type: 'photo';
  title: string;
  description?: string;
  coverImage: string;
  alt?: string;
  layout?: 'stack' | 'grid' | 'masonry';
  gridColumns?: number;
  photos: Photo[];
}

export type Card = ProjectCard | PhotoCollection;

export type NavigationSection = 'code' | 'photos';

export interface PhotoLayoutProps {
  photos: Photo[];
  className?: string;
}