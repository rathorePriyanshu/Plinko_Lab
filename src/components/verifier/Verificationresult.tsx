"use client";

interface Props {
    result: {
        commitHex: string;
        combinedSeed: string;
        pegMapHash: string;
        binIndex: number;
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

            <div className="space-y-3">

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
        </div>
    );
}