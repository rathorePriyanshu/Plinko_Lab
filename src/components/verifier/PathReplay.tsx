"use client";

interface Props {
    path: ("L" | "R")[];
}

export default function PathReplay({
    path,
}: Props) {

    return (
        <div
            className="
                mt-6
                rounded-lg
                border
                p-4
            "
        >
            <h3
                className="
                    mb-4
                    text-lg
                    font-bold
                "
            >
                Deterministic Path Replay
            </h3>

            <div
                className="
                    flex
                    flex-wrap
                    gap-2
                "
            >
                {
                    path.map(
                        (
                            direction,
                            index
                        ) => (
                            <div
                                key={index}
                                className={`
                                    rounded
                                    px-3
                                    py-2
                                    text-white
                                    font-bold
                                    ${direction === "L"
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                                    }
                                `}
                            >
                                Row {index + 1}
                                :
                                {" "}
                                {direction}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}