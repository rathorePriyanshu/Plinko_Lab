"use client";

import Link from "next/link";

interface Round {
    id: string;
    status: string;
    binIndex: number | null;
    payoutMultiplier: number | null;
    createdAt: string;
}

interface Props {
    rounds: Round[];
}

export default function HistoryTable({
    rounds,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-md shadow-xl">
                <table className="min-w-full divide-y divide-zinc-800/80">
                    <thead>
                        <tr className="bg-zinc-900/40 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            <th className="p-4 text-left">Round ID</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Bin</th>
                            <th className="p-4 text-left">Multiplier</th>
                            <th className="p-4 text-left">Created</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850 text-sm font-semibold text-zinc-200">
                        {rounds.map((round) => {
                            const isRevealed = round.status === "REVEALED";
                            const isStarted = round.status === "STARTED";

                            return (
                                <tr
                                    key={round.id}
                                    className="hover:bg-zinc-900/40 even:bg-zinc-900/10 transition-colors duration-200"
                                >
                                    <td className="p-4 font-mono text-xs text-zinc-450">
                                        {round.id.slice(0, 12)}...
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                            isRevealed
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : isStarted
                                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                                    : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        }`}>
                                            {round.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-zinc-300">
                                        {round.binIndex ?? "—"}
                                    </td>
                                    <td className="p-4 font-mono text-zinc-300">
                                        {round.payoutMultiplier !== null ? `${round.payoutMultiplier}x` : "—"}
                                    </td>
                                    <td className="p-4 text-xs text-zinc-500">
                                        {new Date(round.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link
                                            href={`/round/${round.id}`}
                                            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 hover:text-zinc-50 active:scale-95 transition-all text-center inline-block cursor-pointer"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden flex flex-col gap-4">
                {rounds.map((round) => {
                    const isRevealed = round.status === "REVEALED";
                    const isStarted = round.status === "STARTED";

                    return (
                        <div
                            key={round.id}
                            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-zinc-750 transition-all duration-300"
                        >
                            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Round ID</span>
                                    <span className="font-mono text-xs text-zinc-400">{round.id.slice(0, 16)}...</span>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                    isRevealed
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : isStarted
                                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                }`}>
                                    {round.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-zinc-950/40 p-2.5 border border-zinc-800 rounded-xl flex flex-col justify-center items-center">
                                    <span className="text-[9px] font-bold text-zinc-550 uppercase tracking-wider block">Bin</span>
                                    <span className="font-mono text-sm font-bold text-zinc-200 mt-0.5">{round.binIndex ?? "—"}</span>
                                </div>
                                <div className="bg-zinc-950/40 p-2.5 border border-zinc-800 rounded-xl flex flex-col justify-center items-center">
                                    <span className="text-[9px] font-bold text-zinc-550 uppercase tracking-wider block">Payout</span>
                                    <span className="font-mono text-sm font-bold text-zinc-200 mt-0.5">
                                        {round.payoutMultiplier !== null ? `${round.payoutMultiplier}x` : "—"}
                                    </span>
                                </div>
                                <div className="bg-zinc-950/40 p-2.5 border border-zinc-800 rounded-xl flex flex-col justify-center items-center">
                                    <span className="text-[9px] font-bold text-zinc-555 uppercase tracking-wider block">Date</span>
                                    <span className="text-[10px] font-semibold text-zinc-400 mt-0.5">
                                        {new Date(round.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/round/${round.id}`}
                                className="w-full h-11 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-zinc-200 hover:text-zinc-50 font-bold text-sm tracking-wide active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
                            >
                                View Details
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}