"use client";

import Peg from "./Peg";
import Bin from "./Bin";
import { PAYOUTS } from "@/constants/payouts";
import { generatePegPositions } from "@/lib/plinko/board-layout";
import { useGameStore } from "@/store/game-store";
import { useMemo } from "react";

export default function PlinkoBoard() {
    const pegs = useMemo(() => generatePegPositions(), []);
    const dropColumn = useGameStore(state => state.dropColumn);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[900px]">
                <div
                    className="relative mx-auto"
                    style={{
                        width: 700,
                        height: 700,
                    }}>
                    {pegs.map((peg, index) => (
                        <Peg
                            key={index}
                            x={peg.x + 350}
                            y={peg.y}
                        />
                    ))}
                </div>
                <div className="mt-10 flex justify-center gap-2">
                    {PAYOUTS.map(
                        (
                            multiplier,
                            index
                        ) => (
                            <Bin
                                key={index}
                                index={index}
                                multiplier={multiplier}
                                selected={
                                    dropColumn === index
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}