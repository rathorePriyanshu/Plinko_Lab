import { create } from "zustand";

interface GameStore {
    dropColumn: number;
    betAmount: number;
    clientSeed: string;
    roundId: string | null;
    commitHash: string | null;
    pegMapHash: string | null;
    binIndex: number | null;
    multiplier: number | null;
    path: ("L" | "R")[];
    isAnimating: boolean;
    isMuted: boolean;
    serverSeed: string | null;
    nonce: string | null;

    setMuted: (value: boolean) => void;
    setDropColumn: (value: number) => void;
    setBetAmount: (value: number) => void;
    setClientSeed: (value: string) => void;
    setRoundData: (data: Partial<GameStore>) => void;
    setAnimating: (value: boolean) => void;
}

export const useGameStore = create<GameStore>(
    set => ({
        dropColumn: 6,
        betAmount: 100,
        clientSeed: "",
        roundId: null,
        commitHash: null,
        pegMapHash: null,
        binIndex: null,
        isAnimating: false,
        multiplier: null,
        path: [],
        isMuted: false,
        serverSeed: null,
        nonce: null,


        setMuted: value => set({ isMuted: value }),
        setDropColumn: value => set({ dropColumn: value }),
        setBetAmount: value => set({ betAmount: value }),
        setClientSeed: value => set({ clientSeed: value }),
        setRoundData: data => set(data),
        setAnimating: value => set({ isAnimating: value, }),
    }));