import { PAYOUTS } from "@/constants/payouts";

export default function PayTable() {
    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/10 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-zinc-100">
                    Bin Multipliers
                </h2>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800/60 uppercase tracking-wider">
                    Symmetric Risk Profile
                </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-13 gap-2">
                {PAYOUTS.map((multiplier, index) => {
                    // Highlight classification
                    const isHighRisk = index <= 1 || index >= 11;
                    const isCenter = index === 6;

                    let cardClass = "";
                    let label = "";

                    if (isHighRisk) {
                        cardClass = "bg-red-500/5 border-red-500/35 text-red-400 hover:bg-red-500/10 shadow-lg shadow-red-500/5";
                        label = "Risk";
                    } else if (isCenter) {
                        cardClass = "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700";
                        label = "Safe";
                    } else {
                        cardClass = "bg-amber-500/5 border-amber-500/25 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/40";
                        label = "Mid";
                    }

                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all duration-300 group cursor-default relative overflow-hidden ${cardClass}`}
                        >
                            <span className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-0.5">
                                Bin {index}
                            </span>
                            <span className="text-base font-extrabold tracking-tight group-hover:scale-110 transition-transform">
                                {multiplier}x
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 mt-1 opacity-70">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}