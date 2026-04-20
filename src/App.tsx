import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect, useRef } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import PhotoViewerPage from './pages/PhotoViewerPage';
import PhotoAlbumPage from './pages/PhotoAlbumPage';
import CodeProjectPage from './pages/CodeProjectPage';
import type { NavigationSection } from './data/types';
import { consumeOriginRect, setOriginRect } from './state/expandTransition';

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
  const originRectRef = useRef<DOMRect | null>(null);
  const flipAnimRef = useRef<Animation | null>(null);
  const childAnimsRef = useRef<Animation[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const originRect = consumeOriginRect();
    if (originRect) originRectRef.current = originRect;

    // Always animate children regardless of whether we have a FLIP origin
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

    // StrictMode cleanup: cancel animations and restore origin rect for second invocation
    return () => {
      flipAnim.cancel();
      childAnims.forEach(a => a.cancel());
      childAnimsRef.current = [];
      if (originRectRef.current) setOriginRect(originRectRef.current);
    };
  }, []);

  const handleClose = () => {
    const panel = panelRef.current;

    // Cancel open animations before starting close
    childAnimsRef.current.forEach(a => a.cancel());
    childAnimsRef.current = [];
    setOverlayVisible(false);

    if (!panel) { navigate('/'); return; }

    animateChildrenClose(panel);

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
