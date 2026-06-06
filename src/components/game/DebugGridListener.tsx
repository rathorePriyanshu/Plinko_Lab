"use client";

import {
    useEffect,
} from "react";

import {
    useGameStore,
} from "@/store/game-store";

export default function DebugGridListener() {

    const toggleDebugGrid =
        useGameStore(
            state =>
                state.toggleDebugGrid
        );

    useEffect(() => {

        function handleKeyDown(
            event: KeyboardEvent
        ) {

            if (
                event.key.toLowerCase() ===
                "g"
            ) {
                toggleDebugGrid();
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

    }, [toggleDebugGrid]);

    return null;
}