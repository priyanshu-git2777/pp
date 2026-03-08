const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ── In-memory store ────────────────────────────────────────────────────────
let visitors = 0;
const messages = [];
const terminalLogs = [];

// ── Visitor Counter ────────────────────────────────────────────────────────
app.get('/api/visitors', (req, res) => {
  visitors++;
  res.json({ count: visitors });
});

// ── Projects ───────────────────────────────────────────────────────────────
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1, title: 'CI/CD Pipeline Automation',
      description: 'GitLab CI/CD pipeline with Docker, Kubernetes & Helm for zero-downtime deployments across AWS EKS.',
      tech: ['Docker', 'Kubernetes', 'GitLab CI', 'Helm', 'AWS EKS'], category: 'devops', stars: 42,
    },
    {
      id: 2, title: 'MERN E-Commerce Platform',
      description: 'Full-stack e-commerce with JWT auth, Stripe payments, Redis caching and real-time order tracking.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Redis', 'Stripe'], category: 'fullstack', stars: 87,
    },
    {
      id: 3, title: 'Infrastructure as Code Suite',
      description: 'Terraform + Ansible playbooks to provision AWS infrastructure with full Prometheus/Grafana monitoring.',
      tech: ['Terraform', 'Ansible', 'AWS', 'Prometheus', 'Grafana'], category: 'devops', stars: 35,
    },
    {
      id: 4, title: 'Distributed Cache System Design',
      description: 'Designed & implemented a distributed caching layer — LRU eviction, consistent hashing, and sharding.',
      tech: ['Node.js', 'Consistent Hashing', 'LRU Cache', 'Socket.io'], category: 'system-design', stars: 61,
    },
    {
      id: 5, title: 'DSA Visualizer',
      description: 'Interactive visualizer for 50+ algorithms — sorting, graphs, trees, DP with step-by-step animations.',
      tech: ['React', 'D3.js', 'TypeScript', 'Canvas API'], category: 'dsa', stars: 120,
    },
    {
      id: 6, title: 'K8s Monitoring Dashboard',
      description: 'Real-time cluster monitoring with custom Prometheus metrics, Grafana dashboards & PagerDuty alerts.',
      tech: ['Prometheus', 'Grafana', 'Kubernetes', 'Python', 'Go'], category: 'devops', stars: 54,
    },
  ]);
});

// ── Skills ─────────────────────────────────────────────────────────────────
app.get('/api/skills', (req, res) => {
  res.json({
    devops: [
      { name: 'Docker', level: 95 }, { name: 'Kubernetes', level: 90 },
      { name: 'CI/CD', level: 92 }, { name: 'Terraform', level: 85 },
      { name: 'Ansible', level: 80 }, { name: 'AWS / GCP', level: 88 },
      { name: 'Linux / Bash', level: 93 }, { name: 'Prometheus + Grafana', level: 82 },
    ],
    fullstack: [
      { name: 'React.js', level: 88 }, { name: 'Node.js / Express', level: 90 },
      { name: 'MongoDB', level: 85 }, { name: 'REST APIs', level: 92 },
      { name: 'Redis', level: 78 }, { name: 'TypeScript', level: 80 },
    ],
    other: [
      { name: 'System Design (HLD/LLD)', level: 85 }, { name: 'DSA / LeetCode 400+', level: 82 },
      { name: 'Git / GitHub', level: 95 }, { name: 'Python', level: 75 },
    ],
  });
});

// ── Terminal ───────────────────────────────────────────────────────────────
app.post('/api/terminal', (req, res) => {
  const { command } = req.body;
  const cmd = (command || '').trim().toLowerCase();
  const responses = {
    help: `Available commands:\n  whoami      → About Priyanshu\n  skills      → Tech stack\n  projects    → View projects\n  contact     → Get in touch\n  experience  → Work history\n  github      → GitHub stats\n  clear       → Clear terminal`,
    whoami: `Priyanshu Jaggi\nDevOps Engineer | Full Stack (MERN) | System Design | DSA\nLocation: India 🇮🇳\nOpen to: Full-time / Remote / Freelance`,
    skills: `DevOps:      Docker, K8s, Terraform, Ansible, AWS, CI/CD\nFull Stack:  MERN — MongoDB, Express, React, Node.js\nSys Design:  HLD/LLD, Distributed Systems, Caching\nDSA:         Arrays, Graphs, DP, Trees — LeetCode 400+`,
    projects: `6 projects live. Scroll to Projects section ↓\nOr: GET /api/projects`,
    contact: `Email:    priyanshu@example.com\nLinkedIn: linkedin.com/in/priyanshujaggi\nGitHub:   github.com/priyanshujaggi`,
    experience: `2023–Present  DevOps Engineer @ TechCorp\n2022–2023     Full Stack Dev @ StartupXYZ\n2021–2022     Junior Dev @ WebAgency`,
    github: `Repos: 34  |  Stars: 399  |  Contributions: 847\nStreak: 42 days  |  Followers: 120`,
    clear: '__CLEAR__',
    ls: `frontend/  backend/  docker-compose.yml  README.md  .env`,
    pwd: `/home/priyanshu/portfolio`,
    date: new Date().toString(),
    exit: `Nice try. You can't exit the matrix 😄`,
    sudo: `Permission denied. Nice try though 😎`,
    'npm start': `Starting portfolio server...\n✓ Backend on :3001\n✓ Frontend on :3000`,
  };
  const out = responses[cmd] || `Command not found: ${command}\nType 'help' for available commands.`;
  terminalLogs.push({ command, ts: Date.now() });
  res.json({ output: out });
});

// ── Contact Form ───────────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required.' });
  messages.push({ name, email, message, ts: new Date().toISOString() });
  console.log(`📩 New contact from: ${name} <${email}>`);
  res.json({ success: true, msg: `Thanks ${name}! I'll reply soon.` });
});

// ── GitHub Stats (mock) ─────────────────────────────────────────────────────
app.get('/api/github-stats', (req, res) => {
  res.json({ repos: 34, contributions: 847, stars: 399, followers: 120, streak: 42 });
});

// ── Serve frontend ─────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio running → http://localhost:${PORT}\n`);
});
