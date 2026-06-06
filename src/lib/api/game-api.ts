export async function createRound() {
    const response =
        await fetch(
            "/api/rounds/commit",
            {
                method: "POST",
            }
        );

    if (!response.ok) {
        throw new Error(
            "Failed to create round"
        );
    }

    return response.json();
}

export async function startRound(
    roundId: string,
    clientSeed: string,
    betCents: number,
    dropColumn: number
) {
    const response =
        await fetch(
            `/api/rounds/${roundId}/start`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    clientSeed,
                    betCents,
                    dropColumn,
                }),
            }
        );

    if (!response.ok) {
        throw new Error(
            "Failed to start round"
        );
    }

    return response.json();
}

export async function revealRound(
    roundId: string
) {
    const response =
        await fetch(
            `/api/rounds/${roundId}/reveal`,
            {
                method: "POST",
            }
        );

    return response.json();
}