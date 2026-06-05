import { hashToSeed, XorShift32 } from "@/lib/crypto/prng";

export type Direction = "L" | "R";

export interface EngineResult {
    path: Direction[];
    binIndex: number;
}

export function generatePath(
    combinedSeed: string,
    rows: number,
    dropColumn: number
): EngineResult {
    const seed = hashToSeed(combinedSeed);

    const prng = new XorShift32(seed);

    const path: Direction[] = [];

    let currentColumn = dropColumn;

    for (let row = 0; row < rows; row++) {
        const value = prng.next();

        if (value < 0.5) {
            path.push("L");
        } else {
            path.push("R");
            currentColumn++;
        }
    }

    return {
        path,
        binIndex: currentColumn,
    };
}