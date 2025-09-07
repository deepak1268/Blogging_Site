import { LinkedIn, Twitter, Github, Copyright, Support } from "./Icons";

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Social Links */}
        <div className="flex gap-4 items-center">
          <a
            href="https://www.linkedin.com/in/deepak-aggarwal-a6622a31a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 p-2 rounded-full"
          >
            <LinkedIn />
          </a>
          <a
            href="https://github.com/deepak1268"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 p-2 rounded-full"
          >
            <Github />
          </a>
          <a
            href="https://x.com/deepakagg2006"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 p-2 rounded-full"
          >
            <Twitter />
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-center">
          <Copyright />
          <p>2025 Chai & Chatter. All rights reserved</p>
        </div>

        {/* Support Email - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Support />
          <a
            href="mailto:chaichatterhelpdesk@yahoo.com"
            className="hover:underline"
          >
            chaichatterhelpdesk@yahoo.com
          </a>
        </div>
      </div>
    </footer>
  );
};
