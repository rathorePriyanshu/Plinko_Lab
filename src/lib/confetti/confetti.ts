import confetti from "canvas-confetti";

export function canAnimate() {

    if (typeof window === "undefined") {
        return false;
    }

    return !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}

export function fireConfetti() {

    if (!canAnimate()) {
        return;
    }

    confetti({
        particleCount: 120,
        spread: 90,
        origin: {
            y: 0.7,
        },
    });
}