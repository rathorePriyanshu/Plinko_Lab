import {
    describe,
    expect,
    it,
} from "vitest";

import {
    createCommit,
    createCombinedSeed,
} from "../lib/engine/verifier";

describe(
    "Verifier",
    () => {

        it(
            "creates correct commit hash",
            () => {

                const commit =
                    createCommit(
                        "b2a5f3f32a4d9c6ee7a8c1d33456677890abcdeffedcba0987654321ffeeddcc",
                        "42"
                    );

                expect(
                    commit
                ).toBe(
                    "bb9acdc67f3f18f3345236a01f0e5072596657a9005c7d8a22cff061451a6b34"
                );
            }
        );

        it(
            "creates correct combined seed",
            () => {

                const combined =
                    createCombinedSeed(
                        "b2a5f3f32a4d9c6ee7a8c1d33456677890abcdeffedcba0987654321ffeeddcc",
                        "candidate-hello",
                        "42"
                    );

                expect(
                    combined
                ).toBe(
                    "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0"
                );
            }
        );

    }
);