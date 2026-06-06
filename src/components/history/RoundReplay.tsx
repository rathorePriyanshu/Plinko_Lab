"use client";

interface Props {
    path: ("L" | "R")[];
}

export default function RoundReplay({
    path,
}: Props) {

    return (
        <div
            className="
                rounded-lg
                border
                p-6
            "
        >
            <h2
                className="
                    mb-4
                    text-xl
                    font-bold
                "
            >
                Path Replay
            </h2>

            <div
                className="
                    flex
                    flex-wrap
                    gap-2
                "
            >
                {path.map(
                    (
                        direction,
                        index
                    ) => (
                        <div
                            key={index}
                            className={`
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-white
                                font-bold
                                ${direction ===
                                    "L"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                                }
                            `}
                        >
                            {direction}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}