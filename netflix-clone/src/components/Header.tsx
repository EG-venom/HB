import type React from 'react';
import NetflixLogo from './NetflixLogo';

const Header: React.FC = () => {
  return (
    <header className="absolute w-full flex justify-between items-center px-12 py-6 z-10">
      <NetflixLogo />
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            className="bg-transparent text-white appearance-none border border-white/30 rounded py-1 px-5 pr-8 focus:outline-none"
            defaultValue="English"
          >
            <option value="English" className="text-black">English</option>
            <option value="Spanish" className="text-black">Español</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button className="bg-netflix-red text-white font-medium py-1 px-4 rounded">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
