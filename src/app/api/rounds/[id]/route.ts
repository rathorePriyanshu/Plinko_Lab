import { NextResponse } from "next/server";
import { getRound } from "@/lib/rounds/round-service";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
) {
    try {
        const { id } = await params;
        const round = await getRound(id);

        return NextResponse.json(round);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 404 }
        );
    }
}