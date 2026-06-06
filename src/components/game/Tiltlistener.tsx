"use client";

import {
    useEffect,
} from "react";

import {
    useGameStore,
} from "@/store/game-store";

export default function TiltListener() {

    const toggleTilt =
        useGameStore(
            state =>
                state.toggleTilt
        );

    useEffect(() => {

        function handleKeyDown(
            event: KeyboardEvent
        ) {

            if (
                event.key.toLowerCase() ===
                "t"
            ) {
                toggleTilt();
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

    }, [toggleTilt]);

    return null;
}