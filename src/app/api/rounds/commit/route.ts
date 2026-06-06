import { createRound } from "@/lib/rounds/round-service";

export async function POST() {
    try {
        const round = await createRound();

        return Response.json(round);
    } catch (error) {
        return Response.json(
            {
                error: "Failed to create round",
            },
            {
                status: 500,
            }
        );
    }
}