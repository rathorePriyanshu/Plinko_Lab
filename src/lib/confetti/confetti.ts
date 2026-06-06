import confetti
    from "canvas-confetti";

export function fireConfetti() {
    confetti({
        particleCount: 120,
        spread: 90,
        origin: {
            y: 0.7,
        },
    });
}