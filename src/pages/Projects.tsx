import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/main-layout";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: Array<{
    name: string;
    docsUrl: string;
  }>;
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
}

const projects: ProjectProps[] = [
  {
    title: "Kubernetes Dashboard Extension",
    description: "A Chrome extension for Kubernetes administrators providing quick access to cluster metrics and alerts without leaving the browser.",
    image: "/placeholder-image-1.jpg",
    tags: [
      { name: "Kubernetes", docsUrl: "https://kubernetes.io/docs/" },
      { name: "JavaScript", docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "React", docsUrl: "https://reactjs.org/docs/getting-started.html" },
      { name: "Chrome Extensions", docsUrl: "https://developer.chrome.com/docs/extensions/" }
    ],
    githubLink: "https://github.com/nagrohan579/k8s-dashboard-extension",
    featured: true
  },
  {
    title: "Automated CI/CD Pipeline",
    description: "Designed and implemented a complete CI/CD pipeline using Jenkins, Docker, and AWS for a microservices architecture.",
    image: "/placeholder-image-2.jpg",
    tags: [
      { name: "Jenkins", docsUrl: "https://www.jenkins.io/doc/" },
      { name: "Docker", docsUrl: "https://docs.docker.com/" },
      { name: "AWS", docsUrl: "https://docs.aws.amazon.com/" },
      { name: "CI/CD", docsUrl: "https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration" },
      { name: "Terraform", docsUrl: "https://developer.hashicorp.com/terraform/docs" }
    ],
    githubLink: "https://github.com/nagrohan579/cicd-pipeline",
    featured: true
  },
  {
    title: "Distributed Task Scheduler",
    description: "A scalable task scheduler system built with Spring Boot and Redis, capable of handling millions of scheduled tasks with fault tolerance.",
    image: "/placeholder-image-3.jpg",
    tags: [
      { name: "Java", docsUrl: "https://docs.oracle.com/en/java/" },
      { name: "Spring Boot", docsUrl: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
      { name: "Redis", docsUrl: "https://redis.io/documentation" },
      { name: "Microservices", docsUrl: "https://microservices.io/patterns/microservices.html" }
    ],
    githubLink: "https://github.com/nagrohan579/distributed-scheduler",
    liveLink: "https://demo-scheduler.example.com"
  },
  {
    title: "E-Commerce Analytics Platform",
    description: "A data analytics platform for e-commerce businesses that processes and visualizes sales data, customer behavior, and inventory metrics.",
    image: "/placeholder-image-4.jpg",
    tags: [
      { name: "Python", docsUrl: "https://docs.python.org/3/" },
      { name: "Data Analysis", docsUrl: "https://pandas.pydata.org/docs/" },
      { name: "Flask", docsUrl: "https://flask.palletsprojects.com/en/latest/" },
      { name: "D3.js", docsUrl: "https://d3js.org/getting-started" },
      { name: "MongoDB", docsUrl: "https://docs.mongodb.com/" }
    ],
    githubLink: "https://github.com/nagrohan579/ecommerce-analytics",
    liveLink: "https://ecommerce-analytics.example.com"
  },
  {
    title: "Cloud Cost Optimizer",
    description: "A tool that analyzes AWS infrastructure usage and provides recommendations for cost optimization with minimal performance impact.",
    image: "/placeholder-image-5.jpg",
    tags: [
      { name: "Python", docsUrl: "https://docs.python.org/3/" },
      { name: "AWS SDK", docsUrl: "https://docs.aws.amazon.com/sdk-for-python/" },
      { name: "Cost Management", docsUrl: "https://aws.amazon.com/aws-cost-management/" },
      { name: "Boto3", docsUrl: "https://boto3.amazonaws.com/v1/documentation/api/latest/index.html" }
    ],
    githubLink: "https://github.com/nagrohan579/cloud-cost-optimizer"
  },
  {
    title: "Smart Home Monitor",
    description: "An IoT application that collects and processes data from smart home devices and provides insights through a React Native mobile app.",
    image: "/placeholder-image-6.jpg",
    tags: [
      { name: "IoT", docsUrl: "https://aws.amazon.com/iot/what-is-the-internet-of-things/" },
      { name: "React Native", docsUrl: "https://reactnative.dev/docs/getting-started" },
      { name: "Node.js", docsUrl: "https://nodejs.org/en/docs/" },
      { name: "MQTT", docsUrl: "https://mqtt.org/getting-started/" },
      { name: "Firebase", docsUrl: "https://firebase.google.com/docs" }
    ],
    githubLink: "https://github.com/nagrohan579/smart-home-monitor",
    liveLink: "https://play.google.com/store/apps/details?id=com.example.smarthome"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  
  // Extract unique tags for filtering
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags.map(tag => tag.name))));

  // Filter projects based on selected tag
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.tags.some(tag => tag.name === filter));
    
  return (
    <MainLayout>
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A collection of my technical projects and applications. Each project represents a unique 
              challenge I've tackled and showcases different skills and technologies.
            </p>
          </motion.div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button 
              onClick={() => setFilter("all")} 
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                filter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              All
            </button>
            {allTags.map((tag, index) => (
              <button 
                key={index}
                onClick={() => setFilter(tag)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  filter === tag 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={cn(
                  "rounded-lg border overflow-hidden bg-card transition-all hover:shadow-md",
                  project.featured && "ring-2 ring-primary"
                )}>
                  {/* Project Image */}
                  <div className="h-48 bg-muted">
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span>Project Image</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <a 
                          key={i}
                          href={tag.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                          title={`View ${tag.name} documentation`}
                        >
                          {tag.name}
                        </a>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      {project.githubLink && (
                        <Link
                          to={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium flex items-center hover:text-primary"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                          GitHub
                        </Link>
                      )}
                      {project.liveLink && (
                        <Link
                          to={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium flex items-center hover:text-primary"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Projects Found */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                No projects match the selected filter. Try choosing a different category.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}