"use client";

import PathReplay
    from "./PathReplay";

interface Props {
    result: {
        commitHex: string;
        combinedSeed: string;
        pegMapHash: string;
        binIndex: number;
        path: ("L" | "R")[];
        verified: boolean;
    };
}

export default function VerificationResult({
    result,
}: Props) {

    return (
        <div
            className="
                mt-8
                rounded-lg
                border
                p-6
            "
        >
            <h2
                className="
                    mb-4
                    text-2xl
                    font-bold
                "
            >
                Verification Result
            </h2>

            <div
                className={`
                    mb-6
                    rounded-lg
                    p-4
                    text-center
                    text-white
                    font-bold
                    ${result.verified
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                `}
            >
                {
                    result.verified
                        ? "✅ VERIFIED"
                        : "❌ FAILED"
                }
            </div>

            <div className="space-y-4">

                <p>
                    <strong>
                        Commit Hash:
                    </strong>
                    <br />
                    {result.commitHex}
                </p>

                <p>
                    <strong>
                        Combined Seed:
                    </strong>
                    <br />
                    {result.combinedSeed}
                </p>

                <p>
                    <strong>
                        Peg Map Hash:
                    </strong>
                    <br />
                    {result.pegMapHash}
                </p>

                <p>
                    <strong>
                        Bin Index:
                    </strong>
                    <br />
                    {result.binIndex}
                </p>

            </div>

            <PathReplay
                path={result.path}
            />
        </div>
    );
}