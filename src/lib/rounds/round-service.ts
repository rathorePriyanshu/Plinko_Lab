import { prisma } from "@/lib/prisma";
import {
    generateServerSeed,
    generateNonce,
    createCommit,
} from "@/lib/engine/verifier";

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