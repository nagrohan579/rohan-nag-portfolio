import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = "Rohan Nag | DevOps Engineer & Software Developer Portfolio";
const DEFAULT_DESCRIPTION = "Portfolio of Rohan Nag - DevOps Engineer and Software Developer specializing in cloud technologies and DevOps practices.";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Rohan Nag | DevOps Engineer & Software Developer Portfolio",
    description: "Welcome to the portfolio of Rohan Nag, a DevOps Engineer and Software Developer specializing in cloud technologies and DevOps practices."
  },
  "/about": {
    title: "About Rohan Nag | Skills & Background",
    description: "Learn about Rohan Nag's professional background, technical skills, and career aspirations in DevOps and software development."
  },
  "/experience": {
    title: "Professional Experience | Rohan Nag",
    description: "Explore Rohan Nag's professional experience, including internships, research work, and technical projects in DevOps and software development."
  },
  "/projects": {
    title: "Projects Portfolio | Rohan Nag",
    description: "View Rohan Nag's projects showcasing expertise in Kubernetes, CI/CD pipelines, cloud technologies, and software development."
  },
  "/blog": {
    title: "Technical Blog | Rohan Nag",
    description: "Read Rohan Nag's technical blog posts on DevOps practices, cloud computing, software development, and technology trends."
  },
  "/contact": {
    title: "Contact Rohan Nag | Get In Touch",
    description: "Connect with Rohan Nag for job opportunities, collaborations, or general inquiries related to DevOps and software development."
  }
};

export default function SEO({ title, description }: SEOProps) {
  const location = useLocation();
  const path = location.pathname;
  
  // Get page-specific metadata or use defaults
  const pageSEO = pageMeta[path] || { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
  
  // Use custom props if provided, otherwise use route-based metadata
  const finalTitle = title || pageSEO.title;
  const finalDescription = description || pageSEO.description;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", finalDescription);
    }
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute("content", finalTitle);
    }
    
    if (ogDescription) {
      ogDescription.setAttribute("content", finalDescription);
    }
    
    // Update Twitter/X meta tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    
    if (twitterTitle) {
      twitterTitle.setAttribute("content", finalTitle);
    }
    
    if (twitterDescription) {
      twitterDescription.setAttribute("content", finalDescription);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", window.location.origin + path);
    }
  }, [finalTitle, finalDescription, path]);

  return null;
}