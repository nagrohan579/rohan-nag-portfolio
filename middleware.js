// This is a Vercel Edge Middleware to handle blog post metadata for social media crawlers
import { NextResponse } from 'next/server';

// Blog post data
const blogPosts = {
  'getting-started-with-kubernetes': {
    title: "Getting Started with Kubernetes for Beginners | Rohan Nag's Blog",
    description: "Learn Kubernetes fundamentals for beginners, including core concepts like pods, services, and deployments. Start your journey with container orchestration and cloud-native technologies.",
    imageUrl: "/images/kubernetes.jpg",
    keywords: "Kubernetes tutorial, Kubernetes for beginners, K8s guide, container orchestration, DevOps Kubernetes",
    author: "Rohan Nag",
    date: "April 15, 2025"
  }
  // Add additional blog posts here as needed
};

// Social media user agents that should receive pre-rendered metadata
const SOCIAL_CRAWLERS = [
  'WhatsApp',
  'facebook',
  'Instagram',
  'Twitter',
  'Slack',
  'LinkedIn',
  'Telegram',
  'Discord',
  'bot',
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  'linkedinbot',
  'slackbot',
  'pinterest'
];

export default function middleware(request) {
  // Get the URL path
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Check if it's a blog post path
  const match = path.match(/^\/blog\/([a-zA-Z0-9-]+)$/);
  
  // If it's not a blog post path or not a crawler, just continue
  if (!match) {
    return NextResponse.next();
  }
  
  const slug = match[1];
  const postData = blogPosts[slug];
  
  // If we don't have metadata for this blog post, just continue
  if (!postData) {
    return NextResponse.next();
  }
  
  // Check if it's a social crawler by inspecting the user agent
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isCrawler = SOCIAL_CRAWLERS.some(crawlerName => 
    userAgent.includes(crawlerName.toLowerCase())
  );
  
  // If it's not a crawler, just continue
  if (!isCrawler) {
    return NextResponse.next();
  }
  
  // Clone the response to modify it
  const response = NextResponse.next();
  
  // Prepare the full image URL
  const imageUrl = `${url.protocol}//${url.host}${postData.imageUrl}`;
  
  // Create HTML with proper meta tags for the crawler
  const html = `
<!DOCTYPE html>
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
    
    <!-- Redirect to the actual page after metadata is read -->
    <meta http-equiv="refresh" content="0;url=${url.href}" />
  </head>
  <body>
    <p>Redirecting to ${postData.title}...</p>
    <script>window.location.href = "${url.href}";</script>
  </body>
</html>
  `;
  
  // Return the modified HTML response for crawlers
  return new Response(html, {
    headers: {
      'content-type': 'text/html',
      'cache-control': 'public, max-age=3600'
    }
  });
}