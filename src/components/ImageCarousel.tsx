import { useEffect, useRef, useState } from 'react';
import type { CarouselImage } from '../data/types';
import CardVideo from './CardVideo';

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

const shouldPlayVideo = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  !(navigator as NavigatorWithConnection).connection?.saveData;

interface ImageCarouselProps {
  images: CarouselImage[];
  activeIndex: number;
  onChange: (index: number) => void;
  autoCycle: boolean;
  intervalMs: number;
  playing: boolean;
}

const ImageCarousel = ({ images, activeIndex, onChange, autoCycle, intervalMs, playing }: ImageCarouselProps) => {
  const count = images.length;
  const cycles = autoCycle && count > 1;
  const [videoAllowed] = useState(shouldPlayVideo);
  const [failed, setFailed] = useState<ReadonlySet<number>>(() => new Set());
  const isVideo = (index: number) => videoAllowed && !!images[index].video && !failed.has(index);
  const activeIsVideo = isVideo(activeIndex);
  const advance = () => onChange((activeIndex + 1) % count);

  // Video slides advance on their own ended event. Re-arms on every activeIndex change so a manual dot click restarts the full interval.
  useEffect(() => {
    if (!cycles || activeIsVideo) return;
    const id = setTimeout(() => onChange((activeIndex + 1) % count), intervalMs);
    return () => clearTimeout(id);
  }, [cycles, activeIsVideo, count, intervalMs, activeIndex, onChange]);

  // The outgoing slide stays fully opaque beneath the incoming fade so the card background never shows through.
  const currentRef = useRef(activeIndex);
  const previousRef = useRef<number | null>(null);
  if (currentRef.current !== activeIndex) {
    previousRef.current = currentRef.current;
    currentRef.current = activeIndex;
  }
  const previous = previousRef.current;

  // Layers are keyed by slide and stacked with z-index rather than DOM order: moving a <video> node pauses it
  // and a remount would flash the outgoing video's poster instead of its last frame.
  return (
    <>
      {images.map((slide, index) => {
        const active = index === activeIndex;
        if (!active && index !== previous) return null;
        const video = isVideo(index);
        return (
          <div
            key={index}
            className={`absolute inset-0 ${active && previous !== null ? 'carousel-fade-in' : ''}`}
            style={{
              zIndex: active ? 1 : 0,
              backgroundImage: video ? undefined : `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {video && (
              <CardVideo
                video={slide.video!}
                loop={!cycles}
                playing={playing && active}
                onEnded={active && cycles ? advance : undefined}
                onFail={() => setFailed(prev => new Set(prev).add(index))}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default ImageCarousel;
