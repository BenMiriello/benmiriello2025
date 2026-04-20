import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectCard } from '../data/types';
import { setOriginRect } from '../state/expandTransition';

interface CodeCardProps {
  project: ProjectCard;
}

const CodeCard = ({ project }: CodeCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const firstLetter = project.title.charAt(0);
  const restOfTitle = project.title.slice(1);

  const handleClick = () => {
    if (project.expandable) {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) setOriginRect(rect);
      navigate(`/code/${project.id}`);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-xl shadow-md flex-shrink-0 w-full h-80 md:h-auto hover:scale-102 transition-all relative overflow-hidden bg-stone-500 ${project.wide ? 'md:w-[72rem] md:aspect-[16/9]' : 'md:w-[52rem] md:aspect-[5/4]'} ${project.expandable ? 'cursor-pointer' : ''}`}
      style={{
        backgroundImage: project.image ? `url(${project.image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      role="img"
      aria-label={project.alt || project.title || 'Code project card background image'}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: 0 }}
      ></div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-stretch">
          <div className="bg-navy/80 pl-8 pr-8 pt-2 pb-1 whitespace-nowrap">
            <h3 className="text-white leading-none">
              <span className="major-mono-display-regular tracking-wider text-[2.75rem] md:text-[3.75rem] -mr-1 md:-mr-1.5">{firstLetter}</span>
              <span className="tracking-wide text-[1.75rem] md:text-[2.75rem]">{restOfTitle}</span>
            </h3>
          </div>
          <div className="w-32" style={{ background: 'linear-gradient(to right, rgb(13 20 25 / 0.8) 0%, rgb(13 20 25 / 0.72) 20%, rgb(13 20 25 / 0.5) 45%, rgb(13 20 25 / 0.2) 70%, transparent 100%)' }} />
        </div>
        <div className="bg-navy/80 pl-8 pr-6 pt-3 pb-4">
          <div className="flex items-center gap-4 ml-[0.15em]">
            {project.description && (
              <p className="text-white text-sm">{project.description}</p>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {project.linkDisplayText || project.link}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
