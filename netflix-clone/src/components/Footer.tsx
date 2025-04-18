import type React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li className="mb-4">
      <a href={href} className="text-[#b3b3b3] hover:underline">
        {children}
      </a>
    </li>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-14 px-4 bg-netflix-black text-[#b3b3b3]">
      <div className="max-w-6xl mx-auto">
        <p className="mb-6">Questions? Call <a href="tel:1-844-505-2993" className="hover:underline">1-844-505-2993</a></p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ul>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Investor Relations</FooterLink>
            <FooterLink href="#">Ways to Watch</FooterLink>
            <FooterLink href="#">Corporate Information</FooterLink>
            <FooterLink href="#">Only on Netflix</FooterLink>
          </ul>

          <ul>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Jobs</FooterLink>
            <FooterLink href="#">Terms of Use</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </ul>

          <ul>
            <FooterLink href="#">Account</FooterLink>
            <FooterLink href="#">Redeem Gift Cards</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Speed Test</FooterLink>
          </ul>

          <ul>
            <FooterLink href="#">Media Center</FooterLink>
            <FooterLink href="#">Buy Gift Cards</FooterLink>
            <FooterLink href="#">Cookie Preferences</FooterLink>
            <FooterLink href="#">Legal Notices</FooterLink>
          </ul>
        </div>

        <div className="mt-8">
          <div className="relative inline-block mb-6">
            <select className="bg-transparent appearance-none border border-[#333] rounded py-1 px-8 text-white focus:outline-none">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM244 440V337.4h-90.7c3.9 14.2 9.3 27.7 16.2 40.3c6.8 12.6 14.9 23.6 24.3 32.8c9.3 9.2 19.4 16.5 30.4 21.7C235.2 437.5 244 440 244 440zM130.9 203h90.7V72c0 0-8.8 2.5-19.8 7.7C190.9 84.9 180.8 92.2 171.4 101.3c-9.3 9.2-17.4 20.2-24.3 32.8c-6.8 12.6-12.2 26.1-16.2 40.3C130.9 174.4 130.9 203 130.9 203zM382.8 104.2c-9.3-9.2-19.4-16.5-30.4-21.7C341.4 77.4 332.6 75 332.6 75V200H433c-3.9-14.2-9.3-27.7-16.2-40.3C409.9 147.1 401.9 136.1 392.5 127C383.2 117.8 382.8 104.2 382.8 104.2zM334 312v128c0 0 8.8-2.5 19.8-7.7c10.9-5.2 21-12.5 30.4-21.7c9.3-9.2 17.4-20.2 24.3-32.8c6.8-12.6 12.2-26.1 16.2-40.3c0 0 0-25.6 0-25.6H334z" />
              </svg>
            </div>
          </div>

          <p className="text-sm">Netflix Clone</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
