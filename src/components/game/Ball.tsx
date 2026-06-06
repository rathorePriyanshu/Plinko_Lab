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
                bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500
                shadow-[0_0_12px_rgba(245,158,11,0.6)]
                border border-yellow-300/40
            "
        />
    );
}