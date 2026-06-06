"use client";

interface Props {
    path: ("L" | "R")[];
}

export default function PathReplay({
    path,
}: Props) {
    return (
        <div className="pt-4 border-t border-zinc-800/60 space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Deterministic Path Replay
            </h3>

            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                {path.map((direction, index) => {
                    const isLeft = direction === "L";
                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide border transition-all ${
                                isLeft
                                    ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                                    : "bg-yellow-500/10 border-yellow-500/25 text-yellow-500"
                            }`}
                        >
                            <span className="opacity-60 font-medium">Row {index + 1}:</span>
                            <span>{direction}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}