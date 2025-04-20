import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu} 
        className="p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span 
            className={`block h-0.5 w-full bg-foreground rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span 
            className={`block h-0.5 w-full bg-foreground rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span 
            className={`block h-0.5 w-full bg-foreground rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-background border-b z-50 shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/experience" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                Experience
              </Link>
              <Link 
                to="/projects" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                Projects
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-3 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                Contact
              </Link>
              
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Toggle Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}