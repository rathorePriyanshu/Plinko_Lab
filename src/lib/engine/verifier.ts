import crypto from "crypto";
import { sha256 } from "@/lib/crypto/hash";

export function generateServerSeed(): string {
    return crypto.randomBytes(32).toString("hex");
}

export function generateNonce(): string {
    return crypto.randomUUID();
}

export function createCommit(
    serverSeed: string,
    nonce: string
): string {
    return sha256(
        `${serverSeed}:${nonce}`
    );
}

export function createCombinedSeed(
    serverSeed: string,
    clientSeed: string,
    nonce: string
): string {
    return sha256(
        `${serverSeed}:${clientSeed}:${nonce}`
    );
}