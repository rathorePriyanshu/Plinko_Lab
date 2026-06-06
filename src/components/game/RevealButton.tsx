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
                w-full
                h-11
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-500
                active:scale-95
                text-white
                font-bold
                text-xs
                tracking-wider
                uppercase
                shadow-lg
                shadow-emerald-950/20
                transition-all
                disabled:opacity-40
                disabled:pointer-events-none
                cursor-pointer
                flex
                items-center
                justify-center
            "
        >
            {
                serverSeed
                    ? "REVEALED"
                    : "Reveal Seed"
            }
        </button>
    );
}