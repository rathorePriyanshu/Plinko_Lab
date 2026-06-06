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

    const isTilted =
        useGameStore(
            state => state.isTilted
        );

    const showDebugGrid =
        useGameStore(
            state => state.showDebugGrid
        );

    const BOARD_WIDTH = 700;

    const BOARD_HEIGHT =
        ROWS * V_SPACING;

    const BOARD_CENTER =
        BOARD_WIDTH / 2;

    return (
        <div className="overflow-x-auto">

            <div
                className={`
                    relative
                    mx-auto
                    transition-all
                    duration-500
                    ease-in-out
                    ${isTilted
                        ? `
                                rotate-[5deg]
                                sepia
                                saturate-150
                                contrast-125
                                brightness-95
                              `
                        : ""
                    }
                `}
                style={{
                    width: BOARD_WIDTH,
                }}
            >

                {isTilted && (
                    <div
                        className="
                            absolute
                            right-4
                            top-4
                            z-50
                            rounded
                            bg-yellow-500
                            px-3
                            py-2
                            text-sm
                            font-bold
                            text-black
                            shadow-lg
                        "
                    >
                        TILT MODE
                    </div>
                )}

                {showDebugGrid && (
                    <div
                        className="
                            absolute
                            left-4
                            top-4
                            z-50
                            rounded
                            bg-red-500
                            px-3
                            py-2
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                        "
                    >
                        DEBUG GRID
                    </div>
                )}

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
                            <div
                                key={index}
                            >

                                <Peg
                                    x={
                                        peg.x +
                                        BOARD_CENTER
                                    }
                                    y={peg.y}
                                />

                                {showDebugGrid && (
                                    <div
                                        className="
                                            absolute
                                            pointer-events-none
                                            text-[10px]
                                            font-bold
                                            text-red-500
                                        "
                                        style={{
                                            left:
                                                peg.x +
                                                BOARD_CENTER +
                                                10,
                                            top:
                                                peg.y -
                                                10,
                                        }}
                                    >
                                        (
                                        {Math.round(
                                            peg.x
                                        )}
                                        ,
                                        {Math.round(
                                            peg.y
                                        )}
                                        )
                                    </div>
                                )}

                            </div>
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