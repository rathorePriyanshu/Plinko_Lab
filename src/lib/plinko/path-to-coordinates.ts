import {
    H_SPACING,
    V_SPACING,
} from "./board-layout";
import {
    ROWS,
} from "./board-layout";

export interface Point {
    x: number;
    y: number;
}

export function pathToCoordinates(
    path: ("L" | "R")[]
): Point[] {

    const points: Point[] = [];

    let x = 0;

    points.push({
        x: 0,
        y: 0,
    });

    path.forEach(
        (direction, row) => {

            if (
                direction === "R"
            ) {
                x +=
                    H_SPACING / 2;
            } else {
                x -=
                    H_SPACING / 2;
            }

            points.push({
                x,
                y:
                    (row + 1) *
                    V_SPACING,
            });
        }
    );

    points.push({
        x,
        y: (ROWS + 1) * V_SPACING,
    });

    return points;
}