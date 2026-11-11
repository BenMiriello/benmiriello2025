import { useEffect, useRef } from 'react';
import type { CarouselImage } from '../data/types';

interface ImageCarouselProps {
  images: CarouselImage[];
  activeIndex: number;
  onChange: (index: number) => void;
  autoCycle: boolean;
  intervalMs: number;
}

const ImageCarousel = ({ images, activeIndex, onChange, autoCycle, intervalMs }: ImageCarouselProps) => {
  const count = images.length;

  // Re-arms on every activeIndex change so a manual dot click restarts the full interval.
  useEffect(() => {
    if (!autoCycle || count < 2) return;
    const id = setTimeout(() => onChange((activeIndex + 1) % count), intervalMs);
    return () => clearTimeout(id);
  }, [autoCycle, count, intervalMs, activeIndex, onChange]);

  // The outgoing slide stays fully opaque beneath the incoming fade so the card background never shows through.
  const currentRef = useRef(activeIndex);
  const previousRef = useRef<number | null>(null);
  if (currentRef.current !== activeIndex) {
    previousRef.current = currentRef.current;
    currentRef.current = activeIndex;
  }
  const previous = previousRef.current;

  const layer = (index: number, className: string, key: string) => (
    <div
      key={key}
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url(${images[index].src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );

  return (
    <>
      {previous !== null && previous !== activeIndex && layer(previous, '', `out-${previous}`)}
      {layer(activeIndex, previous === null ? '' : 'carousel-fade-in', `in-${activeIndex}`)}
    </>
  );
};

export default ImageCarousel;
