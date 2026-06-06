"use client";

import { useState } from "react";
import { useGameStore } from "@/store/game-store";
import RevealButton from "./RevealButton";
import OpenVerifierButton from "../verifier/OpenVerifierButton";
import { Clipboard, Check } from "lucide-react";

interface CopyableValueProps {
    value: string | number | null;
    truncate?: boolean;
}

function CopyableValue({ value, truncate = false }: CopyableValueProps) {
    const [copied, setCopied] = useState(false);

    if (!value) return <span className="text-zinc-500 font-mono">—</span>;

    const str = String(value);
    const displayVal = truncate && str.length > 16
        ? `${str.slice(0, 8)}...${str.slice(-8)}`
        : str;

    const handleCopy = () => {
        navigator.clipboard.writeText(str);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex items-center gap-2 group/copy font-mono text-xs font-semibold text-zinc-200">
            <span className="select-all">{displayVal}</span>
            <button
                onClick={handleCopy}
                className="opacity-0 group-hover/copy:opacity-100 focus:opacity-100 text-zinc-500 hover:text-yellow-500 transition-all cursor-pointer p-0.5 rounded hover:bg-zinc-800/50"
                title="Copy full value"
            >
                {copied ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                    <Clipboard className="h-3 w-3" />
                )}
            </button>
        </div>
    );
}

export default function RoundInfo() {
    const {
        roundId,
        commitHash,
        nonce,
        clientSeed,
        dropColumn,
        pegMapHash,
        binIndex,
        multiplier,
        serverSeed,
        revealedAt,
    } = useGameStore();

    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/10 space-y-5">
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">
                Round Details
            </h2>

            {/* List details */}
            <div className="divide-y divide-zinc-800/50 text-sm font-semibold">
                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Round ID</span>
                    <CopyableValue value={roundId} />
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Commit Hash</span>
                    <CopyableValue value={commitHash} truncate />
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Nonce</span>
                    <span className="font-mono text-xs text-zinc-200">{nonce ?? "—"}</span>
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Client Seed</span>
                    <span className="font-mono text-xs text-zinc-200 truncate max-w-[120px]" title={clientSeed || ""}>
                        {clientSeed || "—"}
                    </span>
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Drop Column</span>
                    <span className="font-mono text-xs text-zinc-200">{dropColumn}</span>
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Peg Map Hash</span>
                    <CopyableValue value={pegMapHash} truncate />
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Bin Index</span>
                    <span className={`font-mono text-xs ${binIndex !== null ? "text-yellow-500 font-bold" : "text-zinc-400"}`}>
                        {binIndex ?? "—"}
                    </span>
                </div>

                <div className="py-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Multiplier</span>
                    <span className={`font-mono text-xs ${multiplier !== null ? "text-yellow-500 font-bold" : "text-zinc-400"}`}>
                        {multiplier !== null ? `${multiplier}x` : "—"}
                    </span>
                </div>
            </div>

            {serverSeed && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 space-y-2 relative overflow-hidden">
                    <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Server Seed</span>
                        <span className="text-[9px] font-semibold opacity-80 bg-emerald-500/10 px-1.5 py-0.5 rounded">Provably Fair</span>
                    </div>
                    <div className="py-1">
                        <p className="break-all font-mono text-xs select-all font-semibold leading-relaxed">
                            {serverSeed}
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] opacity-70 pt-2 border-t border-emerald-500/10">
                        <span>Revealed At</span>
                        <span>{revealedAt}</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
                <RevealButton />
                <OpenVerifierButton />
            </div>
        </div>
    );
}