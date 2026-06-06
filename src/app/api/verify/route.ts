import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    createCommit,
    createCombinedSeed,
} from "@/lib/engine/verifier";

import {
    runPlinkoEngine,
} from "@/lib/engine/plinko-engine";

export async function GET(
    request: NextRequest
) {
    try {

        const searchParams =
            request.nextUrl.searchParams;

        const serverSeed =
            searchParams.get(
                "serverSeed"
            );

        const clientSeed =
            searchParams.get(
                "clientSeed"
            );

        const nonce =
            searchParams.get(
                "nonce"
            );

        const roundId =
            searchParams.get(
                "roundId"
            );

        const dropColumn =
            Number(
                searchParams.get(
                    "dropColumn"
                )
            );

        if (
            !serverSeed ||
            !clientSeed ||
            !nonce
        ) {
            return NextResponse.json(
                {
                    error:
                        "Missing query params",
                },
                {
                    status: 400,
                }
            );
        }

        const commitHex =
            createCommit(
                serverSeed,
                nonce
            );

        const combinedSeed =
            createCombinedSeed(
                serverSeed,
                clientSeed,
                nonce
            );

        const result =
            runPlinkoEngine(
                combinedSeed,
                12,
                dropColumn
            );

        let verified =
            false;

        if (roundId) {

            const round =
                await prisma.round.findUnique({
                    where: {
                        id: roundId,
                    },
                });

            verified =
                !!round &&
                round.pegMapHash ===
                result.pegMapHash &&
                round.binIndex ===
                result.binIndex;
        }

        return NextResponse.json({
            commitHex,
            combinedSeed,
            pegMapHash:
                result.pegMapHash,
            binIndex:
                result.binIndex,
            path:
                result.path,
            verified,
        });

    } catch (error) {

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            },
            {
                status: 400,
            }
        );

    }
}