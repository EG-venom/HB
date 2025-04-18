import type React from "react";
import { useState } from "react";

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url(https://ext.same-assets.com/855227852/1044820167.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-5">
          Starts at $7.99. Cancel anytime.
        </p>
        <p className="text-lg md:text-xl mb-6">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email form */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full md:w-auto md:flex-grow max-w-md">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-4 bg-black/40 border border-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="w-full md:w-auto bg-netflix-red hover:bg-[#f40612] text-white font-medium text-xl px-8 py-3 rounded flex items-center justify-center">
            Get Started
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                d="M8.5 5L15.5 12L8.5 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
