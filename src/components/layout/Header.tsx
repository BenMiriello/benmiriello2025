import { linkedinSvgPath } from '../../svgPaths';
import Navigation from './Navigation';

interface HeaderProps {
  activeSection: 'code' | 'photos';
  onSectionChange: (section: 'code' | 'photos') => void;
  expandedTitle?: string;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  return (
    <div className="w-full bg-stone-900 mt-4 shadow-md flex flex-row items-center">
      <header className="py-4 px-8 pl-12">
        <h1 className="text-orange-400 text-2xl tracking-widest major-mono-display-regular">
          Ben Miriello
        </h1>
      </header>

      <div className="ml-auto flex flex-row items-center gap-4 mr-8">
        <Navigation
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        <div className="text-amber-50 text-xl">|</div>
        <a
          className="text-amber-50"
          target="_blank"
          href='https://linkedin.com/in/benmiriello'
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d={linkedinSvgPath}/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Header;