import { startRound } from "@/lib/rounds/round-service";
import { startRoundSchema } from "@/types/start-round";

export async function POST(request: Request, { params }: {
    params: Promise<{
        id: string;
    }>;
}
) {
    try {
        const body = await request.json();
        const parsed = startRoundSchema.parse(body);
        const { id } = await params;

        const result = await startRound(
            id,
            parsed.clientSeed,
            parsed.betCents,
            parsed.dropColumn
        );

        return Response.json(
            result
        );
    } catch (error) {
        return Response.json(
            {
                error:
                    "Failed to start round",
            },
            {
                status: 400,
            }
        );
    }
}