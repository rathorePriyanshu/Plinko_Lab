"use client";

import { Volume2, VolumeX } from "lucide-react";
import { setMuted } from "@/lib/sound/sound-manage";
import { useGameStore } from "@/store/game-store";

export default function MuteButton() {

    const {
        isMuted,
        setMuted:
        setMutedStore,
    } = useGameStore();

    const handleClick = () => {
        const next = !isMuted;
        setMutedStore(next);
        setMuted(next);
    };

    return (
        <button
            onClick={handleClick}
            className="border rounded-lg p-2">
            {isMuted
                ? <VolumeX />
                : <Volume2 />}
        </button>
    );
}