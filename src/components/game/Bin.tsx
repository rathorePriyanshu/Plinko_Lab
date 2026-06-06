interface BinProps {
    index: number;
    multiplier: number;
    selected: boolean
}

export default function Bin({
    index,
    multiplier,
    selected
}: BinProps) {
    return (
        <div
            className={`
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                min-w-[60px]
                p-2.5
                transition-all
                duration-500

                ${selected
                    ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.45)] ring-2 ring-yellow-500/40 scale-110 font-bold"
                    : "border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700"
                }
            `}
        >

            <span className="font-extrabold text-sm tracking-tight">
                {multiplier}x
            </span>

            <span className="text-[10px] font-bold opacity-60">
                {index}
            </span>
        </div>
    );
}