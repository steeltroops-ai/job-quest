# Job Quest

A sophisticated, minimalist career management tool designed to streamline your job search and boost organizational efficiency.

## Core Features

- **Visual Workflow**: Track every stage of your job applications with a clean, intuitive Kanban-inspired layout.
- **Dynamic Analytics**: Gain real-time insights into your application velocity and conversion metrics via interactive charts.
- **Smart Goals**: Stay on track with milestone management designed to maintain your application momentum.
- **Liquid Glass UI**: A premium, "Liquid Glass" design language that offers a distraction-free, professional environment.
- **Universal Reach**: Optimized for all professional roles—from engineering to marketing and creative design.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: PostgreSQL (Prisma ORM)
- **Styling**: Vanilla CSS Design System

## Getting Started

### 1. Prerequisites

Ensure you have **Bun** installed on your system.

### 2. Environment Setup

Copy the example environment file and provide your **PostgreSQL Database URL**:

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL
```

### 3. Installation

Install project dependencies:

```bash
bun install
```

### 4. Database Setup

Initialize the database schema:

```bash
bunx prisma db push
bunx prisma generate
```

### 5. Launch

Start the development server:

```bash
bun run dev
```

## Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts the development server |
| `bun run build` | Generates a production build |
| `bunx prisma studio` | Opens the database GUI |

---
**Built for the next generation of professionals.**
