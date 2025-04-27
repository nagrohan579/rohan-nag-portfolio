// API route for handling social media crawlers and bots
export default function handler(req, res) {
  const { slug } = req.query;
  
  // Blog post data - keep this in sync with your blog data
  const blogPosts = {
    'getting-started-with-kubernetes': {
      title: "Getting Started with Kubernetes for Beginners | Rohan Nag's Blog",
      description: "Learn Kubernetes fundamentals for beginners, including core concepts like pods, services, and deployments. Start your journey with container orchestration and cloud-native technologies.",
      imageUrl: "/images/kubernetes.jpg",
      keywords: "Kubernetes tutorial, Kubernetes for beginners, K8s guide, container orchestration, DevOps Kubernetes",
      author: "Rohan Nag",
      date: "April 15, 2025"
    }
    // Add more blog posts here as you create them
  };
  
  // Check if we have data for this blog post
  const postData = blogPosts[slug];
  if (!postData) {
    return res.status(404).send('Blog post not found');
  }
  
  // Construct the full URL for the image and page
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const imageUrl = `${baseUrl}${postData.imageUrl}`;
  const pageUrl = `${baseUrl}/blog/${slug}`;
  
  // Generate HTML with proper meta tags for social media crawlers
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${postData.title}</title>
    <meta name="description" content="${postData.description}" />
    <meta name="keywords" content="${postData.keywords}" />
    <meta name="author" content="${postData.author}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${postData.title}" />
    <meta property="og:description" content="${postData.description}" />
    <meta property="og:image" content="${imageUrl}" />
    
    <!-- Twitter / X -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${pageUrl}" />
    <meta property="twitter:title" content="${postData.title}" />
    <meta property="twitter:description" content="${postData.description}" />
    <meta property="twitter:image" content="${imageUrl}" />
    
    <!-- Article specific metadata -->
    <meta property="article:published_time" content="${postData.date}" />
    <meta property="article:author" content="${postData.author}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}" />
    
    <!-- Auto-redirect for actual browsers (not bots) -->
    <script>
      // Only redirect if this is a normal browser, not a bot
      const userAgent = navigator.userAgent.toLowerCase();
      const isCrawler = ['whatsapp', 'facebook', 'twitter', 'bot', 'googlebot', 'bingbot', 'yandex', 'baiduspider'].some(
        bot => userAgent.includes(bot)
      );
      
      if (!isCrawler) {
        window.location.href = "${pageUrl}";
      }
    </script>
  </head>
  <body>
    <h1>${postData.title}</h1>
    <p>${postData.description}</p>
    <img src="${imageUrl}" alt="${postData.title}" />
    <p>By ${postData.author} | ${postData.date}</p>
    
    <p><a href="${baseUrl}/blog">Back to all blog posts</a></p>
  </body>
</html>`;

  // Set appropriate caching headers
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'text/html');
  
  // Send the HTML response
  res.status(200).send(html);
}