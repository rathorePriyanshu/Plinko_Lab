"use client";

import { useState } from "react";
import PathReplay from "./PathReplay";

interface Props {
    result: {
        commitHex: string;
        combinedSeed: string;
        pegMapHash: string;
        binIndex: number;
        path: ("L" | "R")[];
        verified: boolean;
    };
}

function StatCard({ label, value, copyable = false }: { label: string; value: string | number; copyable?: boolean }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(value));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl relative group hover:border-zinc-750 transition-all duration-300">
            <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
                {copyable && value && (
                    <button
                        onClick={handleCopy}
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-[10px] text-zinc-500 hover:text-yellow-500 transition-all font-bold cursor-pointer"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                )}
            </div>
            <p className="text-xs font-bold font-mono text-zinc-200 break-all select-all leading-relaxed">
                {value}
            </p>
        </div>
    );
}

export default function VerificationResult({
    result,
}: Props) {
    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
                Verification Result
            </h2>

            <div
                className={`
                    rounded-xl
                    py-3
                    px-4
                    text-center
                    font-extrabold
                    text-sm
                    tracking-wider
                    border
                    transition-all
                    ${result.verified
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }
                `}
            >
                {result.verified
                    ? "✅ VERIFICATION SUCCESSFUL"
                    : "❌ VERIFICATION FAILED"
                }
            </div>

            <div className="grid grid-cols-1 gap-3">
                <StatCard label="Commit Hash" value={result.commitHex} copyable />
                <StatCard label="Combined Seed" value={result.combinedSeed} copyable />
                <StatCard label="Peg Map Hash" value={result.pegMapHash} copyable />
                
                <div className="bg-zinc-950/60 p-3.5 border border-zinc-800 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Target Bin Index</span>
                    <span className="font-mono text-sm font-extrabold text-yellow-500">{result.binIndex}</span>
                </div>
            </div>

            <PathReplay path={result.path} />
        </div>
    );
}