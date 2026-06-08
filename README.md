# Plinko Lab

A provably fair Plinko game built with Next.js, TypeScript, Prisma, Zustand, and Tailwind CSS.

The project implements a deterministic Plinko engine using a commit-reveal protocol, deterministic PRNG, reproducible peg maps, round history tracking, replay visualization, and a public verification system.

---

# Features

* Provably Fair commit-reveal protocol
* Deterministic Plinko engine
* Public round verification page
* Deterministic path replay
* Round history and round detail pages
* Reveal server seed workflow
* Responsive dashboard UI
* Reduced motion support
* Sound effects and confetti
* Easter eggs (Tilt Mode, Debug Grid)
* Unit tests for fairness components

---

# Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Zustand

## Backend

* Next.js Route Handlers
* Prisma ORM
* SQLite

## Testing

* Vitest

---

# Running Locally

## Clone Repository

```bash
git clone <https://github.com/rathorePriyanshu/Plinko_Lab.git>
cd plinko-lab
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migrations

```bash
npx prisma migrate dev
```

## Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

# Project Architecture

```text
Client
│
├── Game Controls
├── Plinko Board
├── Verify Page
├── History Page
└── Round Detail Page
        │
        ▼
Next.js Route Handlers
        │
        ▼
Deterministic Plinko Engine
        │
        ▼
Prisma ORM
        │
        ▼
SQLite Database
```

---

# Provably Fair Specification

## Commit-Reveal Protocol

Before a round starts, the server generates:

* serverSeed
* nonce

The server publishes only:

```text
commitHex = SHA256(serverSeed + ":" + nonce)
```

This prevents the server from changing the outcome after the round has begun.

After the round finishes, the server reveals the original serverSeed.

---

## Client Contribution

The player provides:

```text
clientSeed
```

This ensures both client and server contribute entropy to the final outcome.

---

## Combined Seed

The deterministic game outcome is driven by:

```text
combinedSeed =
SHA256(serverSeed + ":" + clientSeed + ":" + nonce)
```

All randomness in the round originates from this value.

---

## Deterministic PRNG

The application uses:

```text
XorShift32
```

The PRNG seed is derived from the first four bytes of the combined seed hash.

```text
seed = first 4 bytes of combinedSeed
```

Because the same seed always produces the same sequence, outcomes are perfectly reproducible.

---

## Peg Map Generation

Rows:

```text
12
```

For each peg:

```text
leftBias =
0.5 + (rand() - 0.5) * 0.2
```

Range:

```text
0.4 → 0.6
```

Bias values are rounded to 6 decimal places before hashing to ensure deterministic reproduction.

---

## Peg Map Hash

The generated peg map is hashed:

```text
pegMapHash =
SHA256(JSON.stringify(pegMap))
```

This value is stored with each round.

---

## Drop Column Influence

Players choose:

```text
dropColumn ∈ [0..12]
```

Bias adjustment:

```text
adj =
(dropColumn - floor(rows / 2))
* 0.01
```

Adjusted bias:

```text
bias =
clamp(leftBias + adj, 0, 1)
```

---

## Path Decisions

For each row:

```text
rnd = rand()
```

Decision:

```text
rnd < bias  → Left
rnd >= bias → Right
```

The total number of right moves determines:

```text
binIndex
```

---

## Verification

The public verifier page recomputes:

* commitHex
* combinedSeed
* pegMapHash
* deterministic path
* final bin index

and compares them against the stored round data.

---

# Testing

Unit tests cover:

* SHA256 combiner logic
* Commit generation
* Combined seed generation
* XorShift32 deterministic behavior
* Plinko engine reproducibility

Run tests:

```bash
npm run test
```

---

# AI Usage

AI was used as an engineering assistant during development.

Areas where AI assistance was used:

* Initial project planning
* Fairness protocol interpretation
* Deterministic engine implementation guidance
* UI/UX iteration and dashboard redesign
* Responsive layout suggestions
* Unit test generation
* Documentation assistance

The generated output was reviewed and adapted manually throughout development.

Several iterations were discarded or modified to better align with the assignment requirements, particularly around:

* Commit-reveal flow
* Verifier behavior
* Round history structure
* Responsive dashboard layouts
* Component organization

The final implementation reflects manual decisions and project-specific adjustments rather than direct generation without review.

---

# Development Time Log

Approximate development time:

## June 5

* Requirement analysis
* Architecture planning
* Project setup
* Database design
* Fairness protocol implementation
* Initial engine development

Time spent:

```text
~7 hours
```

## June 6

* Engine refinement
* Round history
* Reveal workflow
* Verifier implementation
* Replay system
* Unit tests
* UI redesign
* Responsive layouts
* Bug fixing
* Documentation

Time spent:

```text
~15 hours
```

## Total

```text
~22 hours
```

---

# Future Improvements

Given additional development time, the next areas of improvement would be:

* True physics simulation using Matter.js
* Multiplayer leaderboard support
* User authentication
* Persistent player balances
* Analytics dashboard
* Advanced replay visualization
* Fairness audit export tools
* Additional risk profiles and configurable boards
* Real-time game statistics
* CI/CD pipeline and deployment automation

---

# Links

## Live Application

```text
<https://plinko-lab-psi.vercel.app/>
