"use client";

import Link from "next/link";

interface Round {
    id: string;
    status: string;
    binIndex: number | null;
    payoutMultiplier: number | null;
    createdAt: string;
}

interface Props {
    rounds: Round[];
}

export default function HistoryTable({
    rounds,
}: Props) {

    return (
        <div
            className="
                overflow-x-auto
                rounded-xl
                border
            "
        >
            <table
                className="
                    min-w-full
                    border-collapse
                "
            >
                <thead>
                    <tr
                        className="
                            border-b
                            bg-gray-100
                        "
                    >
                        <th className="p-4 text-left">
                            Round ID
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Bin
                        </th>

                        <th className="p-4 text-left">
                            Multiplier
                        </th>

                        <th className="p-4 text-left">
                            Created
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rounds.map(
                            round => (
                                <tr
                                    key={round.id}
                                    className="
                                        border-b
                                    "
                                >
                                    <td className="p-4">
                                        {round.id.slice(
                                            0,
                                            12
                                        )}
                                        ...
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`
                                                rounded
                                                px-3
                                                py-1
                                                text-xs
                                                text-white
                                                ${round.status === "REVEALED"
                                                    ? "bg-green-500"
                                                    : round.status === "STARTED"
                                                        ? "bg-yellow-500"
                                                        : "bg-blue-500"
                                                }
                                            `}
                                        >
                                            {
                                                round.status
                                            }
                                        </span>

                                    </td>

                                    <td className="p-4">
                                        {
                                            round.binIndex ??
                                            "-"
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            round.payoutMultiplier ??
                                            "-"
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            new Date(
                                                round.createdAt
                                            ).toLocaleString()
                                        }
                                    </td>

                                    <td className="p-4">

                                        <Link
                                            href={`/round/${round.id}`}
                                            className="
                                                rounded
                                                bg-blue-500
                                                px-3
                                                py-2
                                                text-white
                                            "
                                        >
                                            View
                                        </Link>

                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}