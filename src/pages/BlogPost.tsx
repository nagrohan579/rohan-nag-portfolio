import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogPost from "@/components/blog-post";
import SEO from "@/components/seo";
import { BlogPostDetail } from "@/data/blog-posts/getting-started-with-kubernetes";
import kubernetesPost from "@/data/blog-posts/getting-started-with-kubernetes";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the blog post data based on the slug
    // For now, we'll just handle the kubernetes post directly
    if (slug === "getting-started-with-kubernetes") {
      setPost(kubernetesPost);
    }
    setLoading(false);
  }, [slug]);

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
      <SEO 
        title={post.title}
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