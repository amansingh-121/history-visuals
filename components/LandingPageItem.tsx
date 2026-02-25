"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface LandingPageItemProps {
    id: string;
    title: string;
    description: string;
    image: string;
    index: number;
    onClick: () => void;
}

const LandingPageItem: React.FC<LandingPageItemProps> = ({
    id,
    title,
    description,
    image,
    index,
    onClick,
}) => {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center w-full"
        >

            {/* Main Item Card */}
            <div
                className={cn(
                    "relative w-full max-w-6xl flex items-center justify-center gap-16 py-32 px-4 cursor-pointer group",
                    isLeft ? "flex-row md:-translate-x-12" : "flex-row-reverse md:translate-x-12"
                )}
                onClick={onClick}
            >
                {/* Content Side */}
                <div className={cn(
                    "flex-1 space-y-6 max-w-sm relative z-10",
                    isLeft ? "text-right" : "text-left"
                )}>
                    <motion.div
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="space-y-4 relative"
                    >
                        <h3 className="text-4xl md:text-5xl font-serif text-amber-100 group-hover:text-amber-400 transition-all duration-500 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            {title}
                        </h3>
                        <p className="text-white/50 text-xl font-sans tracking-wide leading-relaxed group-hover:text-white/90 transition-colors">
                            {description}
                        </p>
                        <div className={cn(
                            "w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent transition-all duration-700 group-hover:w-full",
                            isLeft ? "ml-auto" : "mr-auto"
                        )} />
                    </motion.div>
                </div>

                {/* Center Image with Shadow/Glow */}
                <div className="relative w-40 h-40 md:w-[300px] md:h-[240px] flex-shrink-0 z-10">
                    <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-contain transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-90 group-hover:brightness-110"
                            priority={index === 0}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator Dot */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40 z-20 group-hover:bg-amber-500/50 transition-colors" />
        </motion.div>
    );
};

export default LandingPageItem;
