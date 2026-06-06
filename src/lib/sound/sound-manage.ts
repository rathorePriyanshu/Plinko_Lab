import { Howl, Howler } from "howler";

export const pegSound =
    new Howl({
        src: ["/sounds/peg.mp3"],
        volume: 0.2,
    });

export const winSound =
    new Howl({
        src: ["/sounds/win.mp3"],
        volume: 0.5,
    });

export function playPegSound() {
    pegSound.stop();
    pegSound.play();
}

export function playWinSound() {
    winSound.stop();
    winSound.play();
}

export function setMuted(
    value: boolean
) {
    Howler.mute(value);
}