import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Hello, I'm <span className="text-primary">Rohan Nag</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-8 text-muted-foreground">
            Development Engineer at Calsoft
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
              View My Work
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors">
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Brief Summary Section */}
      <section className="w-full px-4 py-16 md:py-24 bg-muted/50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="container max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-muted">
                <img 
                  src="/images/Rohan_Nag_Profile.JPG"
                  alt="Rohan Nag" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">About Me</h3>
              <p className="text-lg text-muted-foreground mb-6">
              I'm a Development Engineer at Calsoft in the DevOps competency. I have experience with Docker, Kubernetes, AWS infrastructure, CI/CD pipelines using Jenkins and GitHub Actions, and Infrastructure as Code with Terraform and Ansible. Currently working on client projects involving Node.js migrations, MongoDB optimization, and AWS cost reduction while maintaining secure and efficient systems.
              </p>
              <Link to="/about" className="inline-flex items-center font-medium text-primary hover:underline">
                Learn more about me
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
}