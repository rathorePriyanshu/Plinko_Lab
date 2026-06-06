"use client";

import { useGameStore }
    from "@/store/game-store";

export default function GameControls() {

    const {
        dropColumn,
        setDropColumn,
    } = useGameStore();

    return (
        <div className="flex gap-4">

            <button
                onClick={() =>
                    setDropColumn(
                        Math.max(
                            0,
                            dropColumn - 1
                        )
                    )
                }
            >
                ←
            </button>

            <span>
                {dropColumn}
            </span>

            <button
                onClick={() =>
                    setDropColumn(
                        Math.min(
                            12,
                            dropColumn + 1
                        )
                    )
                }
            >
                →
            </button>

        </div>
    );
}