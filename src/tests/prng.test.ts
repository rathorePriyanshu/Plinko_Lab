import {
    describe,
    expect,
    it,
} from "vitest";

import {
    hashToSeed,
    XorShift32,
} from "../lib/crypto/prng";

describe(
    "PRNG",
    () => {

        it(
            "creates correct seed",
            () => {

                const seed =
                    hashToSeed(
                        "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0"
                    );

                expect(seed).toBe(
                    3789414263
                );
            }
        );

        it(
            "produces deterministic sequence",
            () => {

                const seed =
                    hashToSeed(
                        "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0"
                    );

                const rng =
                    new XorShift32(
                        seed
                    );

                expect(
                    rng.next()
                ).toBeCloseTo(
                    0.1106166649,
                    5
                );

                expect(
                    rng.next()
                ).toBeCloseTo(
                    0.7625129214,
                    5
                );

                expect(
                    rng.next()
                ).toBeCloseTo(
                    0.0439292176,
                    5
                );
            }
        );

    }
);