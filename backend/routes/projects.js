const express = require('express');
const router = express.Router();

// Static projects data (can be moved to DB later)
const projects = [
  {
    id: 1,
    title: 'CI/CD Pipeline Automation',
    description: 'Built a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes for microservices deployment.',
    tags: ['DevOps', 'Jenkins', 'Docker', 'K8s'],
    category: 'devops',
    github: '#',
    live: '#'
  },
  {
    id: 2,
    title: 'MERN E-Commerce App',
    description: 'Full-stack e-commerce platform with React frontend, Node.js/Express API, MongoDB, and JWT auth.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    category: 'fullstack',
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Infrastructure as Code',
    description: 'Automated AWS infrastructure provisioning using Terraform and Ansible with zero-downtime deployments.',
    tags: ['Terraform', 'Ansible', 'AWS', 'IaC'],
    category: 'devops',
    github: '#',
    live: '#'
  },
  {
    id: 4,
    title: 'System Design — URL Shortener',
    description: 'Scalable URL shortener with Redis caching, rate limiting, analytics, and horizontal scaling design.',
    tags: ['System Design', 'Redis', 'Node.js', 'Scalability'],
    category: 'system-design',
    github: '#',
    live: '#'
  },
  {
    id: 5,
    title: 'Kubernetes Monitoring Stack',
    description: 'Set up Prometheus + Grafana monitoring stack on K8s cluster with custom dashboards and alerting.',
    tags: ['K8s', 'Prometheus', 'Grafana', 'Monitoring'],
    category: 'devops',
    github: '#',
    live: '#'
  },
  {
    id: 6,
    title: 'DSA Problem Solver API',
    description: 'REST API that accepts code submissions, runs test cases in Docker sandboxes, and returns results.',
    tags: ['DSA', 'Docker', 'Node.js', 'Algorithms'],
    category: 'dsa',
    github: '#',
    live: '#'
  }
];

router.get('/', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    return res.json(projects.filter(p => p.category === category));
  }
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
