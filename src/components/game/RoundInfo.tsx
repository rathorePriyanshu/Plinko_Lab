"use client";

import { useGameStore } from "@/store/game-store";

export default function RoundInfo() {
    const {
        roundId,
        commitHash,
        pegMapHash,
        binIndex,
        multiplier,
    } = useGameStore();

    return (
        <div
            className="mt-8 rounded-lg border p-4">
            <h2
                className="mb-4 text-xl font-bold">Round Info
            </h2>

            <div className="space-y-2">
                <p>
                    <strong>
                        Round ID:
                    </strong>{" "}
                    {roundId ?? "-"}
                </p>
                <p>
                    <strong>
                        Commit Hash:
                    </strong>{" "}
                    {commitHash ?? "-"}
                </p>
                <p>
                    <strong>
                        Peg Map Hash:
                    </strong>{" "}
                    {pegMapHash ?? "-"}
                </p>
                <p>
                    <strong>
                        Bin Index:
                    </strong>{" "}
                    {binIndex ?? "-"}
                </p>
                <p>
                    <strong>
                        Multiplier:
                    </strong>{" "}
                    {multiplier ?? "-"}
                </p>

            </div>
        </div>
    );
}