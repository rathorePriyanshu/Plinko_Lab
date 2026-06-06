"use client";

import { useEffect, useMemo, useState } from "react";
import Ball from "./Ball";
import { useReducedMotion } from "@/hooks/usereduceMotion";
import { pathToCoordinates } from "@/lib/plinko/path-to-coordinates";
import { useGameStore } from "@/store/game-store";

interface Props {
    onPegHit?: (row: number) => void;
    onFinish?: () => void;
}

export default function AnimatedBall({ onPegHit, onFinish }: Props) {

    const path = useGameStore(state => state.path);
    const reducedMotion = useReducedMotion();

    const isAnimating = useGameStore(state => state.isAnimating);

    const setAnimating = useGameStore(state => state.setAnimating);
    const coordinates = useMemo(() => pathToCoordinates(path), [path]);

    const [currentIndex, setCurrentIndex] = useState(reducedMotion ? coordinates.length - 1 : 0);

    useEffect(() => {
        if (!isAnimating || coordinates.length === 0) {
            return;
        }

        if (reducedMotion) {
            onFinish?.();
            return;
        }

        setCurrentIndex(0);
        let index = 0;

        const interval =
            setInterval(() => {
                index++;
                if (index >= coordinates.length) {
                    clearInterval(interval);
                    setCurrentIndex(coordinates.length - 1);
                    setAnimating(false);
                    onFinish?.();

                    return;
                }

                onPegHit?.(index);
                setCurrentIndex(index);

            }, 180);

        return () => clearInterval(interval);
    }, [
        coordinates,
        isAnimating,
        reducedMotion,
        onPegHit,
        onFinish,
        setAnimating,
    ]);

    const point = coordinates[Math.min(currentIndex, coordinates.length - 1)];

    if (!point) {
        return null;
    }

    return (
        <Ball
            x={point.x + 350}
            y={point.y}
        />
    );
}