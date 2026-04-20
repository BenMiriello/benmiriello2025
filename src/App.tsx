import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect, useRef } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import PhotoViewerPage from './pages/PhotoViewerPage';
import PhotoAlbumPage from './pages/PhotoAlbumPage';
import CodeProjectPage from './pages/CodeProjectPage';
import type { NavigationSection } from './data/types';
import { consumeOriginRect, setOriginRect, consumeOriginOverlayRect, setOriginOverlayRect } from './state/expandTransition';
import { projects } from './data/projects';

const ANIM_MS = 380;
const CHILD_IN_MS = 240;
const CHILD_OUT_MS = 180;

function animateChildrenOpen(panel: HTMLDivElement): Animation[] {
  const anims: Animation[] = [];
  const header = panel.querySelector<HTMLElement>('[data-header]');
  const content = panel.querySelector<HTMLElement>('[data-content]');
  if (header) anims.push(header.animate(
    [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }],
    { duration: CHILD_IN_MS, easing: 'ease-out', fill: 'both' }
  ));
  if (content) anims.push(content.animate(
    [{ opacity: '0', transform: 'translateY(10px)' }, { opacity: '1', transform: 'translateY(0)' }],
    { duration: CHILD_IN_MS, delay: 80, easing: 'ease-out', fill: 'both' }
  ));
  return anims;
}

function animateChildrenClose(panel: HTMLDivElement): void {
  const header = panel.querySelector<HTMLElement>('[data-header]');
  const content = panel.querySelector<HTMLElement>('[data-content]');
  if (header) header.animate(
    [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
    { duration: CHILD_OUT_MS, easing: 'ease-in', fill: 'forwards' }
  );
  if (content) content.animate(
    [{ opacity: '1', transform: 'translateY(0)' }, { opacity: '0', transform: 'translateY(10px)' }],
    { duration: CHILD_OUT_MS, easing: 'ease-in', fill: 'forwards' }
  );
}

const ProjectOverlay = ({ projectId }: { projectId: string }) => {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const originRectRef = useRef<DOMRect | null>(null);
  const overlayRectRef = useRef<DOMRect | null>(null);
  const flipAnimRef = useRef<Animation | null>(null);
  const ghostAnimRef = useRef<Animation | null>(null);
  const childAnimsRef = useRef<Animation[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const project = projects.find(p => p.id.toString() === projectId);
  const firstLetter = project?.title.charAt(0) ?? '';
  const restOfTitle = project?.title.slice(1) ?? '';

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const ghost = ghostRef.current;
    if (!panel) return;

    const originRect = consumeOriginRect();
    if (originRect) originRectRef.current = originRect;

    const overlayRect = consumeOriginOverlayRect();
    overlayRectRef.current = overlayRect;

    if (ghost && overlayRect) {
      ghost.style.top = overlayRect.top + 'px';
      ghost.style.left = overlayRect.left + 'px';
      ghost.style.width = overlayRect.width + 'px';
      ghost.style.display = 'block';
      ghostAnimRef.current = ghost.animate(
        [{ transform: 'translateY(0)' }, { transform: 'translateY(100vh)' }],
        { duration: ANIM_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      );
    }

    const childAnims = animateChildrenOpen(panel);
    childAnimsRef.current = childAnims;
    setOverlayVisible(true);

    if (!originRect) {
      return () => {
        childAnims.forEach(a => a.cancel());
        childAnimsRef.current = [];
      };
    }

    const panelRect = panel.getBoundingClientRect();
    const scaleX = originRect.width / panelRect.width;
    const scaleY = originRect.height / panelRect.height;
    const dx = (originRect.left + originRect.width / 2) - (panelRect.left + panelRect.width / 2);
    const dy = (originRect.top + originRect.height / 2) - (panelRect.top + panelRect.height / 2);

    const flipAnim = panel.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, transformOrigin: 'center center' },
      { transform: 'translate(0px, 0px) scale(1, 1)', transformOrigin: 'center center' },
    ], { duration: ANIM_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });

    flipAnimRef.current = flipAnim;

    // StrictMode cleanup: cancel animations and restore state for second invocation
    return () => {
      flipAnim.cancel();
      childAnims.forEach(a => a.cancel());
      childAnimsRef.current = [];
      ghostAnimRef.current?.cancel();
      ghostAnimRef.current = null;
      if (originRectRef.current) setOriginRect(originRectRef.current);
      if (overlayRectRef.current) setOriginOverlayRect(overlayRectRef.current);
    };
  }, []);

  const handleClose = () => {
    const panel = panelRef.current;
    const ghost = ghostRef.current;

    childAnimsRef.current.forEach(a => a.cancel());
    childAnimsRef.current = [];
    setOverlayVisible(false);

    if (!panel) { navigate('/'); return; }

    animateChildrenClose(panel);

    if (ghost && overlayRectRef.current) {
      ghost.style.display = 'block';
      ghostAnimRef.current?.cancel();
      ghostAnimRef.current = ghost.animate(
        [{ transform: 'translateY(100vh)' }, { transform: 'translateY(0)' }],
        { duration: ANIM_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      );
    }

    const flipAnim = flipAnimRef.current;
    if (!flipAnim) {
      setTimeout(() => navigate('/'), CHILD_OUT_MS);
      return;
    }

    flipAnim.onfinish = null;
    flipAnim.reverse();
    flipAnim.onfinish = () => navigate('/');
  };

  return (
    <>
      <div
        className="absolute inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: overlayVisible ? 1 : 0 }}
        onClick={handleClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-4 z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl"
      >
        <CodeProjectPage projectId={projectId} onClose={handleClose} />
      </div>
      {/* Ghost card bottom bar — position:fixed, slides out of viewport on open, back on close */}
      <div
        ref={ghostRef}
        style={{ display: 'none', position: 'fixed', pointerEvents: 'none', zIndex: 60 }}
      >
        <div>
          <div className="flex items-stretch">
            <div className="bg-navy/80 pl-8 pr-8 pt-2 pb-1 whitespace-nowrap">
              <h3 className="text-white leading-none">
                <span className="major-mono-display-regular tracking-wider text-[2.75rem] md:text-[3.75rem] -mr-1 md:-mr-1.5">{firstLetter}</span>
                <span className="tracking-wide text-[1.75rem] md:text-[2.75rem]">{restOfTitle}</span>
              </h3>
            </div>
            <div className="w-32" style={{ background: 'linear-gradient(to right, rgb(13 20 25 / 0.8) 0%, rgb(13 20 25 / 0.72) 20%, rgb(13 20 25 / 0.5) 45%, rgb(13 20 25 / 0.2) 70%, transparent 100%)' }} />
          </div>
          {project?.description && (
            <div className="bg-navy/80 pl-8 pr-6 pt-3 pb-4">
              <p className="text-white text-sm ml-[0.15em]">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const isCodeSection = !location.pathname.startsWith('/photos');
  const isCodeProject = location.pathname.startsWith('/code/');
  const activeSection: NavigationSection = isCodeSection ? 'code' : 'photos';

  const handleSectionChange = (section: NavigationSection) => {
    navigate(section === 'photos' ? '/photos' : '/');
  };

  return (
    <div className="flex flex-col h-screen bg-navy">
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="relative flex-1 min-h-0 flex flex-col">
        {isCodeSection && (
          <div className="absolute inset-0 flex flex-col">
            <HomePage activeSection="code" />
          </div>
        )}
        <Routes>
          <Route path="/photos" element={<HomePage activeSection="photos" />} />
          <Route path="/photos/:collectionId" element={<PhotoAlbumPage />} />
          <Route path="/photos/:collectionId/:photoId" element={<PhotoViewerPage />} />
        </Routes>
        {isCodeProject && (
          <ProjectOverlay projectId={location.pathname.replace('/code/', '')} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
