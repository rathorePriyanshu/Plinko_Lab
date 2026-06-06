export interface PegPosition {
    x: number;
    y: number;
}

export const ROWS = 12;

export const H_SPACING = 50;
export const V_SPACING = 50;

export function generatePegPositions() {
    const pegs: PegPosition[] = [];

    for (let row = 0; row < ROWS; row++) {
        const pegCount = row + 1;

        const rowWidth =
            (pegCount - 1) * H_SPACING;

        const startX =
            -rowWidth / 2;

        for (
            let peg = 0;
            peg < pegCount;
            peg++
        ) {
            pegs.push({
                x:
                    startX +
                    peg * H_SPACING,
                y:
                    row * V_SPACING,
            });
        }
    }

    return pegs;
}