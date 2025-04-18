import type React from 'react';

const PreviewBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[80vh] bg-netflix-black">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://occ-0-90-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABfcCR2aFVdDC3nuRRZ3dP3YUwbnC-GPXbVxI4OVcCKTmnF-qhIpLACvRVYL6iEYJ73wJ3Kq7li-Z9NZoQNQppQJKYOAsWE6PN7a3.jpg?r=c68)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-12 max-w-2xl">
        {/* Show logo */}
        <img
          src="https://occ-0-90-92.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABWy-c_WNVepXdYQxFSNbGBXN-Yi9Aqd6ULNtg67TJ-jvbAo7jIgRnLQsO5mNCaUmrv6N2hvwwVe2Cv87bE6d6CXZrWOLswLcNUdpA5RkKLRoZ-c8ROmKLDlMYdyDK7qoSCUdETrSb5zOiZi3CKuT4tXPoxRdIGCkzh_uZVLq0vz2NxOmhj2N.png?r=6c2"
          alt="Stranger Things"
          className="w-80 mb-5"
        />

        {/* Description */}
        <p className="text-white/80 text-lg mb-6 line-clamp-3">
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 hover:bg-white/80 transition font-medium">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button className="bg-gray-500/70 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-500/50 transition font-medium">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>

        {/* Maturity rating */}
        <div className="absolute right-12 bottom-20 flex items-center">
          <span className="border border-white/40 text-white/60 px-1 text-sm">TV-14</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;
