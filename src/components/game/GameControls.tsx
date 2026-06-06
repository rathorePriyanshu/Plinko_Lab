"use client";
import { createRound, startRound } from "@/lib/api/game-api";
import { useGameStore } from "@/store/game-store";
import MuteButton from "./MuteButton";

export default function GameControls() {

    const {
        dropColumn,
        clientSeed,
        betAmount,
        isAnimating,
        isTilted,
        showDebugGrid,
        setDropColumn,
        setBetAmount,
        setClientSeed,
        setAnimating,
        setRoundData } = useGameStore();

    const isBetInvalid = isNaN(betAmount) || betAmount < 1;

    const handleDrop = async () => {

        if (
            !clientSeed.trim() ||
            isAnimating ||
            isBetInvalid
        ) {
            return;
        }

        const finalBet = isNaN(betAmount) || betAmount < 1 ? 1 : Math.floor(betAmount);

        try {

            setRoundData({
                path: [],
                binIndex: null,
                multiplier: null,
                pegMapHash: null,
                serverSeed: null,
                revealedAt: null,
                verificationStatus: null,
                roundId: null,
                commitHash: null,
                nonce: null,
            });

            const round =
                await createRound();

            setRoundData({
                roundId:
                    round.roundId,

                commitHash:
                    round.commitHex,
                nonce: round.nonce,
            });

            const result =
                await startRound(
                    round.roundId,
                    clientSeed,
                    finalBet,
                    dropColumn
                );

            console.log(
                "PATH",
                result.path
            );

            console.log(
                "PATH LENGTH",
                result.path.length
            );

            console.log(
                "BIN",
                result.binIndex
            );

            setRoundData({
                pegMapHash:
                    result.pegMapHash,

                binIndex:
                    result.binIndex,

                multiplier:
                    result.payoutMultiplier,

                path:
                    result.path,
                isAnimating: true
            });

            setAnimating(true);

        } catch (error) {

            console.error(error);

            setAnimating(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Game Controls Card */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/10 space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                    <span>Game Controls</span>
                </h2>

                {/* Drop Column Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Drop Column
                    </label>
                    <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-2 h-14">
                        <button
                            onClick={() =>
                                setDropColumn(Math.max(0, dropColumn - 1))
                            }
                            disabled={isAnimating}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 active:scale-95 transition-all text-zinc-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            ←
                        </button>

                        <span className="font-bold text-2xl text-yellow-500 font-mono">
                            {dropColumn}
                        </span>

                        <button
                            onClick={() => setDropColumn(Math.min(12, dropColumn + 1))}
                            disabled={isAnimating}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 active:scale-95 transition-all text-zinc-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Bet Amount */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Bet Amount (₹)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                        <input
                            type="number"
                            value={isNaN(betAmount) ? "" : betAmount}
                            onChange={e => {
                                const val = e.target.value === "" ? NaN : Number(e.target.value);
                                setBetAmount(val);
                            }}
                            onBlur={() => {
                                if (isNaN(betAmount) || betAmount < 1) {
                                    setBetAmount(1);
                                } else {
                                    setBetAmount(Math.floor(betAmount));
                                }
                            }}
                            disabled={isAnimating}
                            placeholder="Bet Amount"
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-xl pl-8 pr-4 h-14 text-zinc-100 placeholder-zinc-700 font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                        />
                    </div>
                </div>

                {/* Client Seed */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Client Seed
                    </label>
                    <input
                        type="text"
                        value={clientSeed}
                        onChange={e => setClientSeed(e.target.value)}
                        disabled={isAnimating}
                        placeholder="Enter Client Seed"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-xl px-4 h-14 text-zinc-100 placeholder-zinc-700 font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                    />
                </div>

                {/* Drop Ball Button */}
                <button
                    onClick={handleDrop}
                    disabled={!clientSeed.trim() || isAnimating || isBetInvalid}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 active:scale-[0.98] text-black font-extrabold text-lg tracking-wide shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                    DROP BALL
                </button>
            </div>

            {/* Quick Status / Settings card */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/10 space-y-4">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    System Status
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-300">Audio Muted</span>
                    <MuteButton />
                </div>

                <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between">
                    <div>
                        <span className="text-sm text-zinc-300 block">Tilt Mode</span>
                        <span className="text-xs text-zinc-500">Press &apos;T&apos; to trigger</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${isTilted
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                            : "bg-zinc-950 text-zinc-500 border-zinc-800"
                        }`}>
                        {isTilted ? "Tilted" : "Normal"}
                    </span>
                </div>

                <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between">
                    <div>
                        <span className="text-sm text-zinc-300 block">Debug Grid</span>
                        <span className="text-xs text-zinc-500">Press &apos;G&apos; to trigger</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${showDebugGrid
                            ? "bg-red-500/10 text-red-400 border-red-500/30"
                            : "bg-zinc-950 text-zinc-500 border-zinc-800"
                        }`}>
                        {showDebugGrid ? "Visible" : "Hidden"}
                    </span>
                </div>
            </div>
        </div>
    );
}