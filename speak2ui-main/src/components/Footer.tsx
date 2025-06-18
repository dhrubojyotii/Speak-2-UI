
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Made with</span>
          {/* <span className="text-red-500">❤️</span> */}
          <span className="text-sm text-muted-foreground">by</span>
          <span className="font-semibold bg-gradient-to-r from-speak-purple to-speak-teal via-speak-purple-light bg-clip-text text-transparent">
            Dhrubojyoti Saha
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/dhrubojyotii" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={18} />
          </a>
          <a href="https://x.com/dhrubojyotiii" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter size={18} />
          </a>
          <a href="https://www.linkedin.com/in/dhrubojyoti-saha-420120327/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:dhrubojyotisaha5@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={18} />
          </a>
        </div>
        
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Speak 2 UI | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
