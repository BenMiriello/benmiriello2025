import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

interface CodeProjectPageProps {
  projectId: string;
  onClose?: () => void;
}

const CodeProjectPage = ({ projectId, onClose }: CodeProjectPageProps) => {
  const navigate = useNavigate();

  const project = projects.find(p => p.id.toString() === projectId);

  if (!project) {
    navigate('/');
    return null;
  }

  const firstLetter = project.title.charAt(0);
  const restOfTitle = project.title.slice(1);
  const handleClose = onClose ?? (() => navigate('/'));

  return (
    <div className="w-full h-full relative">
      {/* Background layer — animated separately (fades in/out) */}
      <div className="absolute inset-0 bg-stone-800" data-bg />

      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex flex-col">
        {/* Sticky header — slides down on open, up on close */}
        <div data-header className="flex-shrink-0 bg-navy/90 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="cursor-pointer text-white hover:text-orange-300 transition-colors duration-200 flex-shrink-0"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
            <h1 className="text-white leading-none">
              <span className="major-mono-display-regular tracking-wider text-[2rem] -mr-1">{firstLetter}</span>
              <span className="tracking-wide text-[1.5rem]">{restOfTitle}</span>
            </h1>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 flex-shrink-0"
            >
              {project.linkDisplayText || project.link}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Scrollable content — fades + slides up on open, down on close */}
        <div data-content className="flex-1 overflow-y-auto px-8 py-6">
          {project.content && (
            <div className="max-w-4xl mx-auto text-stone-200 leading-relaxed whitespace-pre-wrap">
              {project.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeProjectPage;
