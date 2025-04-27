import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogPost from "@/components/blog-post";
import SEO from "@/components/seo";
import { getBlogPostBySlug } from "@/data/blog-posts"; // Import the helper function instead
import { BlogPostDetail } from "@/data/blog-posts/getting-started-with-kubernetes";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the helper function from index.ts to get the blog post
    if (slug) {
      const blogPost = getBlogPostBySlug(slug);
      setPost(blogPost || null);
    }
    setLoading(false);
  }, [slug]);

  // This effect runs when the post data is loaded
  useEffect(() => {
    if (post) {
      // Set up all SEO tags directly in the head for better SSR/crawler support
      const currentUrl = window.location.origin + `/blog/${post.slug}`;
      const imageUrl = post.coverImage.startsWith('http') ? post.coverImage : `${window.location.origin}${post.coverImage}`;
      
      // Update document title
      document.title = `${post.title} | Rohan Nag's Blog`;
      
      // Create or update meta description
      updateMetaTag('description', post.description || `${post.title} - ${post.tags.join(', ')}`);
      
      // Create or update meta keywords
      const keywordsContent = post.seoKeywords?.join(', ') || post.tags.join(', ');
      updateMetaTag('keywords', keywordsContent);
      
      // Set Open Graph tags directly in head
      updateMetaProperty('og:title', post.title);
      updateMetaProperty('og:description', post.description || `${post.title} - ${post.tags.join(', ')}`);
      updateMetaProperty('og:image', imageUrl);
      updateMetaProperty('og:url', currentUrl);
      updateMetaProperty('og:type', 'article');
      
      // Twitter card tags
      updateMetaProperty('twitter:card', 'summary_large_image');
      updateMetaProperty('twitter:title', post.title);
      updateMetaProperty('twitter:description', post.description || `${post.title} - ${post.tags.join(', ')}`);
      updateMetaProperty('twitter:image', imageUrl);
      
      // Article specific metadata
      updateMetaProperty('article:published_time', post.date);
      updateMetaProperty('article:author', post.author);
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);
      
      // Update the structured data for blog post
      const blogPostSchemaScript = document.getElementById('blogPostSchema');
      if (blogPostSchemaScript) {
        const blogPostSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
          },
          "headline": post.title,
          "description": post.description || `${post.title} - ${post.tags.join(', ')}`,
          "image": imageUrl,
          "author": {
            "@type": "Person",
            "name": post.author,
            "url": "https://rohannag.me/about"
          },
          "publisher": {
            "@type": "Person",
            "name": "Rohan Nag",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/images/Rohan_Nag_Profile.JPG`
            }
          },
          "datePublished": post.date,
          "dateModified": post.date,
          "keywords": keywordsContent
        };
        
        blogPostSchemaScript.textContent = JSON.stringify(blogPostSchema);
      }
      
      // Cleanup function to reset metadata when component unmounts
      return () => {
        document.title = "Rohan Nag | DevOps Engineer & Software Developer Portfolio";
        
        // Reset the blog schema to default
        if (blogPostSchemaScript) {
          const defaultBlogSchema = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Rohan Nag's Technical Blog",
            "description": "Technical articles on DevOps, cloud computing, and software development by Rohan Nag",
            "url": "https://rohannag.me/blog"
          };
          
          blogPostSchemaScript.textContent = JSON.stringify(defaultBlogSchema);
        }
      };
    }
  }, [post]);
  
  // Helper function to create or update meta tags with name attribute
  function updateMetaTag(name: string, content: string) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
  
  // Helper function to create or update meta tags with property attribute
  function updateMetaProperty(property: string, content: string) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* We still use the SEO component as a backup */}
      <SEO 
        title={`${post.title} | Rohan Nag's Blog`}
        description={post.description || `${post.title} - ${post.tags.join(', ')}`}
        image={post.coverImage}
        keywords={post.seoKeywords || post.tags}
        isArticle={true}
        date={post.date}
        author={post.author}
      />
      <BlogPost post={post} />
    </>
  );
}