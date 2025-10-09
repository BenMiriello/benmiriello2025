interface NavigationProps {
  activeSection: 'code' | 'photos';
  onSectionChange: (section: 'code' | 'photos') => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const buttonBaseClass = "p-2 rounded-md transition-colors duration-200 flex items-center gap-2 cursor-pointer";
  const activeClass = "bg-orange-400 text-stone-900";
  const inactiveClass = "text-amber-50 hover:text-orange-300 hover:bg-stone-800";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSectionChange('code')}
        className={`${buttonBaseClass} ${activeSection === 'code' ? activeClass : inactiveClass}`}
        aria-label="View code projects"
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
          <path d="M16 18l6-6-6-6"/>
          <path d="M8 6l-6 6 6 6"/>
        </svg>
        <span className="text-sm font-medium hidden md:inline">Code</span>
      </button>

      <button
        onClick={() => onSectionChange('photos')}
        className={`${buttonBaseClass} ${activeSection === 'photos' ? activeClass : inactiveClass}`}
        aria-label="View photo collections"
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
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        <span className="text-sm font-medium hidden md:inline">Photos</span>
      </button>
    </div>
  );
};

export default Navigation;