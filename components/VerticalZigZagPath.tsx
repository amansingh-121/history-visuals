"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const VerticalZigZagPath = ({ count }: { count: number }) => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Generate straight vertical path
    const generatePath = () => {
        const height = 1000;
        return `M 50 0 L 50 ${height}`;
    };

    const pathData = generatePath();

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main Vertical trunk - Faint guide */}
                <path
                    d={pathData}
                    stroke="rgba(245, 158, 11, 0.05)"
                    strokeWidth="0.2"
                />

                {/* Animated Drawing Path */}
                <motion.path
                    d={pathData}
                    stroke="#f59e0b"
                    strokeWidth="0.5"
                    style={{ pathLength: scaleY }}
                />
            </svg>
        </div>
    );
};

export default VerticalZigZagPath;
