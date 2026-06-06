"use client";

import { revealRound } from "@/lib/api/game-api";
import { useGameStore } from "@/store/game-store";

export default function RevealButton() {
    const {
        roundId,
        serverSeed,
        setRoundData,
    } = useGameStore();

    const handleReveal =
        async () => {

            if (!roundId) {
                return;
            }

            try {

                const result =
                    await revealRound(
                        roundId
                    );

                setRoundData({
                    serverSeed:
                        result.serverSeed,

                    revealedAt:
                        result.revealedAt,
                });

            } catch (error) {
                console.error(error);
            }
        };

    return (
        <button
            onClick={handleReveal}
            disabled={
                !roundId ||
                !!serverSeed
            }
            className="
                rounded
                bg-green-600
                px-4
                py-2
                text-white
                disabled:opacity-50
            "
        >
            {
                serverSeed
                    ? "REVEALED"
                    : "Reveal Server Seed"
            }
        </button>
    );
}