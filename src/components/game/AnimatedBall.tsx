"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import Ball from "./Ball";

import {
    pathToCoordinates,
} from "@/lib/plinko/path-to-coordinates";

import {
    useGameStore,
} from "@/store/game-store";

export default function AnimatedBall() {

    const {
        path,
        isAnimating,
        setAnimating,
    } = useGameStore();

    const [step, setStep] =
        useState(0);

    const coordinates =
        useMemo(
            () =>
                pathToCoordinates(
                    path
                ),
            [path]
        );

    useEffect(() => {

        if (
            !isAnimating ||
            coordinates.length === 0
        ) {
            return;
        }

        setStep(0);

        let current = 0;

        const interval =
            setInterval(() => {

                current++;

                if (
                    current >=
                    coordinates.length
                ) {

                    clearInterval(
                        interval
                    );

                    setAnimating(
                        false
                    );

                    return;
                }

                setStep(
                    current
                );

            }, 200);

        return () =>
            clearInterval(
                interval
            );

    }, [
        isAnimating,
        coordinates,
        setAnimating,
    ]);

    const point =
        coordinates[
        Math.min(
            step,
            coordinates.length - 1
        )
        ];

    if (!point) {
        return null;
    }

    return (
        <Ball
            x={
                point.x + 350
            }
            y={point.y}
        />
    );
}