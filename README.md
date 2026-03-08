# 🚀 Priyanshu Jaggi — Portfolio

A full-stack, responsive portfolio with a live Express backend.

---

## 📁 Folder Structure

```
priyanshu-portfolio/
├── backend/
│   └── server.js         ← Express API server
├── public/
│   └── index.html        ← Frontend (served by Express)
├── package.json
└── README.md
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Open in browser
```
http://localhost:3001
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/visitors` | Increment + get visitor count |
| GET | `/api/projects` | Fetch all projects |
| GET | `/api/skills` | Fetch skill categories |
| GET | `/api/github-stats` | GitHub stats (mock) |
| POST | `/api/terminal` | Execute terminal commands |
| POST | `/api/contact` | Submit contact form |

---

## 🖥️ Terminal Commands (in the portfolio)

Type these in the interactive terminal widget:
- `whoami` — About Priyanshu
- `skills` — Full tech stack
- `projects` — Project list
- `contact` — Contact info
- `experience` — Work history
- `github` — GitHub stats
- `ls`, `pwd`, `date` — Fun extras
- `clear` — Clear terminal

---

## 🌐 Deploy

1. Push to GitHub
2. Deploy backend to **Railway / Render / Heroku**
3. Update the `const API = '...'` line in `public/index.html` to your deployed URL
4. Or host frontend separately on **Vercel / Netlify** pointing to your backend URL

---

## 🛠️ Upgrade Ideas

- Connect to real **GitHub API** for live stats
- Add **MongoDB** to persist contact messages
- Add **nodemailer** to get email notifications on contact
- Add **JWT auth** for a private admin dashboard
- Swap mock data with a **CMS** (Contentful, Sanity)
