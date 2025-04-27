// src/data/blog-posts/index.ts
import { BlogPostDetail } from './getting-started-with-kubernetes';
import kubernetesPost from './getting-started-with-kubernetes';

// Import any additional blog posts here
// import nextJsPost from './nextjs-for-beginners';
// import reactPost from './mastering-react-hooks';

// Export the BlogPostDetail type for use in other components
export type { BlogPostDetail };

// Create a record of all blog posts with their slugs as keys
export const blogPosts: Record<string, BlogPostDetail> = {
  'getting-started-with-kubernetes': kubernetesPost,
  // Add additional blog posts here
  // 'nextjs-for-beginners': nextJsPost,
  // 'mastering-react-hooks': reactPost,
};

// Function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPostDetail | undefined {
  return blogPosts[slug];
}

// Function to get all blog posts as an array
export function getAllBlogPosts(): BlogPostDetail[] {
  return Object.values(blogPosts);
}