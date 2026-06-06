import { prisma } from "@/lib/prisma";
import { generateServerSeed, generateNonce, createCommit } from "@/lib/engine/verifier";
import { PAYOUTS } from "@/constants/payouts";
import { createCombinedSeed } from "@/lib/engine/verifier";
import { runPlinkoEngine } from "@/lib/engine/plinko-engine";

export async function createRound() {
    const serverSeed =
        generateServerSeed();

    const nonce =
        generateNonce();

    const commitHex =
        createCommit(
            serverSeed,
            nonce
        );

    const round =
        await prisma.round.create({
            data: {
                nonce,
                commitHex,
                serverSeed,
            },
        });

    return {
        roundId: round.id,
        commitHex,
        nonce,
        rows: 12,
        status: round.status,
    };
}

export async function startRound(
    roundId: string,
    clientSeed: string,
    betCents: number,
    dropColumn: number
) {
    const round =
        await prisma.round.findUnique({
            where: {
                id: roundId,
            },
        });

    if (!round) {
        throw new Error(
            "Round not found"
        );
    }

    if (!round.serverSeed) {
        throw new Error(
            "Missing server seed"
        );
    }

    const combinedSeed =
        createCombinedSeed(
            round.serverSeed,
            clientSeed,
            round.nonce
        );

    const engineResult =
        runPlinkoEngine(
            combinedSeed,
            round.rows,
            dropColumn
        );

    const payoutMultiplier =
        PAYOUTS[
        engineResult.binIndex
        ];

    const updatedRound =
        await prisma.round.update({
            where: {
                id: roundId,
            },
            data: {
                status: "STARTED",
                clientSeed,
                combinedSeed,
                pegMapHash: engineResult.pegMapHash,
                dropColumn,
                binIndex: engineResult.binIndex,
                payoutMultiplier,
                betCents,
                pathJson: JSON.stringify(engineResult.path),
            },
        });

    return {
        roundId: updatedRound.id,
        pegMapHash: engineResult.pegMapHash,
        rows: updatedRound.rows,
        binIndex: engineResult.binIndex,
        payoutMultiplier,
    };
}