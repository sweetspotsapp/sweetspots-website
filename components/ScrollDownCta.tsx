"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mouse, ChevronDown } from "lucide-react";

export default function ScrollDownCta() {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Mouse className="w-8 h-8 text-white" />
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </div>
  );
}