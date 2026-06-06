-- CreateEnum
CREATE TYPE "RoundStatus" AS ENUM ('CREATED', 'STARTED', 'REVEALED');

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revealedAt" TIMESTAMP(3),
    "status" "RoundStatus" NOT NULL DEFAULT 'CREATED',
    "nonce" TEXT NOT NULL,
    "commitHex" TEXT NOT NULL,
    "serverSeed" TEXT,
    "clientSeed" TEXT,
    "combinedSeed" TEXT,
    "pegMapHash" TEXT,
    "rows" INTEGER NOT NULL DEFAULT 12,
    "dropColumn" INTEGER,
    "binIndex" INTEGER,
    "payoutMultiplier" DOUBLE PRECISION,
    "betCents" INTEGER,
    "pathJson" TEXT,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);
