import type React from 'react';
import { useRef } from 'react';

interface ContentItem {
  id: number;
  title: string;
  imageUrl: string;
  type?: string;
  maturityRating?: string;
}

interface CategoryRowProps {
  title: string;
  items: ContentItem[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ title, items }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 750;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 750;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3 pl-4 md:pl-12">{title}</h2>

      <div className="relative group">
        {/* Left scroll button */}
        <button
          onClick={slideLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll space-x-2 px-4 md:px-12 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 w-[180px] md:w-[220px] hover:scale-105 transition-transform duration-200 ease-out cursor-pointer group overflow-hidden"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Hover details */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                  {item.maturityRating && (
                    <div className="flex items-center mt-1 gap-1 text-xs text-gray-300">
                      <span className="bg-red-600 text-white px-1">{item.maturityRating}</span>
                      {item.type && <span>{item.type}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={slideRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;
