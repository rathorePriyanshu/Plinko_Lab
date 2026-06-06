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
                w-full
                h-11
                rounded-xl
                bg-amber-600
                hover:bg-amber-500
                active:scale-95
                text-white
                font-bold
                text-xs
                tracking-wider
                uppercase
                shadow-lg
                shadow-amber-950/20
                transition-all
                cursor-pointer
                flex
                items-center
                justify-center
                text-center
            "
        >
            Verify Round
        </Link>
    );
}