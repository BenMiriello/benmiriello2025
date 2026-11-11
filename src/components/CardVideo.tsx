import { useEffect, useRef, useState } from 'react';
import type { CardVideo as CardVideoData } from '../data/types';

interface CardVideoProps {
  video: CardVideoData;
  loop: boolean;
  playing: boolean;
  onEnded?: () => void;
  onFail: () => void;
}

const CardVideo = ({ video, loop, playing, onEnded, onFail }: CardVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // preload="none" plus play() gated on visibility means bytes are only fetched while the video is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing && visible) el.play().catch(() => {});
    else el.pause();
  }, [playing, visible]);

  const last = video.sources.length - 1;
  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      poster={video.poster}
      muted
      loop={loop}
      playsInline
      preload="none"
      aria-hidden="true"
      onEnded={onEnded}
      // React propagates <source> errors here, including harmless ones for sources skipped by their media query.
      onError={(e) => { if (e.target === e.currentTarget) onFail(); }}
    >
      {video.sources.map((s, i) => (
        // A media element reports "no playable source" only via an error on its final <source>.
        <source key={s.src} src={s.src} type={s.type} media={s.media} onError={i === last ? onFail : undefined} />
      ))}
    </video>
  );
};

export default CardVideo;
