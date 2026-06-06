import { NextRequest, NextResponse } from "next/server";
import { revealRound } from "@/lib/rounds/round-service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    try {
        const { id } = await params;
        const result = await revealRound(id);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        );
    }
}