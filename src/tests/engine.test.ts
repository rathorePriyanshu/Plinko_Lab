import {
    describe,
    expect,
    it,
} from "vitest";

import {
    runPlinkoEngine,
} from "../lib/engine/plinko-engine";

describe(
    "Plinko Engine",
    () => {

        it(
            "produces correct bin for official test vector",
            () => {

                const result =
                    runPlinkoEngine(
                        "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0",
                        12,
                        6
                    );

                expect(
                    result.binIndex
                ).toBe(6);
            }
        );

        it(
            "is deterministic",
            () => {

                const first =
                    runPlinkoEngine(
                        "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0",
                        12,
                        6
                    );

                const second =
                    runPlinkoEngine(
                        "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0",
                        12,
                        6
                    );

                expect(
                    first.pegMapHash
                ).toBe(
                    second.pegMapHash
                );

                expect(
                    first.binIndex
                ).toBe(
                    second.binIndex
                );

                expect(
                    first.path
                ).toEqual(
                    second.path
                );
            }
        );

    }
);