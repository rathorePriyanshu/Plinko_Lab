"use client";

import Link from "next/link";
import { useGameStore } from "@/store/game-store";

export default function OpenVerifierButton() {

    const {
        serverSeed,
        clientSeed,
        nonce,
        dropColumn,
    } = useGameStore();

    if (!serverSeed) {
        return null;
    }

    const params =
        new URLSearchParams({
            serverSeed,
            clientSeed,
            nonce: nonce ?? "",
            dropColumn:
                String(dropColumn),
        });

    return (
        <Link
            href={`/verify?${params}`}
            className="
                inline-block
                rounded
                bg-blue-600
                px-4
                py-2
                text-white
            "
        >
            Verify This Round
        </Link>
    );
}