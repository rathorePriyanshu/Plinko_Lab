interface PegProps {
    x: number;
    y: number;
}

export default function Peg({ x, y }: PegProps) {
    return (
        <div
            className="absolute h-3 w-3 rounded-full bg-slate-300"
            style={{
                left: x,
                top: y,
            }}
        />
    );
}