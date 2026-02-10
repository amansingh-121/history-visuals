"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CastleCardProps {
  image: string;
  title: string;
  description: string;
  yPercentage: number;
  alignment: "left" | "right";
}

const CastleCard: React.FC<CastleCardProps> = ({
  image,
  title,
  description,
  yPercentage,
  alignment,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${yPercentage}%`,
        left: alignment === "left" ? "17.5%" : "82.5%",
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center relative pointer-events-auto"
      >
        {/* IMAGE BLOCK — exactly like your reference */}
        <div className="w-48 md:w-64 relative">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* TITLE BAR */}
        <div className="w-48 md:w-64 bg-black/70 backdrop-blur-sm border border-white/10 py-2 mt-3 text-center">
          <h3 className="text-2xl md:text-3xl text-gold font-serif tracking-wide">
            {title}
          </h3>
        </div>

        {/* DESCRIPTION BOX — exactly like your image */}
        <div className="w-48 md:w-64 bg-black/80 backdrop-blur-sm border border-white/10 p-3 text-center">
          <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CastleCard;
