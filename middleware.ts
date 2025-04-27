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
  },
  'jenkins-cicd-aws': {
    title: "Setting Up a Jenkins CI/CD Pipeline on AWS | Rohan Nag's Blog",
    description: "Learn how to set up a Jenkins CI/CD pipeline on AWS to automate your build and deployment processes in a scalable environment, from EC2 instance creation to running your first build.",
    imageUrl: "/images/jenkins-cicd-aws.jpg",
    keywords: "Jenkins AWS setup, Jenkins CI/CD pipeline, AWS EC2 Jenkins installation, Continuous integration with Jenkins, Jenkins tutorial AWS, DevOps Jenkins AWS guide, Setting up Jenkins on EC2, Jenkins automation server AWS",
    author: "Rohan Nag",
    date: "April 25, 2025"
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
  
  // Check if the request is from a crawler
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isCrawler = CRAWLERS.some(crawler => userAgent.includes(crawler.toLowerCase()));
  
  // If it's not a crawler, we don't need special handling - let React Router handle it
  if (!isCrawler) {
    // Forward the request to continue normal processing (will be handled by vercel.json rewrites)
    return undefined;
  }
  
  // For crawlers, we'll provide optimized metadata
  
  // If it's the main blog index page
  if (path === '/blog' || path === '/blog/') {
    // Create a special SEO-friendly version of the blog index for crawlers
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Technical Blog | Rohan Nag - DevOps Engineer & Software Developer</title>
    <meta name="description" content="Technical articles on DevOps, cloud computing, and software development by Rohan Nag" />
    <meta name="keywords" content="DevOps blog, cloud computing articles, software development tutorials, Kubernetes, AWS, Jenkins" />
    <meta name="author" content="Rohan Nag" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url.href}" />
    <meta property="og:title" content="Technical Blog | Rohan Nag - DevOps Engineer & Software Developer" />
    <meta property="og:description" content="Technical articles on DevOps, cloud computing, and software development by Rohan Nag" />
    <meta property="og:image" content="${url.origin}/images/Rohan_Nag_Profile.JPG" />
    
    <!-- Twitter / X -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url.href}" />
    <meta property="twitter:title" content="Technical Blog | Rohan Nag - DevOps Engineer & Software Developer" />
    <meta property="twitter:description" content="Technical articles on DevOps, cloud computing, and software development by Rohan Nag" />
    <meta property="twitter:image" content="${url.origin}/images/Rohan_Nag_Profile.JPG" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${url.href}" />
  </head>
  <body>
    <h1>Rohan Nag's Technical Blog</h1>
    <p>Technical articles on DevOps, cloud computing, and software development</p>
    
    <h2>Latest Articles</h2>
    <ul>
      <li>
        <a href="${url.origin}/blog/getting-started-with-kubernetes">
          Getting Started with Kubernetes for Beginners
        </a>
        <p>Learn Kubernetes fundamentals for beginners</p>
      </li>
      <li>
        <a href="${url.origin}/blog/jenkins-cicd-aws">
          Setting Up a Jenkins CI/CD Pipeline on AWS
        </a>
        <p>Learn how to set up a Jenkins CI/CD pipeline on AWS</p>
      </li>
    </ul>
  </body>
</html>`;
    
    return new Response(html, {
      headers: {
        'content-type': 'text/html',
        'cache-control': 'public, max-age=3600'
      }
    });
  }
  
  // Handle individual blog posts for crawlers
  const slug = path.replace('/blog/', '');
  const postData = blogPosts[slug];
  
  if (!postData) {
    // If blog post doesn't exist in our data, just pass through to normal processing
    return undefined;
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