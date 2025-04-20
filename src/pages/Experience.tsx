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
    title: "DevOps Intern",
    company: "Calsoft",
    location: "Kolkata, India",
    period: "Feb 2025 - Present",
    description: [
      "Familiarizing with core DevOps concepts including CI/CD workflows and deployment strategies.",
      "Studying Docker and Kubernetes for containerization and orchestration.",
      "Learning AWS fundamentals and cloud infrastructure provisioning.",
      "Exploring automation practices using shell scripting and Git version control."
    ],    
    skills: [
      { name: "Docker", docsUrl: "https://docs.docker.com/" },
      { name: "Kubernetes", docsUrl: "https://kubernetes.io/docs/" },
      { name: "Jenkins", docsUrl: "https://www.jenkins.io/doc/" },
      { name: "AWS", docsUrl: "https://docs.aws.amazon.com/" },
      { name: "Terraform", docsUrl: "https://developer.hashicorp.com/terraform/docs" },
      { name: "Python", docsUrl: "https://docs.python.org/3/" },
      { name: "Bash", docsUrl: "https://www.gnu.org/software/bash/manual/" }
    ]
  },
  {
    title: "Software Development Intern(Dummy Experience)",
    company: "TechMinds Solutions",
    location: "Remote",
    period: "May 2024 - Aug 2024",
    description: [
      "Developed and maintained backend RESTful APIs using Spring Boot and Java.",
      "Participated in daily Scrum meetings and collaborated with cross-functional teams.",
      "Implemented authentication and authorization features using OAuth 2.0 and JWT.",
      "Wrote unit and integration tests to ensure code quality and functionality."
    ],
    skills: [
      { name: "Java", docsUrl: "https://docs.oracle.com/en/java/" },
      { name: "Spring Boot", docsUrl: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
      { name: "REST APIs", docsUrl: "https://restfulapi.net/" },
      { name: "SQL", docsUrl: "https://dev.mysql.com/doc/" },
      { name: "Git", docsUrl: "https://git-scm.com/docs" },
      { name: "JUnit", docsUrl: "https://junit.org/junit5/docs/current/user-guide/" }
    ]
  },
  {
    title: "Research Assistant(Dummy Experience)",
    company: "Asansol Engineering College",
    location: "Asansol, India",
    period: "Aug 2023 - Dec 2023",
    description: [
      "Assisted in research on machine learning applications in predictive maintenance.",
      "Collected and preprocessed datasets for training predictive models.",
      "Implemented and evaluated several machine learning algorithms using Python and scikit-learn.",
      "Co-authored a research paper presented at a regional technical symposium."
    ],
    skills: [
      { name: "Python", docsUrl: "https://docs.python.org/3/" },
      { name: "scikit-learn", docsUrl: "https://scikit-learn.org/stable/documentation.html" },
      { name: "Data Analysis", docsUrl: "https://pandas.pydata.org/docs/" },
      { name: "Research", docsUrl: "https://scholar.google.com/" },
      { name: "Technical Writing", docsUrl: "https://developers.google.com/tech-writing" }
    ]
  }
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
                Asansol Engineering College • 2021 - 2025 (Expected)
              </div>
              <p className="text-muted-foreground mb-4">
                Pursuing a B.Tech degree with focus on software engineering, cloud computing, and DevOps practices.
                Currently maintaining a CGPA of 8.7/10.
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