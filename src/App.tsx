import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useMatch, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import ProjectOverlay from './components/overlay/ProjectOverlay';
import HomePage from './pages/HomePage';
import PhotoViewerPage from './pages/PhotoViewerPage';
import PhotoAlbumPage from './pages/PhotoAlbumPage';
import type { NavigationSection } from './data/types';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const isCodeSection = !location.pathname.startsWith('/photos');
  const codeProjectMatch = useMatch('/code/:projectId');
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
        {codeProjectMatch?.params.projectId && (
          <ProjectOverlay projectId={codeProjectMatch.params.projectId} />
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
