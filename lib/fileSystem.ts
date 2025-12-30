
export type FileType = 'file' | 'directory';

export interface FileSystemItem {
    name: string;
    type: FileType;
    content?: string; // For files
    children?: Record<string, FileSystemItem>; // For directories
    description?: string; // For ls -l or enhanced view
}

export const fileSystem: Record<string, FileSystemItem> = {
    '~': {
        name: '~',
        type: 'directory',
        children: {
            'about.md': {
                name: 'about.md',
                type: 'file',
                content: `
# Who Am I?

I am **Shinjan Sarkar**, a DevOps & Cloud Enthusiast based in Kolkata, India.
I build resilient infrastructure and automate the future.

## Hobbies
- Football
- Photography
`,
                description: 'Bio and hobbies'
            },
            'experience.md': {
                name: 'experience.md',
                type: 'file',
                content: `
# Experience

## Geogo Techsolution (Onsite)
**Summer Intern / Trainee (DevOps)** | March 2025 – June 2025
- **DevOps Training/Internship**: Gained hands-on experience in Cloud and DevOps practices including CI/CD pipelines, Docker, AWS, and Terraform while working on real-world deployment workflows.

## Indian Institute of Internship (Remote)
**Summer Intern / Trainee (DevOps)** | June 2024 – July 2024
- **DevOps Training**: Learned and applied Linux, Shell scripting, and Docker while completing hands-on tasks and project simulations.
`,
                description: 'Work history'
            },
            'education.md': {
                name: 'education.md',
                type: 'file',
                content: `
# Education

## RCC Institute of Information Technology
**Bachelor of Computer Applications (BCA)** | 2022 – 2025
- Kolkata, India

## Howrah Vivekananda Institution
**Higher Secondary (Class XII), Commerce** | 2020 – 2022
- Score: 80.6%
- Howrah, India

## Howrah Vivekananda Institution
**Secondary (Class X)** | 2014 – 2020
- Score: 69%
- Howrah, India
`,
                description: 'Academic background'
            },
            'contact.md': {
                name: 'contact.md',
                type: 'file',
                content: `
# Contact Me

- **Email**:    shinjansarkar268@gmail.com
- **Mobile**:   +91-9123813965
- **LinkedIn**: [LINK: https://linkedin.com/in/shinjansarkar]
- **GitHub**:   [LINK: https://github.com/shinjan]

Open for collaborations and freelance work.
`,
                description: 'Get in touch'
            },
            'certifications.md': {
                name: 'certifications.md',
                type: 'file',
                content: `
# Certifications

- **Python for Beginners** – Udemy
- **Docker Basic Unleashed** – Udemy
- **Linux Fundamentals** – Udemy
- **DevOps Training & Internship** – NITI Aayog
`,
                description: 'Certificates & Courses'
            },
            'projects': {
                name: 'projects',
                type: 'directory',
                children: {
                    'auto-docker': {
                        name: 'auto-docker',
                        type: 'file',
                        content: `
# Auto Docker – Automated Dockerfile Generator
**Stack**: Docker, Automation, Copilot, Typescript

- Created a tool that auto-detects project type and generates optimized Dockerfiles using Node.js and Docker.
- Added multi-stage builds, dependency detection (npm/yarn/pnpm), and automatic .dockerignore generation.
- Developed a VS Code extension for instant Dockerfile generation inside the editor.
`,
                        description: 'Automated Dockerfile Generator'
                    },
                    'rcc-coverage': {
                        name: 'rcc-coverage',
                        type: 'file',
                        content: `
# RCC Coverage Website – Event Resources Portal
**Stack**: React, Supabase, Vercel

- Built a React + Supabase application for RCC Coverage Team to manage event resources and workflows.
- Implemented authentication, role-based access, and real-time updates.
- Deployed on Vercel with optimized performance and seamless API integration.
`,
                        description: 'Event Resources Portal'
                    },
                    'mern-blog': {
                        name: 'mern-blog',
                        type: 'file',
                        content: `
# Dockerized MERN Stack Blog Application
**Stack**: Nginx, Docker Compose, EC2

- Containerized a MERN blog application using multi-stage builds for optimized performance.
- Used Nginx as a reverse proxy for routing and efficient request handling.
- Managed services using Docker Compose with persistent volumes for database reliability.
`,
                        description: 'Optimized Deployment with Nginx Proxy'
                    },
                    'collaborative-notepad': {
                        name: 'collaborative-notepad',
                        type: 'file',
                        content: `
# Collaborative Notepad
**Stack**: Docker, GitLab CI/CD, Nginx

- Built a multi-user real-time collaborative notepad using WebSockets.
- Containerized and deployed the project using Nginx and tested across multiple environments.
- Integrated GitLab CI/CD for automated deployments.
`,
                        description: 'Real-time Editing with Scalable DevOps'
                    }
                },
                description: 'My portfolio projects'
            },
            'skills.txt': {
                name: 'skills.txt',
                type: 'file',
                content: `
Version Control:  Git, GitHub
CI/CD:            GitLab CI/CD, GitHub integration
Containerization: Docker
Cloud Platforms:  AWS (EC2, S3)
Web Server:       Nginx
Scripting:        Bash, Shell, Python (automation)
Operating System: Linux (CLI, file/user management)
`,
                description: 'Technical skills inventory'
            },
            'README.txt': {
                name: 'README.txt',
                type: 'file',
                content: 'Welcome to ShinjanOS v1.0.0. Type "help" to see available commands.',
                description: 'Start here'
            }
        }
    }
};
