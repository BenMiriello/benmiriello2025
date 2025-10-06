export interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  alt?: string;
  link?: string;
  linkDisplayText?: string;
}

const Card = (props: CardProps) => {
  const { id, image, description, title, alt, link, linkDisplayText } = props;
  return (
    <div
      key={id}
      className="rounded-lg shadow-md flex-shrink-0 w-full h-80 md:w-[52rem] md:h-auto md:aspect-[5/4] relative overflow-hidden bg-stone-500"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      role="img"
      aria-label={alt || title || 'Card background image'}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {(title || description || link) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="text-white flex justify-between items-end">
            <div>
              {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
              {description && <p className="text-sm">{description}</p>}
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium hover:text-blue-300 active:text-blue-400 transition-colors duration-200 flex items-center gap-1 ml-4 flex-shrink-0"
              >
                {linkDisplayText || link}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card;
