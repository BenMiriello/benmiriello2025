import { useNavigate } from 'react-router-dom';
import type { ProjectCard } from '../data/types';

interface CodeCardProps {
  project: ProjectCard;
}

const CodeCard = ({ project }: CodeCardProps) => {
  const navigate = useNavigate();
  const firstLetter = project.title.charAt(0);
  const restOfTitle = project.title.slice(1);

  const handleClick = () => {
    if (project.expandable) {
      navigate(`/code/${project.id}`);
    }
  };

  return (
    <div
      className={`rounded-xl shadow-md flex-shrink-0 w-full h-80 md:w-[52rem] md:h-auto md:aspect-[5/4] hover:scale-102 transition-all  relative overflow-hidden bg-stone-500 ${project.expandable ? 'cursor-pointer' : ''}`}
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
        <div className="bg-stone-950/80 px-8 pb-4 pt-2">
          <h3 className="text-white mb-4 leading-none">
            <span className="major-mono-display-regular tracking-wider text-5xl md:text-7xl -mr-1 md:-mr-1.5">{firstLetter}</span>
            <span className="tracking-wide text-3xl md:text-5xl">{restOfTitle}</span>
          </h3>
          <div className="flex items-center justify-between ml-[0.15em] md:ml-[0.15em]">
            {project.description && (
              <p className="text-white text-sm">{project.description}</p>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 ml-4 flex-shrink-0"
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
