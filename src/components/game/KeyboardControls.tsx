"use client";

import { useEffect } from "react";

import { useGameStore }
    from "@/store/game-store";

export default function KeyboardControls() {

    const {
        dropColumn,
        setDropColumn,
    } = useGameStore();

    useEffect(() => {

        const handleKeyDown =
            (event: KeyboardEvent) => {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {
                    setDropColumn(
                        Math.max(
                            0,
                            dropColumn - 1
                        )
                    );
                }

                if (
                    event.key ===
                    "ArrowRight"
                ) {
                    setDropColumn(
                        Math.min(
                            12,
                            dropColumn + 1
                        )
                    );
                }
            };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

    }, [
        dropColumn,
        setDropColumn,
    ]);

    return null;
}