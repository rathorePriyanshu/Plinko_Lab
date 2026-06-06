interface PegProps {
    x: number;
    y: number;
}

export default function Peg({ x, y }: PegProps) {
    return (
        <div
            className="absolute h-2.5 w-2.5 rounded-full bg-zinc-650 border border-zinc-600 shadow-[0_0_2px_rgba(255,255,255,0.25)]"
            style={{
                left: x,
                top: y,
            }}
        />
    );
}