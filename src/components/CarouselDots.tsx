interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

const CarouselDots = ({ count, activeIndex, onChange, className = '' }: CarouselDotsProps) => (
  <div className={`flex justify-center ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`Show slide ${i + 1} of ${count}`}
        aria-current={i === activeIndex}
        className="group p-2.5 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onChange(i); }}
      >
        <span className={`block w-2.5 h-2.5 rounded-full border border-white/80 shadow transition-colors ${i === activeIndex ? 'bg-white' : 'bg-white/30 group-hover:bg-white/60'}`} />
      </button>
    ))}
  </div>
);

export default CarouselDots;
