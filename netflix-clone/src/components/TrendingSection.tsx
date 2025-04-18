import type React from 'react';
import { useRef } from 'react';

// Mock data for trending movies/shows
const trendingItems = [
  {
    id: 1,
    title: 'Black Mirror',
    imageUrl: 'https://ext.same-assets.com/855227852/748199491.webp',
    rank: 1,
    type: 'TV Show',
    maturityRating: 'TV-MA',
  },
  {
    id: 2,
    title: 'Ransom Canyon',
    imageUrl: 'https://ext.same-assets.com/855227852/3670191895.webp',
    rank: 2,
    type: 'Series',
    maturityRating: 'TV-14',
  },
  {
    id: 3,
    title: 'Love on the Spectrum',
    imageUrl: 'https://ext.same-assets.com/855227852/3043037829.webp',
    rank: 3,
    type: 'Reality TV',
    maturityRating: 'TV-14',
  },
  {
    id: 4,
    title: 'Last Christmas',
    imageUrl: 'https://ext.same-assets.com/855227852/2576979829.webp',
    rank: 4,
    type: 'Movie',
    maturityRating: 'PG-13',
  },
  {
    id: 5,
    title: 'Uglies',
    imageUrl: 'https://ext.same-assets.com/855227852/2012084600.webp',
    rank: 5,
    type: 'Movie',
    maturityRating: 'PG-13',
  },
  {
    id: 6,
    title: 'Arcane',
    imageUrl: 'https://ext.same-assets.com/855227852/3957651369.webp',
    rank: 6,
    type: 'Animated Series',
    maturityRating: 'TV-14',
  },
  {
    id: 7,
    title: 'The Crown',
    imageUrl: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABSEn8cRB1NS5bNmIDJH7MG1iwGEu1V7DOnJ7abrwHNGTQyEBUd4xSwTBWSg9NQwYoUVMmWwBHvfIvoZKMGUU3APYRZdIKwlrkAI.jpg?r=860',
    rank: 7,
    type: 'Historical Drama',
    maturityRating: 'TV-MA',
  },
  {
    id: 8,
    title: 'Stranger Things',
    imageUrl: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABfNrKvs5Q7Xccp6ZBLJOeBs-XA9xnBwpELFHvtgBCw8yiwCIzExr7mU4yUiRAuSE6os15IRwzrRB2EHGKjD0VPNA1BYx9R7bIhI.jpg?r=dec',
    rank: 8,
    type: 'Sci-Fi',
    maturityRating: 'TV-14',
  }
];

// Card component for each movie/show
interface ContentCardProps {
  item: {
    id: number;
    title: string;
    imageUrl: string;
    rank: number;
    type: string;
    maturityRating: string;
  };
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <div className="relative flex-shrink-0 w-[250px] hover:scale-105 transition-transform duration-200 ease-out cursor-pointer group overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 p-2">
            <h3 className="font-bold text-white">{item.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="bg-red-600 text-white px-1">{item.maturityRating}</span>
              <span>{item.type}</span>
            </div>
          </div>
        </div>

        {/* Rank badge */}
        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-[6px] left-[-22px] transform rotate-[-45deg] bg-netflix-red text-white text-xs font-bold py-1 px-8">
            #{item.rank}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main section component
const TrendingSection: React.FC = () => {
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
    <section className="py-12 px-4 bg-netflix-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <span className="text-netflix-red text-5xl leading-none mr-2">N</span>
          Trending Now
        </h2>

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
            className="flex overflow-x-scroll space-x-4 pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingItems.map((item) => (
              <ContentCard key={item.id} item={item} />
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
    </section>
  );
};

export default TrendingSection;
