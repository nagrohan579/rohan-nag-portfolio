import { motion } from "framer-motion";
import MainLayout from "@/layouts/main-layout";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: Array<{
    name: string;
    docsUrl: string;
  }>;
}

const experiences: ExperienceItem[] = [
  {
    title: "Development Engineer",
    company: "Calsoft",
    location: "Kolkata, India",
    period: "Sep 2025 - Present",
    description: [
      "Currently working on a client project to migrate application from Node.js 11 to Node.js 22.",
      "Setting up new CI/CD pipelines for improved deployment automation.",
      "Optimizing MongoDB daily backups to S3 to reduce costs and improve efficiency.",
      "Analyzing AWS infrastructure to reduce the current $400 monthly bill while maintaining performance.",
      "Conducting AWS security reviews focusing on proper permissions and resource optimization.",
      "Creating comprehensive documentation of the entire infrastructure setup for future reference.",
      "Built testing environments using separate Ubuntu instances with Node.js and MongoDB to avoid affecting production servers."
    ],    
    skills: [
      { name: "Node.js", docsUrl: "https://nodejs.org/docs/" },
      { name: "MongoDB", docsUrl: "https://www.mongodb.com/docs/" },
      { name: "AWS", docsUrl: "https://docs.aws.amazon.com/" },
      { name: "CI/CD", docsUrl: "https://www.geeksforgeeks.org/devops/what-is-ci-cd/" },
      { name: "Infrastructure Optimization", docsUrl: "https://bitwizards.com/blog/infrastructure-optimization" },
      { name: "Security Review", docsUrl: "https://aws.amazon.com/security/" },
      { name: "Documentation", docsUrl: "https://docs.github.com/en/get-started/writing-on-github" }
    ]
  },
  {
    title: "DevOps Intern",
    company: "Calsoft",
    location: "Kolkata, India",
    period: "Feb 2025 - Aug 2025",
    description: [
      "Worked extensively with Docker and Kubernetes for containerization and orchestration in production environments.",
      "Gained proficiency in AWS services and improved skills in cloud infrastructure management and cost optimization.",
      "Built CI/CD pipelines using Jenkins, GitHub Actions, and AWS CodePipeline for automated deployment workflows.",
      "Explored monitoring and observability solutions including Prometheus, Grafana, and DataDog for system health tracking.",
      "Implemented Infrastructure as Code using Terraform and AWS CloudFormation for consistent environment provisioning.",
      "Developed Ansible playbooks for simultaneous setup and configuration of Linux and Windows instances.",
      "Created custom AMIs with pre-configured applications and startup scripts for automated instance deployment."
    ],    
    skills: [
      { name: "Docker", docsUrl: "https://docs.docker.com/" },
      { name: "Kubernetes", docsUrl: "https://kubernetes.io/docs/" },
      { name: "Jenkins", docsUrl: "https://www.jenkins.io/doc/" },
      { name: "GitHub Actions", docsUrl: "https://docs.github.com/en/actions" },
      { name: "AWS CodePipeline", docsUrl: "https://docs.aws.amazon.com/codepipeline/" },
      { name: "AWS", docsUrl: "https://docs.aws.amazon.com/" },
      { name: "Terraform", docsUrl: "https://developer.hashicorp.com/terraform/docs" },
      { name: "AWS CloudFormation", docsUrl: "https://docs.aws.amazon.com/cloudformation/" },
      { name: "Ansible", docsUrl: "https://docs.ansible.com/" },
      { name: "Prometheus", docsUrl: "https://prometheus.io/docs/" },
      { name: "Grafana", docsUrl: "https://grafana.com/docs/" },
      { name: "DataDog", docsUrl: "https://docs.datadoghq.com/" }
    ]
  },
];

export default function Experience() {
  return (
    <MainLayout>
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h1>
            <p className="text-lg text-muted-foreground">
              My journey in the tech industry through internships and professional roles.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative border-l border-muted pl-8 ml-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-16 relative"
              >
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[2.25rem] top-1.5 border-4 border-background"></div>
                
                {/* Experience content */}
                <div className="rounded-lg border bg-card p-6">
                  <time className="text-sm font-semibold text-primary mb-2 block">
                    {exp.period}
                  </time>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <div className="text-muted-foreground mb-4">
                    <span>{exp.company}</span> • <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <a 
                        key={i}
                        href={skill.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                        title={`View ${skill.name} documentation`}
                      >
                        {skill.name}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* End of timeline marker */}
            <div className="absolute w-3 h-3 bg-primary/50 rounded-full -left-[0.5rem] bottom-0"></div>
          </div>
          
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Education</h2>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">Bachelor of Technology in Computer Science</h3>
              <div className="text-muted-foreground mb-2">
                Asansol Engineering College • 2021 - 2025
              </div>
              <p className="text-muted-foreground mb-4">
                Graduated with a B.Tech degree in Computer Science with focus on software engineering, cloud computing, and DevOps practices.
                Achieved a CGPA of 8.74/10.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.geeksforgeeks.org/data-structures/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                  Data Structures
                </a>
                <a href="https://www.geeksforgeeks.org/fundamentals-of-algorithms/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                  Algorithms
                </a>
                <a href="https://www.oracle.com/database/what-is-database/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                  Database Systems
                </a>
                <a href="https://www.geeksforgeeks.org/operating-systems/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                  Operating Systems
                </a>
                <a href="https://aws.amazon.com/what-is-cloud-computing/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                  Cloud Computing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}