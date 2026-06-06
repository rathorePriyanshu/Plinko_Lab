"use client";
import { createRound, startRound } from "@/lib/api/game-api";
import { useGameStore } from "@/store/game-store";

export default function GameControls() {

    const {
        dropColumn,
        clientSeed,
        betAmount,
        isAnimating,
        setDropColumn,
        setBetAmount,
        setClientSeed,
        setAnimating,
        setRoundData } = useGameStore();

    const handleDrop = async () => {
        try {
            setAnimating(true);
            const round = await createRound();

            setRoundData({
                roundId: round.roundId,
                commitHash: round.commitHex,
            });

            if (!clientSeed.trim()) {
                return;
            }

            const result = await startRound(
                round.roundId,
                clientSeed,
                betAmount,
                dropColumn
            );

            setRoundData({
                pegMapHash: result.pegMapHash,
                binIndex: result.binIndex,
                multiplier: result.payoutMultiplier,
                path: result.path,
            });
        } catch (error) {
            console.error(error);
            setAnimating(false);
        }
    };

    return (
        <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={() =>
                        setDropColumn(Math.max(0, dropColumn - 1))
                    }
                    className="border px-3 py-2 rounded"
                >
                    ←
                </button>

                <span className="font-bold text-xl">
                    {dropColumn}
                </span>

                <button
                    onClick={() => setDropColumn(Math.min(12, dropColumn + 1))}
                    className="border px-3 py-2 rounded"
                >
                    →
                </button>
            </div>

            <input
                type="number"
                value={betAmount}
                onChange={e => setBetAmount(Number(e.target.value))}
                placeholder="Bet Amount"
                className="border p-3 rounded"
            />

            <input
                type="text"
                value={clientSeed}
                onChange={e => setClientSeed(e.target.value)}
                placeholder="Client Seed"
                className="border p-3 rounded"
            />

            <button
                onClick={handleDrop}
                disabled={!clientSeed.trim() || isAnimating}
                className="rounded bg-yellow-500 px-4 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                DROP BALL
            </button>

        </div>
    );
}