export interface BlogPostDetail {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  content: string;
  seoKeywords?: string[];
  description?: string;
}

const blogPost: BlogPostDetail = {
  title: "Getting Started with Kubernetes for Beginners",
  slug: "getting-started-with-kubernetes",
  date: "April 15, 2025",
  author: "Rohan Nag",
  category: "DevOps",
  tags: ["Kubernetes", "Docker", "DevOps", "Container Orchestration", "Cloud Native"],
  coverImage: "/images/kubernetes.jpg",
  readTime: "8 min read",
  seoKeywords: [
    "Kubernetes tutorial", 
    "Kubernetes for beginners", 
    "K8s guide", 
    "container orchestration", 
    "DevOps Kubernetes", 
    "K8s cluster setup", 
    "Kubernetes pods", 
    "Kubernetes services", 
    "Kubernetes deployments", 
    "cloud-native technologies",
    "Kubernetes Minikube"
  ],
  description: "Learn Kubernetes fundamentals for beginners, including core concepts like pods, services, and deployments. Start your journey with container orchestration and cloud-native technologies.",
  content: `
# Getting Started with Kubernetes for Beginners

Kubernetes has revolutionized how we deploy, scale, and manage containerized applications. As more organizations adopt cloud-native technologies, understanding Kubernetes has become an essential skill for DevOps engineers and software developers.

## What is Kubernetes?

Kubernetes (often abbreviated as K8s) is an open-source platform for automating deployment, scaling, and operations of application containers across clusters of hosts. It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation (CNCF).

## Why Use Kubernetes?

- **Container Orchestration**: Efficiently manage hundreds or thousands of containers
- **Self-healing**: Automatically restarts containers that fail and replaces containers when nodes die
- **Horizontal Scaling**: Scale applications up and down with simple commands
- **Automated Rollouts and Rollbacks**: Change the state of deployed containers gradually while monitoring health
- **Secret and Configuration Management**: Deploy and update secrets and application configurations without rebuilding container images

## Core Kubernetes Concepts

### 1. Pods

The smallest deployable units created and managed by Kubernetes. A Pod represents a single instance of a running process in your cluster and can contain one or more containers.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
\`\`\`

### 2. Services

An abstract way to expose applications running on a set of Pods as a network service. Services enable communication between different parts of your application.

### 3. Deployments

Provide declarative updates for Pods and ReplicaSets, allowing you to describe an application's life cycle, including which images to use, the number of Pods, and how they should be updated.

## Setting Up Your First Kubernetes Cluster

There are several ways to get started with Kubernetes locally for learning purposes:

1. **Minikube**: Run a single-node Kubernetes cluster inside a VM on your personal computer
2. **Kind (Kubernetes IN Docker)**: Run local Kubernetes clusters using Docker container "nodes"
3. **Docker Desktop**: Built-in Kubernetes support for Windows and Mac

Let's explore how to set up Minikube in the next section...

(This blog post content continues with more detailed instructions, examples, and best practices for beginners learning Kubernetes)
  `
};

export default blogPost;