import { sha256 } from "@/lib/crypto/hash";
import {
    hashToSeed,
    XorShift32,
} from "@/lib/crypto/prng";

import {
    generatePegMap,
    PegMap,
} from "./peg-map";

export type Direction = "L" | "R";

export interface EngineResult {
    pegMap: PegMap;
    pegMapHash: string;
    path: Direction[];
    binIndex: number;
}

export function runPlinkoEngine(
    combinedSeed: string,
    rows: number,
    dropColumn: number
): EngineResult {

    const seed = hashToSeed(combinedSeed);
    const prng = new XorShift32(seed);
    const pegMap = generatePegMap(rows, prng);
    const pegMapHash = sha256(JSON.stringify(pegMap));

    const path: Direction[] = [];
    let pos = 0;

    const adj = (dropColumn - Math.floor(rows / 2)) * 0.01;

    for (let row = 0; row < rows; row++) {
        const pegIndex = Math.min(pos, row);
        const leftBias = pegMap[row][pegIndex];

        const bias = Math.max(0, Math.min(1, leftBias + adj));
        const rnd = prng.next();

        if (rnd < bias) {
            path.push("L");
        } else {
            path.push("R");
            pos++;
        }
    }

    return {
        pegMap,
        pegMapHash,
        path,
        binIndex: pos,
    };
}