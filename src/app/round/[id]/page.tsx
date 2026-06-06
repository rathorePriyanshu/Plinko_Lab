import { notFound } from "next/navigation";

import {
    getRound,
} from "@/lib/rounds/round-service";

import RoundReplay
    from "@/components/history/RoundReplay";

import Link
    from "next/link";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function RoundPage({
    params,
}: Props) {

    const { id } =
        await params;

    const round =
        await getRound(id);

    if (!round) {
        notFound();
    }

    const path =
        round.pathJson
            ? JSON.parse(
                round.pathJson
            )
            : [];

    const verifyUrl =
        round.status === "REVEALED"
            ? `/verify?serverSeed=${round.serverSeed}&clientSeed=${round.clientSeed}&nonce=${round.nonce}&dropColumn=${round.dropColumn}&roundId=${round.id}`
            : null;

    return (
        <main
            className="
                mx-auto
                max-w-6xl
                p-6
            "
        >
            <div
                className="
                    mb-8
                    flex
                    items-center
                    justify-between
                "
            >
                <h1
                    className="
                        text-4xl
                        font-bold
                    "
                >
                    Round Details
                </h1>

                {
                    verifyUrl && (
                        <Link
                            href={verifyUrl}
                            className="
                                rounded
                                bg-green-600
                                px-4
                                py-2
                                text-white
                            "
                        >
                            Verify Round
                        </Link>
                    )
                }
            </div>

            <div
                className="
                    rounded-lg
                    border
                    p-6
                    space-y-4
                "
            >

                <p>
                    <strong>
                        Round ID:
                    </strong>{" "}
                    {round.id}
                </p>

                <p>
                    <strong>
                        Status:
                    </strong>{" "}
                    {round.status}
                </p>

                <p>
                    <strong>
                        Commit Hash:
                    </strong>{" "}
                    {round.commitHex}
                </p>

                <p>
                    <strong>
                        Nonce:
                    </strong>{" "}
                    {round.nonce}
                </p>

                <p>
                    <strong>
                        Client Seed:
                    </strong>{" "}
                    {
                        round.clientSeed ??
                        "-"
                    }
                </p>

                <p>
                    <strong>
                        Combined Seed:
                    </strong>{" "}
                    {
                        round.combinedSeed ??
                        "-"
                    }
                </p>

                <p>
                    <strong>
                        Server Seed:
                    </strong>{" "}
                    {
                        round.status ===
                            "REVEALED"
                            ? round.serverSeed
                            : "Hidden until reveal"
                    }
                </p>

                <p>
                    <strong>
                        Rows:
                    </strong>{" "}
                    {round.rows}
                </p>

                <p>
                    <strong>
                        Drop Column:
                    </strong>{" "}
                    {
                        round.dropColumn ??
                        "-"
                    }
                </p>

                <p>
                    <strong>
                        Peg Map Hash:
                    </strong>{" "}
                    {
                        round.pegMapHash ??
                        "-"
                    }
                </p>

                <p>
                    <strong>
                        Bin Index:
                    </strong>{" "}
                    {
                        round.binIndex ??
                        "-"
                    }
                </p>

                <p>
                    <strong>
                        Bet:
                    </strong>{" "}
                    ₹
                    {
                        round.betCents
                            ? round.betCents /
                            100
                            : 0
                    }
                </p>

                <p>
                    <strong>
                        Multiplier:
                    </strong>{" "}
                    {
                        round.payoutMultiplier ??
                        "-"
                    }x
                </p>

                <p>
                    <strong>
                        Created:
                    </strong>{" "}
                    {new Date(
                        round.createdAt
                    ).toLocaleString()}
                </p>

                {
                    round.revealedAt && (
                        <p>
                            <strong>
                                Revealed:
                            </strong>{" "}
                            {new Date(
                                round.revealedAt
                            ).toLocaleString()}
                        </p>
                    )
                }

            </div>

            <div className="mt-8">

                <RoundReplay
                    path={path}
                />

            </div>
        </main>
    );
}