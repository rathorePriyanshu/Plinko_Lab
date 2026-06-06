import { NextRequest, NextResponse } from "next/server";
import { createCommit, createCombinedSeed } from "@/lib/engine/verifier";
import { runPlinkoEngine } from "@/lib/engine/plinko-engine";

export async function GET(
    request: NextRequest
) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const serverSeed = searchParams.get("serverSeed");
        const clientSeed = searchParams.get("clientSeed");
        const nonce = searchParams.get("nonce");
        const dropColumn = Number(searchParams.get("dropColumn"));

        if (!serverSeed || !clientSeed || !nonce) {
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

        const commitHex = createCommit(serverSeed, nonce);
        const combinedSeed = createCombinedSeed(serverSeed, clientSeed, nonce);
        const result = runPlinkoEngine(combinedSeed, 12, dropColumn);

        return NextResponse.json({
            commitHex,
            combinedSeed,
            pegMapHash: result.pegMapHash,
            binIndex: result.binIndex,
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