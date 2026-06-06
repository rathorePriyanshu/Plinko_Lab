import { NextRequest, NextResponse } from "next/server";
import { getRecentRounds } from "@/lib/rounds/round-service";

export async function GET(request: NextRequest) {
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 20;
    const rounds = await getRecentRounds(limit);

    return NextResponse.json(
        rounds
    );
}