# Job Quest

A premium, industry-grade job application tracker designed for high-performance engineering roles. Featuring a state-of-the-art glassmorphism UI and a robust Postgres-backed data layer.

## 🚀 Features

- **Dashboard**: High-fidelity overview of active applications with real-time status tracking.
- **Conversion Funnel**: Integrated analytics to monitor interview and offer conversion rates.
- **Weekly Velocity**: Interactive bar charts (via Recharts) to track application frequency.
- **90-Day Execution Plan**: Strategic goal tracking to maintain application momentum.
- **Resume Audit System**: Dedicated tracking for resume optimizations and mission-critical fixes.
- **Feature-Driven Architecture**: Decoupled, modular folder structure for scalability.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Recharts
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: Neon Serverless Postgres
- **ORM**: Prisma (v5.21+)
- **Styling**: Vanilla CSS with Design Tokens (Glassmorphism)
- **Language**: TypeScript (Strict Mode)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages & API Handlers)
├── features/             # Feature-driven modules
│   └── jobs/             # Job tracking domain logic (Hooks, Services, Components)
├── shared/               # Reusable UI components and design tokens
│   ├── components/       # Pane, StatBlock, StatusBadge, etc.
│   └── theme/            # Centralized visual configuration (T-object)
```

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have **Bun** installed on your system.

### 2. Environment Setup
Copy the example environment file and provide your **Neon Database URL**:
```bash
cp .env.example .env
# Edit .env and set DATABASE_URL
```

### 3. Installation
```bash
bun install
```

### 4. Database Initialization
Synchronize the schema and generate the client:
```bash
bunx prisma db push
bunx prisma generate
```

### 5. Launch
```bash
bun run dev
```

## 📜 Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts the development server |
| `bun run build` | Generates a production-ready build |
| `bun run lint` | Runs ESLint for code quality checks |
| `bunx prisma studio` | Opens the Prisma database GUI |

---
**Built for the Deep-Tech Empire by [Mayank Pratap Singh](https://steeltroops.vercel.app)**
