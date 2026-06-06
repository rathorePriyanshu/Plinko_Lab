"use client";

import { useState } from "react";
import { useGameStore } from "@/store/game-store";

interface VerifyResult {
    commitHex: string;
    combinedSeed: string;
    pegMapHash: string;
    binIndex: number;
}

export default function VerifyForm() {

    const {
        clientSeed,
        dropColumn,
        roundId,
        serverSeed,
        nonce,
    } = useGameStore();

    const [
        localServerSeed,
        setLocalServerSeed,
    ] = useState(serverSeed ?? "");

    const [
        localNonce,
        setLocalNonce,
    ] = useState(nonce ?? "");

    const [
        result,
        setResult,
    ] = useState<VerifyResult | null>(
        null
    );

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    async function handleVerify() {

        try {

            setLoading(true);
            setError("");

            const params =
                new URLSearchParams({
                    serverSeed:
                        localServerSeed,
                    clientSeed,
                    nonce:
                        localNonce,
                    dropColumn:
                        String(dropColumn),
                });

            const response =
                await fetch(
                    `/api/verify?${params}`
                );

            if (!response.ok) {
                throw new Error(
                    "Verification failed"
                );
            }

            const data =
                await response.json();

            setResult(data);

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div
            className="
                mx-auto
                max-w-4xl
                space-y-6
            "
        >
            <div
                className="
                    rounded-xl
                    border
                    p-6
                "
            >
                <h2
                    className="
                        mb-6
                        text-3xl
                        font-bold
                    "
                >
                    Verify Round
                </h2>

                <div className="grid gap-4">

                    <input
                        value={localServerSeed}
                        onChange={e =>
                            setLocalServerSeed(
                                e.target.value
                            )
                        }
                        placeholder="Server Seed"
                        className="
                            w-full
                            rounded
                            border
                            p-3
                        "
                    />

                    <input
                        value={clientSeed}
                        readOnly
                        placeholder="Client Seed"
                        className="
                            w-full
                            rounded
                            border
                            p-3
                            bg-gray-100
                        "
                    />

                    <input
                        value={localNonce}
                        onChange={e =>
                            setLocalNonce(
                                e.target.value
                            )
                        }
                        placeholder="Nonce"
                        className="
                            w-full
                            rounded
                            border
                            p-3
                        "
                    />

                    <input
                        value={dropColumn}
                        readOnly
                        className="
                            w-full
                            rounded
                            border
                            p-3
                            bg-gray-100
                        "
                    />

                    <input
                        value={roundId ?? ""}
                        readOnly
                        placeholder="Round ID"
                        className="
                            w-full
                            rounded
                            border
                            p-3
                            bg-gray-100
                        "
                    />

                    <button
                        onClick={
                            handleVerify
                        }
                        disabled={
                            loading ||
                            !localServerSeed ||
                            !localNonce
                        }
                        className="
                            rounded
                            bg-yellow-500
                            px-4
                            py-3
                            font-semibold
                            disabled:opacity-50
                        "
                    >
                        {
                            loading
                                ? "Verifying..."
                                : "Verify Round"
                        }
                    </button>

                </div>
            </div>

            {error && (
                <div
                    className="
                        rounded
                        border
                        border-red-500
                        p-4
                        text-red-500
                    "
                >
                    {error}
                </div>
            )}

            {result && (
                <div
                    className="
                        rounded-xl
                        border
                        p-6
                    "
                >
                    <h3
                        className="
                            mb-4
                            text-xl
                            font-bold
                        "
                    >
                        Verification Result
                    </h3>

                    <div className="space-y-3">

                        <p>
                            <strong>
                                Commit Hash:
                            </strong>
                            {" "}
                            {result.commitHex}
                        </p>

                        <p>
                            <strong>
                                Combined Seed:
                            </strong>
                            {" "}
                            {result.combinedSeed}
                        </p>

                        <p>
                            <strong>
                                Peg Map Hash:
                            </strong>
                            {" "}
                            {result.pegMapHash}
                        </p>

                        <p>
                            <strong>
                                Final Bin:
                            </strong>
                            {" "}
                            {result.binIndex}
                        </p>

                    </div>
                </div>
            )}

        </div>
    );
}