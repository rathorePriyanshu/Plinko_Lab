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
        rounded-lg
        border
        min-w-[60px]
        p-2
        transition-all

        ${selected
                    ? "border-yellow-500 bg-yellow-500/10 shadow-lg"
                    : "border-slate-700"
                }
    `}
        >

            <span className="font-bold">
                {multiplier}x
            </span>

            <span className="text-sm">
                {index}
            </span>
        </div>
    );
}