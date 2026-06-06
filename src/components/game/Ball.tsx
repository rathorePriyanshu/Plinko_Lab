"use client";

import { motion } from "framer-motion";

interface BallProps {
    x: number;
    y: number;
}

export default function Ball({
    x,
    y,
}: BallProps) {
    return (
        <motion.div
            animate={{
                x,
                y,
            }}
            transition={{
                duration: 0.15,
                ease: "linear",
            }}
            className="
                absolute
                z-20
                h-5
                w-5
                rounded-full
                bg-yellow-400
                shadow-lg
            "
        />
    );
}