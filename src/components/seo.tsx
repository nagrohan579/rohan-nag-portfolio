import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  type?: string;
  date?: string;
  author?: string;
  isArticle?: boolean;
}

const DEFAULT_TITLE = "Rohan Nag | DevOps Engineer & Software Developer Portfolio";
const DEFAULT_DESCRIPTION = "Portfolio of Rohan Nag - DevOps Engineer and Software Developer specializing in cloud technologies and DevOps practices.";
const DEFAULT_IMAGE = "/images/Rohan_Nag_Profile.JPG";
const DEFAULT_AUTHOR = "Rohan Nag";
const DEFAULT_KEYWORDS = ["DevOps", "Software Development", "Cloud Technologies", "Kubernetes", "CI/CD"];

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

export default function SEO({ 
  title, 
  description, 
  image = DEFAULT_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  type = "website",
  date,
  author = DEFAULT_AUTHOR,
  isArticle = false
}: SEOProps) {
  const location = useLocation();
  const path = location.pathname;
  const currentUrl = window.location.origin + path;
  
  // Check if we're on a blog post page (dynamic route)
  const isBlogPost = path.startsWith('/blog/');
  
  // For blog posts, prioritize the directly passed props instead of looking up in pageMeta
  let finalTitle = title || DEFAULT_TITLE;
  let finalDescription = description || DEFAULT_DESCRIPTION;
  
  // Only use pageMeta if this is not a blog post or if title/description weren't provided
  if (!isBlogPost || !title) {
    // Get page-specific metadata or use defaults
    const pageSEO = pageMeta[path] || { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
    finalTitle = title || pageSEO.title;
    finalDescription = description || pageSEO.description;
  }
  
  const finalType = isArticle ? "article" : type;
  const keywordsString = keywords.join(", ");
  const finalImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywordsString);

    // Update Open Graph meta tags
    const metaTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:image', content: finalImage.startsWith('http') ? finalImage : `${window.location.origin}${finalImage}` },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: finalType },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: finalTitle },
      { property: 'twitter:description', content: finalDescription },
      { property: 'twitter:image', content: finalImage.startsWith('http') ? finalImage : `${window.location.origin}${finalImage}` }
    ];

    // Add article specific meta tags if it's a blog post
    if (isArticle && date) {
      metaTags.push(
        { property: 'article:published_time', content: date },
        { property: 'article:author', content: author }
      );
    }

    // Set or create meta tags
    metaTags.forEach(({ property, content }) => {
      if (content) { // Only set meta tag if content is not undefined
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      }
    });
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
    
  }, [finalTitle, finalDescription, finalImage, finalType, currentUrl, keywordsString, isArticle, date, author]);

  return null;
}