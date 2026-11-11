import { useEffect, useRef, useState } from 'react';
import type { CardVideo as CardVideoData } from '../data/types';

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

const shouldPlayVideo = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  !(navigator as NavigatorWithConnection).connection?.saveData;

interface CardVideoProps {
  video: CardVideoData;
}

// Renders nothing when video is unwanted or unplayable, leaving the card's background image as the fallback.
const CardVideo = ({ video }: CardVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled] = useState(shouldPlayVideo);
  const [failed, setFailed] = useState(false);

  // preload="none" plus viewport-driven play() means bytes are only fetched while the card is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, failed]);

  if (!enabled || failed) return null;

  const last = video.sources.length - 1;
  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      poster={video.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      // React propagates <source> errors here, including harmless ones for sources skipped by their media query.
      onError={(e) => { if (e.target === e.currentTarget) setFailed(true); }}
    >
      {video.sources.map((s, i) => (
        // A media element reports "no playable source" only via an error on its final <source>.
        <source key={s.src} src={s.src} type={s.type} media={s.media} onError={i === last ? () => setFailed(true) : undefined} />
      ))}
    </video>
  );
};

export default CardVideo;
