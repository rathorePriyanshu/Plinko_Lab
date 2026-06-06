"use client";

import { useMemo } from "react";

import Peg from "./Peg";
import Bin from "./Bin";
import AnimatedBall from "./AnimatedBall";

import { PAYOUTS } from "@/constants/payouts";
import {
    generatePegPositions,
    ROWS,
    V_SPACING,
    H_SPACING,
} from "@/lib/plinko/board-layout";
import {
    useGameStore,
} from "@/store/game-store";

import {
    playPegSound,
    playWinSound,
} from "@/lib/sound/sound-manage";

import {
    fireConfetti,
} from "@/lib/confetti/confetti";

export default function PlinkoBoard() {

    const pegs = useMemo(
        () => generatePegPositions(),
        []
    );

    const multiplier =
        useGameStore(
            state => state.multiplier
        );

    const path =
        useGameStore(
            state => state.path
        );

    const binIndex =
        useGameStore(
            state => state.binIndex
        );

    const BOARD_WIDTH = 700;

    const BOARD_HEIGHT =
        ROWS * V_SPACING;

    const BOARD_CENTER =
        BOARD_WIDTH / 2;

    return (
        <div className="overflow-x-auto">

            <div
                className="mx-auto"
                style={{
                    width: BOARD_WIDTH,
                }}
            >

                <div
                    className="relative"
                    style={{
                        width: BOARD_WIDTH,
                        height: BOARD_HEIGHT,
                    }}
                >

                    {path.length > 0 && (
                        <AnimatedBall
                            onPegHit={() => {
                                playPegSound();
                            }}
                            onFinish={() => {

                                playWinSound();

                                if (
                                    multiplier &&
                                    multiplier > 1
                                ) {
                                    fireConfetti();
                                }
                            }}
                        />
                    )}

                    {pegs.map(
                        (
                            peg,
                            index
                        ) => (
                            <Peg
                                key={index}
                                x={
                                    peg.x +
                                    BOARD_CENTER
                                }
                                y={peg.y}
                            />
                        )
                    )}

                </div>

                <div
                    className="relative mt-4"
                    style={{
                        width: BOARD_WIDTH,
                        height: 80,
                    }}
                >
                    {PAYOUTS.map(
                        (
                            payout,
                            index
                        ) => (
                            <div
                                key={index}
                                className="
                    absolute
                    -translate-x-1/2
                "
                                style={{
                                    left:
                                        BOARD_CENTER +
                                        (index - 6) *
                                        H_SPACING,
                                }}
                            >
                                <Bin
                                    index={index}
                                    multiplier={payout}
                                    selected={
                                        binIndex === index
                                    }
                                />
                            </div>
                        )
                    )}
                </div>

            </div>

        </div>
    );
}