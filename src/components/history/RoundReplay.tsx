"use client";

interface Props {
    path: ("L" | "R")[];
}

export default function RoundReplay({
    path,
}: Props) {
    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">
                Path Replay
            </h2>

            <div className="flex flex-wrap gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                {path.length === 0 ? (
                    <span className="text-xs text-zinc-500 font-semibold">No path data recorded.</span>
                ) : (
                    path.map((direction, index) => {
                        const isLeft = direction === "L";
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold tracking-wide border transition-all ${
                                    isLeft
                                        ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                                        : "bg-yellow-500/10 border-yellow-500/25 text-yellow-500"
                                }`}
                            >
                                <span className="opacity-60 font-medium">Step {index + 1}:</span>
                                <span>{direction}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}