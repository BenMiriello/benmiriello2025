interface GhostTitleBarProps {
  title: string;
  description?: string;
}

const NAME_FADE_GRADIENT =
  'linear-gradient(to right, rgb(13 20 25 / 0.8) 0%, rgb(13 20 25 / 0.72) 20%, rgb(13 20 25 / 0.5) 45%, rgb(13 20 25 / 0.2) 70%, transparent 100%)';

const GhostTitleBar = ({ title, description }: GhostTitleBarProps) => (
  <div>
    <div className="flex items-stretch">
      <div className="bg-navy/80 pl-8 pr-8 pt-2 pb-1 whitespace-nowrap">
        <h3 className="text-white leading-none">
          <span className="major-mono-display-regular tracking-wider text-[2.75rem] md:text-[3.75rem] -mr-1 md:-mr-1.5">{title.charAt(0)}</span>
          <span className="tracking-wide text-[1.75rem] md:text-[2.75rem]">{title.slice(1)}</span>
        </h3>
      </div>
      <div className="w-32" style={{ background: NAME_FADE_GRADIENT }} />
    </div>
    {description && (
      <div className="bg-navy/80 pl-8 pr-6 pt-3 pb-4">
        <p className="text-white text-sm ml-[0.15em]">{description}</p>
      </div>
    )}
  </div>
);

export default GhostTitleBar;
