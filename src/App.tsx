import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import PhotoViewerPage from './pages/PhotoViewerPage';
import PhotoAlbumPage from './pages/PhotoAlbumPage';
import CodeProjectPage from './pages/CodeProjectPage';
import type { NavigationSection } from './data/types';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<NavigationSection>('code');

  useEffect(() => {
    if (location.pathname === '/photos' || location.pathname.startsWith('/photos/')) {
      setActiveSection('photos');
    } else if (location.pathname === '/') {
      setActiveSection('code');
    }
  }, [location.pathname]);

  const handleSectionChange = (section: NavigationSection) => {
    setActiveSection(section);
    if (section === 'photos') {
      navigate('/photos');
    } else {
      navigate('/');
    }
  };

  return (  
    <div className="flex flex-col h-screen bg-navy"> 
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 flex flex-col min-h-0">
        <Routes>
          <Route
            path="/"
            element={<HomePage activeSection="code" />}
          />
          <Route
            path="/code/:projectId"
            element={<CodeProjectPage />}
          />
          <Route
            path="/photos"
            element={<HomePage activeSection="photos" />}
          />
          <Route
            path="/photos/:collectionId"
            element={<PhotoAlbumPage />}
          />
          <Route
            path="/photos/:collectionId/:photoId"
            element={<PhotoViewerPage />}
          />
        </Routes>
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

export default App
