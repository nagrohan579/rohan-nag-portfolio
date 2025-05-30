import { motion } from "framer-motion";
import MainLayout from "@/layouts/main-layout";
import { cn } from "@/lib/utils";

interface SkillProps {
  name: string;
  level: number;
  icon?: string;
}

function SkillBar({ name, level }: SkillProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const skills: SkillProps[] = [
    { name: "DevOps", level: 30 },
    { name: "Python", level: 80 },
    { name: "Java", level: 80 },
    { name: "Shell Scripting", level: 75 },
    { name: "Docker", level: 40 },
    { name: "Kubernetes", level: 20 },
    { name: "Ansible", level: 50 },
    { name: "Cloud Computing", level: 50 },
  ];

  return (
    <MainLayout>
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Biography Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                I am Rohan Nag, a passionate Computer Science student at Asansol Engineering College, where I am pursuing my B.Tech degree. 
                My academic journey has been focused on developing strong foundations in computer science principles while gaining practical experience 
                through internships and personal projects.
              </p>
              <p className="text-muted-foreground">
                Currently, I'm working as a DevOps Intern at Calsoft in Kolkata, where I'm gaining hands-on experience with 
                deployment pipelines, containerization, and cloud infrastructure. My interests lie primarily in cloud native technologies, 
                automation, and creating efficient, scalable software solutions.
              </p>
              <p className="text-muted-foreground">
                In addition to my technical pursuits, I enjoy participating in hackathons, contributing to open-source projects, 
                and staying updated with the latest developments in technology.
              </p>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
              <div>
                {skills.slice(Math.ceil(skills.length / 2)).map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* Aspirations Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Career Aspirations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn(
                "p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
              )}>
                <h3 className="text-lg font-semibold mb-3">Short-Term Goals</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Complete my B.Tech with distinction (Expected 2025)</li>
                  <li>• Secure a full-time position as a DevOps Engineer</li>
                  <li>• Obtain AWS and Kubernetes certifications</li>
                  <li>• Contribute to significant open-source projects</li>
                </ul>
              </div>
              <div className={cn(
                "p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
              )}>
                <h3 className="text-lg font-semibold mb-3">Long-Term Vision</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Lead engineering teams building cloud-native solutions</li>
                  <li>• Specialize in building highly available systems</li>
                  <li>• Mentor upcoming developers and engineers</li>
                  <li>• Potentially pursue MS in Computer Science</li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}