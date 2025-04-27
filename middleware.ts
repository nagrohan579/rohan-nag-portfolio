// This is a Vercel Edge Middleware for handling social media crawlers and SEO
// No Next.js dependencies

// Blog post data - keep this in sync with your actual blog data
const blogPosts = {
  'getting-started-with-kubernetes': {
    title: "Getting Started with Kubernetes for Beginners | Rohan Nag's Blog",
    description: "Learn Kubernetes fundamentals for beginners, including core concepts like pods, services, and deployments. Start your journey with container orchestration and cloud-native technologies.",
    imageUrl: "/images/kubernetes.jpg",
    keywords: "Kubernetes tutorial, Kubernetes for beginners, K8s guide, container orchestration, DevOps Kubernetes",
    author: "Rohan Nag",
    date: "April 15, 2025"
  }
  // Add more blog posts here as needed
};

// Social media and crawler user agents that should receive pre-rendered metadata
const CRAWLERS = [
  'whatsapp',
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
  'telegram',
  'discord',
  'slack',
  'bot',
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'pinterest',
  'facebookexternalhit',
  'twitterbot'
];

export const config = {
  // Only run on blog post routes
  matcher: '/blog/:slug*',
};

export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Check if it's a blog post path (not just /blog/)
  if (path === '/blog' || path === '/blog/') {
    return new Response(null, { status: 200 });
  }
  
  // Extract slug from path like /blog/getting-started-with-kubernetes
  const slug = path.replace('/blog/', '');
  const postData = blogPosts[slug];
  
  if (!postData) {
    return new Response(null, { status: 200 });
  }
  
  // Check if it's a social crawler by inspecting the user agent
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isCrawler = CRAWLERS.some(crawler => userAgent.includes(crawler.toLowerCase()));
  
  if (!isCrawler) {
    return new Response(null, { status: 200 });
  }
  
  // Prepare the full image URL
  const imageUrl = new URL(postData.imageUrl, url.origin).toString();
  
  // Create HTML with proper meta tags for the crawler
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
    <meta property="og:url" content="${url.href}" />
    <meta property="og:title" content="${postData.title}" />
    <meta property="og:description" content="${postData.description}" />
    <meta property="og:image" content="${imageUrl}" />
    
    <!-- Twitter / X -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url.href}" />
    <meta property="twitter:title" content="${postData.title}" />
    <meta property="twitter:description" content="${postData.description}" />
    <meta property="twitter:image" content="${imageUrl}" />
    
    <!-- Article specific metadata -->
    <meta property="article:published_time" content="${postData.date}" />
    <meta property="article:author" content="${postData.author}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${url.href}" />
    
    <!-- Redirect non-crawler users -->
    <script>
      // Check if this is a real browser and not a crawler
      if (navigator.userAgent && !${JSON.stringify(CRAWLERS)}.some(bot => navigator.userAgent.toLowerCase().includes(bot))) {
        window.location.href = "${url.href}";
      }
    </script>
  </head>
  <body>
    <h1>${postData.title}</h1>
    <p>${postData.description}</p>
    <img src="${imageUrl}" alt="${postData.title}" />
    <p>By ${postData.author} | ${postData.date}</p>
    
    <p><a href="${url.origin}/blog">Back to all blog posts</a></p>
  </body>
</html>`;
  
  // Return the HTML specifically for crawlers
  return new Response(html, {
    headers: {
      'content-type': 'text/html',
      'cache-control': 'public, max-age=3600'
    }
  });
}