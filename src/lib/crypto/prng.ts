export class XorShift32 {
    private state: number;

    constructor(seed: number) {
        this.state = seed || 1;
    }

    next(): number {
        let x = this.state;

        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;

        this.state = x;

        return (x >>> 0) / 4294967296;
    }
}

export function hashToSeed(
    hash: string
): number {
    return parseInt(
        hash.slice(0, 8),
        16
    );
}