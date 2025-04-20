import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import MobileNav from "@/components/mobile-nav";
import SEO from "@/components/seo";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export default function MainLayout({ children, className, title, description }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO title={title} description={description} />
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center px-4 md:px-6">
          {/* Logo on the left */}
          <div className="flex-shrink-0 mr-4">
            <Link to="/" className="flex items-center">
              <motion.span 
                className="font-bold text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Rohan Nag
              </motion.span>
            </Link>
          </div>

          {/* Navigation centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-8">
              <Link to="/" className="text-base font-medium transition-colors hover:text-foreground/80">
                Home
              </Link>
              <Link to="/about" className="text-base font-medium transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link to="/experience" className="text-base font-medium transition-colors hover:text-foreground/80">
                Experience
              </Link>
              <Link to="/projects" className="text-base font-medium transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link to="/blog" className="text-base font-medium transition-colors hover:text-foreground/80">
                Blog
              </Link>
              <Link to="/contact" className="text-base font-medium transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>

          {/* Theme toggle pushed all the way to the right */}
          <div className="flex items-center ml-auto">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
      <main className={cn("flex-1 w-full", className)}>
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rohan Nag. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="https://github.com/nagrohan579" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link to="https://www.linkedin.com/in/rohan-nag-a16b59230/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
            <Link to="https://x.com/RohanNag999" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
              X
            </Link>
            <Link to="mailto:nagrohan579@gmail.com" className="text-sm text-muted-foreground hover:text-foreground">
              Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}