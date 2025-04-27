import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import { cn } from "@/lib/utils";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  coverImage: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPostProps[] = [
  {
    title: "Getting Started with Kubernetes for Beginners",
    excerpt: "Learn the basics of Kubernetes and how to set up your first cluster for container orchestration. This beginner-friendly guide will help you understand the key concepts.",
    date: "April 15, 2025",
    slug: "getting-started-with-kubernetes",
    category: "DevOps",
    coverImage: "/images/kubernetes.jpg",
    readTime: "8 min read",
    featured: true
  },
  {
    title: "Setting Up a Jenkins CI/CD Pipeline on AWS: A Step-by-Step Guide",
    excerpt: "Learn how to set up a Jenkins CI/CD pipeline on AWS to automate your build and deployment processes in a scalable environment, from EC2 instance creation to running your first build.",
    date: "April 25, 2025",
    slug: "jenkins-cicd-aws",
    category: "DevOps",
    coverImage: "/images/jenkins-cicd-aws.jpg",
    readTime: "10 min read",
    featured: true
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showPopup, setShowPopup] = useState(false);
  
  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter blog posts based on selected category
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleBlogClick = (slug: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow navigation for both Kubernetes and Jenkins blog posts
    if (slug !== "getting-started-with-kubernetes" && slug !== "jenkins-cicd-aws") {
      e.preventDefault();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <MainLayout>
      {/* Popup message */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg"
        >
          <p className="font-medium">This is dummy content. Real blog posts coming soon!</p>
        </motion.div>
      )}

      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Sharing my thoughts, experiences, and knowledge about software development, DevOps, and technology.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Featured posts (if on "all" category) */}
          {selectedCategory === "all" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter(post => post.featured)
                  .map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Link 
                        to={`/blog/${post.slug}`} 
                        onClick={(e) => handleBlogClick(post.slug, e)}
                        className="block"
                      >
                        <div className="rounded-lg border overflow-hidden transition-all hover:shadow-md">
                          <div className="h-56 bg-muted overflow-hidden">
                            <div className="w-full h-full bg-muted">
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                {post.category}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {post.readTime}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {post.date}
                              </span>
                              <span className="text-sm font-medium text-primary flex items-center">
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                  <path d="M5 12h14"></path>
                                  <path d="m12 5 7 7-7 7"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
          
          {/* All blog posts or filtered by category */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold mb-6"
            >
              {selectedCategory === "all" ? "All Posts" : `${selectedCategory} Posts`}
            </motion.h2>
            
            <div className="divide-y">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="py-6 first:pt-0"
                >
                  <Link 
                    to={`/blog/${post.slug}`}
                    onClick={(e) => handleBlogClick(post.slug, e)}
                    className="group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {post.date}
                          </span>
                          <span className="text-sm font-medium text-primary flex items-center">
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* No posts found */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
                <p className="text-muted-foreground">
                  No blog posts match the selected category. Try choosing a different one.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}