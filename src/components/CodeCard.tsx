import { useRef, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import type { ProjectCard } from '../data/types';
import { projectSlides } from '../data/projects';
import ImageCarousel from './ImageCarousel';
import CarouselDots from './CarouselDots';
import { setOriginRect, setOriginOverlayRect } from '../state/expandTransition';

interface CodeCardProps {
  project: ProjectCard;
}

const CodeCard = ({ project }: CodeCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLetter = project.title.charAt(0);
  const restOfTitle = project.title.slice(1);
  const slides = projectSlides(project);
  const [activeIndex, setActiveIndex] = useState(0);
  const carousel = project.carousel;
  const showDots = slides.length > 1 && carousel?.showDots !== false;
  // The home page stays mounted beneath the details overlay; don't keep decoding video behind it.
  const overlayOpen = !!useMatch('/code/:projectId');

  const handleClick = () => {
    if (project.expandable) {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) setOriginRect(rect);
      const overlayRect = overlayRef.current?.getBoundingClientRect();
      if (overlayRect) setOriginOverlayRect(overlayRect);
      navigate(`/code/${project.id}`);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-xl shadow-md flex-shrink-0 w-full h-80 md:h-auto hover:scale-102 transition-all relative overflow-hidden bg-stone-500 ${project.wide ? 'md:w-[72rem] md:aspect-[16/9]' : 'md:w-[52rem] md:aspect-[5/4]'}`}
      role="img"
      aria-label={slides[activeIndex]?.alt || project.title || 'Code project card background image'}
      onClick={handleClick}
    >
      <ImageCarousel
        images={slides}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        autoCycle={carousel?.autoCycle ?? false}
        intervalMs={carousel?.intervalMs ?? 5000}
        playing={!overlayOpen}
      />
      <div
        className={`absolute inset-0 bg-black z-10 ${project.expandable ? 'cursor-pointer' : ''}`}
        style={{ opacity: 0 }}
      />

      <div ref={overlayRef} className="absolute bottom-0 left-0 right-0 z-20 cursor-default">
        {showDots && (
          <CarouselDots count={slides.length} activeIndex={activeIndex} onChange={setActiveIndex} className="absolute bottom-full left-0 right-0 pb-1" />
        )}
        <div className="flex items-stretch">
          <div className="bg-navy/80 pl-8 pr-8 pt-2 pb-1 whitespace-nowrap">
            <h3 className={`text-white leading-none ${project.expandable ? 'cursor-pointer' : ''}`}>
              <span className="major-mono-display-regular tracking-wider text-[2.75rem] md:text-[3.75rem] -mr-1 md:-mr-1.5">{firstLetter}</span>
              <span className="tracking-wide text-[1.75rem] md:text-[2.75rem]">{restOfTitle}</span>
            </h3>
          </div>
          <div className="w-32" style={{ background: 'linear-gradient(to right, rgb(13 20 25 / 0.8) 0%, rgb(13 20 25 / 0.72) 20%, rgb(13 20 25 / 0.5) 45%, rgb(13 20 25 / 0.2) 70%, transparent 100%)' }} />
        </div>
        <div className="bg-navy/80 pl-8 pr-6 pt-3 pb-4">
          <div className="flex items-stretch gap-4 ml-[0.15em]">
            {project.description && (
              <p className={`flex-1 min-w-0 self-center text-white text-sm ${project.expandable ? 'cursor-pointer' : ''}`}>{project.description}</p>
            )}
            {project.link && (
              <div className="flex-shrink-0 flex items-center gap-4">
                {project.description && <span className="w-px h-7 bg-white/30" />}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.linkDisplayText || project.link}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
