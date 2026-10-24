import { useNavigate } from 'react-router-dom';
import CodeProjectPage from '../../pages/CodeProjectPage';
import { projects } from '../../data/projects';
import { useExpandAnimation } from '../../hooks/useExpandAnimation';
import GhostTitleBar from './GhostTitleBar';

const ProjectOverlay = ({ projectId }: { projectId: string }) => {
  const navigate = useNavigate();
  const { panelRef, ghostRef, overlayVisible, close } = useExpandAnimation(() => navigate('/'));
  const project = projects.find(p => p.id.toString() === projectId);

  return (
    <>
      <div
        className="absolute inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: overlayVisible ? 1 : 0 }}
        onClick={close}
      />
      <div
        ref={panelRef}
        className="absolute inset-4 z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl"
      >
        <CodeProjectPage projectId={projectId} onClose={close} />
      </div>
      {/* Mirrors the card's bottom bar: fixed so it can slide out of the viewport independently of the panel */}
      <div
        ref={ghostRef}
        style={{ display: 'none', position: 'fixed', pointerEvents: 'none', zIndex: 60 }}
      >
        {project && <GhostTitleBar title={project.title} description={project.description} />}
      </div>
    </>
  );
};

export default ProjectOverlay;
