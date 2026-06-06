import { XorShift32 } from "@/lib/crypto/prng";

export type PegMap = number[][];

export function generatePegMap(
    rows: number,
    prng: XorShift32
): PegMap {
    const pegMap: PegMap = [];

    for (let row = 0; row < rows; row++) {
        const pegs: number[] = [];

        for (let peg = 0; peg <= row; peg++) {
            const rand = prng.next();
            const leftBias = 0.5 + (rand - 0.5) * 0.2;
            pegs.push(Number(leftBias.toFixed(6)));
        }

        pegMap.push(pegs);
    }

    return pegMap;
}