# Axentra Technologies — Real Tasks Platform

An interactive internship and experiential learning platform offering specialized domain tracks, real-world task execution, instant AI code review & feedback, structured task submissions, and verifiable certificate validation.

---

## 🌟 Key Features

- **Domain-Specific Internship Tracks**: Industry-aligned tracks covering Full-Stack Web Development, Artificial Intelligence & Machine Learning, Mobile App Development, Cybersecurity, Cloud & DevOps, and UI/UX Design.
- **Flexible Program Durations**: Custom enrollment options tailored for academic and professional goals:
  - **4 Weeks**: Fast-paced intensive track with 3 key deliverables + ISO Certificate.
  - **6 Weeks**: Standard university academic credit duration with scorecard & performance report.
  - **3 Months**: Deep-dive domain mastery with 5 capstone projects.
  - **6 Months**: Advanced production architecture, Letter of Recommendation (LOR), & placement assistance.
- **AI-Powered Code Review & Mentoring**: Built-in integration with Google Gemini API (`@google/genai`) for real-time automated feedback, vulnerability detection, and code optimization recommendations.
- **Verifiable Credential Verification**: Real-time certificate lookups and verification system for recruiters and academic institutions.
- **Interactive Experience**: Built with smooth micro-interactions, responsive design, fluid transitions with Motion, and instant preloading.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/), Canvas Confetti
- **Backend & Server**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx)
- **AI Integration**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **Build & Bundling**: [Vite](https://vitejs.dev/), [esbuild](https://esbuild.github.io/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn**

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/axentra-technologies.git
cd axentra-technologies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Development Mode

Start the express server with Vite middleware in development mode:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 📦 Build & Production Deployment

To compile client assets with Vite and bundle the server using `esbuild`:

```bash
# Build the application
npm run build

# Start the compiled production server
npm run start
```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/            # UI Components
│   │   ├── AboutSection.tsx   # About & Mission details
│   │   ├── CertificateSection.tsx # Verifiable certificates search & modal
│   │   ├── CompanyMarquee.tsx # Trusted technology partners marquee
│   │   ├── DomainDetailPage.tsx # Interactive domain track workspace & task submission
│   │   ├── DomainGrid.tsx     # Domain track listing & duration selection
│   │   ├── Footer.tsx         # Footer links & copyright
│   │   ├── Header.tsx         # Navigation header & brand identity
│   │   ├── Hero.tsx           # Hero section with animated words
│   │   ├── Preloader.tsx      # Smooth initial page loader
│   │   └── ProcessSteps.tsx   # Step-by-step internship workflow
│   ├── data/                  # Static datasets & track definitions
│   ├── lib/                   # Utility helpers & API proxies
│   ├── types.ts               # Core TypeScript definitions & interfaces
│   ├── App.tsx                # Main Application component & routing state
│   ├── main.tsx               # Client entry point
│   └── index.css              # Global styles & Tailwind v4 directive
├── server.ts                  # Express server & Gemini API routes
├── metadata.json              # App configuration metadata
├── package.json               # Dependencies & scripts
└── vite.config.ts             # Vite build configuration
```

---

## 📜 NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `tsx server.ts` | Runs the server and Vite dev server on port 3000 |
| `npm run build` | `vite build && esbuild server.ts ...` | Compiles front-end assets and bundles `server.ts` to `dist/server.cjs` |
| `npm run start` | `node dist/server.cjs` | Launches the production bundled server |
| `npm run lint` | `tsc --noEmit` | Runs TypeScript type checker |
| `npm run clean` | `rm -rf dist server.js` | Cleans build artifacts |

---

## 🛡️ License

This project is proprietary software under Axentra Technologies. All rights reserved.
