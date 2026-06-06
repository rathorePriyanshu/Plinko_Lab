import { notFound } from "next/navigation";
import Link from "next/link";
import { getRound } from "@/lib/rounds/round-service";
import RoundReplay from "@/components/history/RoundReplay";
import CopyButton from "@/components/ui/CopyButton";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

function DetailRow({ label, value, copyableText }: { label: string; value: string | number | null; copyableText?: string }) {
    return (
        <div className="py-2.5 flex items-center justify-between gap-4 group">
            <span className="text-xs text-zinc-550 uppercase tracking-wider font-semibold">{label}</span>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-200">
                <span className="select-all truncate max-w-[150px]" title={value ? String(value) : ""}>
                    {value ?? "—"}
                </span>
                {copyableText && <CopyButton text={copyableText} />}
            </div>
        </div>
    );
}

export default async function RoundPage({
    params,
}: Props) {

    const { id } = await params;
    const round = await getRound(id);

    if (!round) {
        notFound();
    }

    const path = round.pathJson ? JSON.parse(round.pathJson) : [];

    const verifyUrl =
        round.status === "REVEALED"
            ? `/verify?serverSeed=${round.serverSeed}&clientSeed=${round.clientSeed}&nonce=${round.nonce}&dropColumn=${round.dropColumn}&roundId=${round.id}`
            : null;

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Block */}
                <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            Round Details
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">
                            Detailed cryptographic logs and paths replay for Plinko game.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/history"
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-zinc-100 transition-all text-center inline-block cursor-pointer shadow-md"
                        >
                            ← Back to History
                        </Link>
                    </div>
                </div>

                {/* 3-Column Dashboard / Mobile Vertical Stack */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* LEFT SIDEBAR: Round Info & Identity */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Identity Card */}
                        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
                            <h2 className="text-base font-bold tracking-tight text-zinc-100">
                                Identity & Time
                            </h2>
                            <div className="divide-y divide-zinc-800/50 text-sm">
                                <DetailRow label="Round ID" value={round.id.slice(0, 16) + "..."} copyableText={round.id} />
                                <DetailRow label="Created" value={new Date(round.createdAt).toLocaleString()} />
                                <div className="py-2.5 flex items-center justify-between gap-4">
                                    <span className="text-xs text-zinc-555 uppercase tracking-wider font-semibold">Status</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        round.status === "REVEALED"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    }`}>
                                        {round.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Cryptographic Fairness Card */}
                        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
                            <h2 className="text-base font-bold tracking-tight text-zinc-100">
                                Fairness Parameters
                            </h2>
                            <div className="divide-y divide-zinc-800/50 text-sm">
                                <DetailRow label="Commit Hash" value={round.commitHex.slice(0, 10) + "..."} copyableText={round.commitHex} />
                                <DetailRow label="Client Seed" value={round.clientSeed} copyableText={round.clientSeed ?? undefined} />
                                <DetailRow label="Nonce" value={round.nonce} />
                                <DetailRow label="Peg Map Hash" value={round.pegMapHash ? round.pegMapHash.slice(0, 10) + "..." : "—"} copyableText={round.pegMapHash ?? undefined} />
                            </div>
                        </div>
                    </div>

                    {/* CENTER: Replay & Outcomes */}
                    <div className="lg:col-span-6 space-y-6">
                        
                        {/* Round Path Replay */}
                        <RoundReplay path={path} />

                        {/* Outcomes Card */}
                        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
                            <h2 className="text-base font-bold tracking-tight text-zinc-100">
                                Game Outcome
                            </h2>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                                <div className="bg-zinc-950/40 p-3.5 border border-zinc-800 rounded-xl space-y-0.5">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Multiplier</span>
                                    <span className="font-mono text-base font-extrabold text-yellow-500">
                                        {round.payoutMultiplier !== null ? `${round.payoutMultiplier}x` : "—"}
                                    </span>
                                </div>
                                <div className="bg-zinc-950/40 p-3.5 border border-zinc-800 rounded-xl space-y-0.5">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Target Bin</span>
                                    <span className="font-mono text-base font-extrabold text-yellow-500">
                                        {round.binIndex ?? "—"}
                                    </span>
                                </div>
                                <div className="bg-zinc-950/40 p-3.5 border border-zinc-800 rounded-xl space-y-0.5 col-span-2 sm:col-span-1">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Bet (₹)</span>
                                    <span className="font-mono text-base font-extrabold text-zinc-200">
                                        {round.betCents ? round.betCents / 100 : 0}
                                    </span>
                                </div>
                            </div>

                            <div className="divide-y divide-zinc-800/50 text-sm pt-2">
                                <DetailRow label="Launch Column" value={round.dropColumn} />
                                <DetailRow label="Physics Rows" value={round.rows} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: Actions & Seed Reveal */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Status Card */}
                        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Verification Status</h3>
                            <div className={`px-3 py-2 rounded-xl text-center text-xs font-bold border transition-all ${
                                round.status === "REVEALED"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            }`}>
                                {round.status === "REVEALED" ? "REVEALED & VERIFIABLE" : "ACTIVE / SECURE"}
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">
                                {round.status === "REVEALED"
                                    ? "This round's server seed has been revealed. You can verify the outcome using the verifier page."
                                    : "This round is currently active or unrevealed. The server seed remains hidden to guarantee fairness."}
                            </p>
                        </div>

                        {/* Seed Reveal / Premium Emerald Card */}
                        {round.status === "REVEALED" && round.serverSeed && (
                            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 space-y-2 relative overflow-hidden">
                                <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Server Seed</span>
                                    <span className="text-[9px] font-semibold opacity-80 bg-emerald-500/10 px-1.5 py-0.5 rounded">Provably Fair</span>
                                </div>
                                <div className="py-1">
                                    <p className="break-all font-mono text-xs select-all font-semibold leading-relaxed">
                                        {round.serverSeed}
                                    </p>
                                </div>
                                {round.revealedAt && (
                                    <div className="flex justify-between items-center text-[10px] opacity-70 pt-2 border-t border-emerald-500/10">
                                        <span>Revealed At</span>
                                        <span>{new Date(round.revealedAt).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Verify button action */}
                        {verifyUrl && (
                            <Link
                                href={verifyUrl}
                                className="w-full h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 active:scale-[0.98] text-black font-extrabold text-sm tracking-widest uppercase shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 transition-all cursor-pointer flex items-center justify-center text-center"
                            >
                                Verify This Round
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}