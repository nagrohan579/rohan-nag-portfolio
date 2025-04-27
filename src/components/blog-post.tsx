import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import { BlogPostDetail } from "@/data/blog-posts/getting-started-with-kubernetes";
import { useState, useEffect } from "react";
import CodeBlock from "@/components/code-block";

interface BlogPostProps {
  post: BlogPostDetail;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [sections, setSections] = useState<(string | { code: string; language: string })[]>([]);

  useEffect(() => {
    // Parse content into text and code sections
    const parsedSections = parseContent(post.content);
    setSections(parsedSections);
  }, [post.content]);

  // Function to parse content into text and code blocks
  const parseContent = (content: string): (string | { code: string; language: string })[] => {
    const sections: (string | { code: string; language: string })[] = [];
    let remainingContent = content;
    
    // Match code blocks with language specification
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/;
    let match;
    
    while ((match = codeBlockRegex.exec(remainingContent)) !== null) {
      // Add text before code block
      const textBefore = remainingContent.slice(0, match.index);
      if (textBefore.trim()) {
        sections.push(textBefore);
      }
      
      // Add code block
      const language = match[1] || "text";
      const code = match[2].trim();
      sections.push({ code, language });
      
      // Continue with remaining content
      remainingContent = remainingContent.slice(match.index + match[0].length);
    }
    
    // Add any remaining text
    if (remainingContent.trim()) {
      sections.push(remainingContent);
    }
    
    return sections;
  };

  // Helper function to render text content with proper formatting
  const renderTextContent = (text: string) => {
    // Improved bullet point handling - specific pattern for the issue in the screenshot
    text = text.replace(/^- ([^:]+): (.*)/gm, '<div class="mb-3"><ul class="list-disc pl-6 mb-1"><li><strong>$1:</strong> $2</li></ul></div>');
    
    // General bullet point handling
    text = text.replace(/^- (.*)/gm, '<div class="mb-3"><ul class="list-disc pl-6 mb-1"><li>$1</li></ul></div>');
    
    // Process headings
    text = text.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
    text = text.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
    text = text.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>');
    
    // Process paragraphs
    text = text.replace(/^(?!<h|<ul|<ol|<li|<div|<blockquote)(.+)$/gm, '<p class="my-5 text-base leading-relaxed">$1</p>');
    
    // Process bold, italic, links, and inline code
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    text = text.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Process blockquotes
    text = text.replace(/^\>\s(.*$)/gm, '<blockquote class="border-l-4 border-primary pl-6 italic my-6">$1</blockquote>');
    
    return text;
  };

  return (
    <MainLayout>
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to all posts
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{post.author}</span>
              </div>
              <div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Blog content with proper code blocks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="blog-content"
          >
            {sections.map((section, index) => {
              if (typeof section === 'string') {
                return (
                  <div 
                    key={index} 
                    dangerouslySetInnerHTML={{ __html: renderTextContent(section) }} 
                  />
                );
              } else {
                return (
                  <CodeBlock 
                    key={index} 
                    code={section.code} 
                    language={section.language} 
                  />
                );
              }
            })}
          </motion.div>
        </div>
      </div>
      
      <style>{`
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.2;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.25rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .blog-content p {
          margin: 1.25rem 0;
          line-height: 1.8;
          font-size: 1.0625rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.7;
        }
        .blog-content blockquote {
          margin: 2rem 0;
          padding: 1rem 0 1rem 1.5rem;
          border-left: 4px solid hsl(var(--primary));
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
        .blog-content a {
          color: hsl(var(--primary));
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
        .blog-content code {
          font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
          background-color: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }
      `}</style>
    </MainLayout>
  );
}