import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import PhotoViewerPage from './pages/PhotoViewerPage';
import { photoCollections } from './data/photoCollections';
import type { NavigationSection } from './data/types';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<NavigationSection>('code');
  const [expandedTitle, setExpandedTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (location.pathname === '/photos' || location.pathname.startsWith('/photos/')) {
      setActiveSection('photos');
      const collectionId = location.pathname.split('/photos/')[1];
      if (collectionId) {
        const collection = photoCollections.find(c => c.id === collectionId);
        setExpandedTitle(collection?.title);
      } else {
        setExpandedTitle(undefined);
      }
    } else if (location.pathname === '/') {
      setActiveSection('code');
      setExpandedTitle(undefined);
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
    <div className='min-h-screen flex flex-col bg-stone-800'>
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage activeSection="code" />}
        />
        <Route
          path="/photos"
          element={<HomePage activeSection="photos" />}
        />
        <Route
          path="/photos/:collectionId"
          element={<HomePage activeSection="photos" />}
        />
        <Route
          path="/photos/:collectionId/:photoId"
          element={<PhotoViewerPage />}
        />
      </Routes>
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
