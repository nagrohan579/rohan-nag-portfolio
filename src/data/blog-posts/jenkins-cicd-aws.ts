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
  title: "Setting Up a Jenkins CI/CD Pipeline on AWS: A Step-by-Step Guide",
  slug: "jenkins-cicd-aws",
  date: "April 25, 2025",
  author: "Rohan Nag",
  category: "DevOps",
  tags: ["Jenkins", "AWS", "CI/CD", "DevOps", "EC2", "Automation"],
  coverImage: "/images/jenkins-cicd-aws.jpg",
  readTime: "10 min read",
  seoKeywords: [
    "Jenkins AWS setup",
    "Jenkins CI/CD pipeline",
    "AWS EC2 Jenkins installation",
    "Continuous integration with Jenkins",
    "Jenkins tutorial AWS",
    "DevOps Jenkins AWS guide",
    "Setting up Jenkins on EC2",
    "Jenkins automation server AWS",
    "Jenkins pipeline example",
    "AWS Jenkins deployment"
  ],
  description: "Learn how to set up a Jenkins CI/CD pipeline on AWS to automate your build and deployment processes in a scalable environment, from EC2 instance creation to running your first build.",
  content: `
# Setting Up a Jenkins CI/CD Pipeline on AWS: A Step-by-Step Guide

In this guide, we'll walk through setting up a Jenkins Continuous Integration/Continuous Deployment (CI/CD) pipeline using AWS services. This setup is ideal for developers looking to automate their build and deployment processes in a scalable environment.

## Step 1: Launch an EC2 Instance

1. **Access AWS Console**: Log in to your AWS Management Console.
2. **Navigate to EC2**: Search for and select the EC2 service.
3. **Launch Instance**:
   - **Name**: Assign a name like \`jenkins\`.
   - **AMI**: Choose *Ubuntu Server 24.04 LTS (HVM), SSD Volume Type* (Free Tier eligible).
   - **Instance Type**: Select \`t2.micro\` (Free Tier eligible).
4. **Key Pair**:
   - Create a new key pair named \`jenkins-key\`.
   - Use RSA encryption and \`.pem\` format.
   - Download and securely store the \`jenkins-key.pem\` file.
5. **Network Settings**:
   - Allow HTTP and HTTPS traffic from the internet.
6. **Launch**: Click "Launch Instance" to start your EC2 instance.

## Step 2: Connect to the EC2 Instance & Install Jenkins

### Connecting to the Instance

1. **Wait for Initialization**: Ensure the instance state is "Running".
2. **Connect**:
   - Select the instance and click "Connect".
   - Choose "EC2 Instance Connect" for browser-based access.

### Installing Jenkins

1. **Update Package Lists**:
   \`\`\`bash
   sudo apt update
   \`\`\`
2. **Add Jenkins Repository**:
   - Import the GPG key:
     \`\`\`bash
     sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \\
     https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
     \`\`\`
   - Add the Jenkins apt repository:
     \`\`\`bash
     echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
     https://pkg.jenkins.io/debian-stable binary/" | sudo tee \\
     /etc/apt/sources.list.d/jenkins.list > /dev/null
     \`\`\`
3. **Update Packages Again**:
   \`\`\`bash
   sudo apt-get update
   \`\`\`
4. **Install Java (Required by Jenkins)**:
   \`\`\`bash
   sudo apt-get install fontconfig openjdk-17-jre
   \`\`\`
5. **Install Jenkins**:
   \`\`\`bash
   sudo apt-get install jenkins
   \`\`\`


## Step 3: Start Jenkins & Access the Web Interface

1. **Start Jenkins Service**:
   \`\`\`bash
   sudo systemctl start jenkins
   sudo systemctl enable jenkins
   \`\`\`
2. **Verify Jenkins is Running**:
   \`\`\`bash
   sudo systemctl status jenkins
   \`\`\`
   Look for "active (running)" status.

## Step 4: Configure Security Group for Port 8080

By default, Jenkins runs on port 8080. To access it:

1. **Modify Inbound Rules**:
   - Navigate to the EC2 instance's "Security" tab.
   - Click on the associated Security Group.
   - Edit Inbound Rules to add:
     - **Type**: Custom TCP
     - **Port Range**: 8080
     - **Source**: 0.0.0.0/0

2. **Access Jenkins**:
   - Open a browser and navigate to \`http://YOUR-EC2-PUBLIC-IP:8080\`.


## Step 5: Unlock Jenkins

1. **Retrieve Initial Admin Password**:
   \`\`\`bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   \`\`\`
2. **Enter Password**: Copy the output and paste it into the Jenkins setup page.

## Step 6: Install Suggested Plugins

Upon unlocking:

1. **Plugin Installation**:
   - Choose "Install suggested plugins".
   - Wait for the installation to complete.

## Step 7: Create First Admin User

Fill in the required fields:

- **Username**: e.g., \`adminuser\`
- **Password**: Choose a secure password
- **Full Name**: Your Name
- **Email Address**: your.email@example.com 

## Step 8: Configure Jenkins URL

Confirm the Jenkins URL (e.g., \`http://YOUR-EC2-PUBLIC-IP:8080/\`) and save the configuration.

## Step 9: Create a "Hello World" Project

1. **New Item**:
   - Click on "New Item" from the Jenkins dashboard.
   - Enter an item name, e.g., \`hello-world\`.
   - Select "Freestyle project" and click "OK". 

2. **Configure Project**:
   - In the "Build" section, add a build step:
     - Choose "Execute shell".
     - Enter the command:
       \`\`\`bash
       echo "Hello World!"
       \`\`\`

3. **Save and Build**:
   - Click "Save".
   - On the project page, click "Build Now".

4. **View Output**:
   - Click on the build number (e.g., #1).
   - Select "Console Output" to see the result.

## Conclusion

You've successfully set up Jenkins on AWS and executed a simple "Hello World" build. This foundation allows you to expand into more complex CI/CD pipelines, integrating with various tools and services to automate your development workflow.

## Next Steps

1. **Integrate with GitHub**: Set up webhooks to trigger builds automatically when code is pushed.
2. **Add Build Agents**: Scale your CI/CD capabilities by adding more build agents.
3. **Implement Pipeline as Code**: Create Jenkinsfiles to define your pipeline in code.
4. **Set Up Notifications**: Configure email or Slack notifications for build results.
5. **Implement Testing**: Add automated testing to your pipeline for better quality assurance.
  `
};

export default blogPost;