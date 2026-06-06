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

    const isAnimating =
        useGameStore(
            state => state.isAnimating
        );

    const dropColumn =
        useGameStore(
            state => state.dropColumn
        );

    const BOARD_WIDTH = 700;

    const BOARD_HEIGHT =
        ROWS * V_SPACING;

    const BOARD_CENTER =
        BOARD_WIDTH / 2;

    return (
        <div className="overflow-x-auto w-full py-4 scrollbar-none flex justify-center">

            <div
                className={`
                    relative
                    mx-auto
                    transition-all
                    duration-500
                    ease-in-out
                    pt-8
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

                {/* Drop Indicator */}
                <div
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-200 ease-out z-10"
                    style={{
                        left: BOARD_CENTER + (dropColumn - 6) * H_SPACING,
                    }}
                >
                    <div className="text-[9px] font-extrabold text-yellow-500 uppercase tracking-widest mb-1 bg-yellow-500/10 border border-yellow-500/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        Col {dropColumn}
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-yellow-500 drop-shadow-[0_2px_4px_rgba(234,179,8,0.5)] animate-bounce" />
                </div>

                {isTilted && (
                    <div
                        className="
                            absolute
                            right-4
                            top-8
                            z-50
                            rounded-lg
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
                            top-8
                            z-50
                            rounded-lg
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
                                        binIndex === index && !isAnimating
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