import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

const CodeProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const project = projects.find(p => p.id.toString() === projectId);

  if (!project) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-full flex flex-col bg-stone-800">
      <div className="sticky top-0 bg-stone-800 z-10 p-4 flex items-center justify-center">
        <button
          onClick={handleBack}
          className="absolute left-8 text-white hover:text-orange-300 transition-colors duration-200 cursor-pointer"
          aria-label="Back to projects"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className="text-3xl text-white major-mono-display-regular tracking-wider">
          {project.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {project.content && (
          <div className="max-w-4xl mx-auto">
            <div className="text-stone-200 leading-relaxed whitespace-pre-wrap">
              {project.content}
            </div>
          </div>
        )}

        {project.link && (
          <div className="max-w-4xl mx-auto mt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-lg font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200"
            >
              {project.linkDisplayText || 'Visit Project'}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeProjectPage;
