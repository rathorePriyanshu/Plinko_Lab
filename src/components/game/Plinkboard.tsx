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
} from "@/lib/plinko/board-layout";

import {
    useGameStore,
} from "@/store/game-store";

export default function PlinkoBoard() {

    const pegs = useMemo(
        () => generatePegPositions(),
        []
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
                    <AnimatedBall />

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
                    className="
                        mt-4
                        flex
                        justify-center
                        gap-2
                    "
                >
                    {PAYOUTS.map(
                        (
                            multiplier,
                            index
                        ) => (
                            <Bin
                                key={index}
                                index={index}
                                multiplier={
                                    multiplier
                                }
                                selected={
                                    dropColumn ===
                                    index
                                }
                            />
                        )
                    )}
                </div>

            </div>

        </div>
    );
}