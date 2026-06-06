"use client";

import { useGameStore }
    from "@/store/game-store";

import RevealButton
    from "./RevealButton";
import OpenVerifierButton from "../verifier/OpenVerifierButton";

export default function RoundInfo() {

    const {
        roundId,
        commitHash,
        nonce,
        clientSeed,
        dropColumn,
        pegMapHash,
        binIndex,
        multiplier,
        serverSeed,
        revealedAt,
    } = useGameStore();

    return (
        <div
            className="
                mt-8
                rounded-lg
                border
                p-6
                space-y-4
            "
        >
            <h2
                className="
                    text-2xl
                    font-bold
                "
            >
                Round Details
            </h2>

            <div className="space-y-2">

                <p>
                    <strong>
                        Round ID:
                    </strong>{" "}
                    {roundId ?? "-"}
                </p>

                <p>
                    <strong>
                        Commit Hash:
                    </strong>{" "}
                    {commitHash ?? "-"}
                </p>

                <p>
                    <strong>
                        Nonce:
                    </strong>{" "}
                    {nonce ?? "-"}
                </p>

                <p>
                    <strong>
                        Client Seed:
                    </strong>{" "}
                    {clientSeed || "-"}
                </p>

                <p>
                    <strong>
                        Drop Column:
                    </strong>{" "}
                    {dropColumn}
                </p>

                <p>
                    <strong>
                        Peg Map Hash:
                    </strong>{" "}
                    {pegMapHash ?? "-"}
                </p>

                <p>
                    <strong>
                        Bin Index:
                    </strong>{" "}
                    {binIndex ?? "-"}
                </p>

                <p>
                    <strong>
                        Multiplier:
                    </strong>{" "}
                    {multiplier ?? "-"}x
                </p>

            </div>

            <div className="flex gap-2">
                <RevealButton />
                <OpenVerifierButton />
            </div>


            {
                serverSeed && (
                    <div
                        className="
                            rounded
                            border
                            bg-green-50
                            p-4
                        "
                    >
                        <p>
                            <strong>
                                Server Seed:
                            </strong>
                        </p>

                        <p
                            className="
                                break-all
                                text-sm
                            "
                        >
                            {serverSeed}
                        </p>

                        <p
                            className="
                                mt-2
                                text-xs
                            "
                        >
                            Revealed:
                            {" "}
                            {revealedAt}
                        </p>
                    </div>
                )
            }

        </div>
    );
}