import { getRound } from "@/lib/rounds/round-service";
import { notFound } from "next/navigation";

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

    return (
        <main
            className="
                mx-auto
                max-w-5xl
                p-6
            "
        >
            <h1
                className="
                    mb-8
                    text-4xl
                    font-bold
                "
            >
                Round Details
            </h1>

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
                    {round.clientSeed}
                </p>

                <p>
                    <strong>
                        Server Seed:
                    </strong>{" "}
                    {
                        round.status ===
                            "REVEALED"
                            ? round.serverSeed
                            : "Hidden"
                    }
                </p>

                <p>
                    <strong>
                        Drop Column:
                    </strong>{" "}
                    {round.dropColumn}
                </p>

                <p>
                    <strong>
                        Peg Map Hash:
                    </strong>{" "}
                    {round.pegMapHash}
                </p>

                <p>
                    <strong>
                        Bin Index:
                    </strong>{" "}
                    {round.binIndex}
                </p>

                <p>
                    <strong>
                        Multiplier:
                    </strong>{" "}
                    {round.payoutMultiplier}x
                </p>

            </div>
        </main>
    );
}