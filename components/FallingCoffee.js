"use client";

import { motion, useReducedMotion } from "framer-motion";

const treats = ["☕", "🫘", "🥐", "♨"];

export default function FallingCoffee({ count = 16, className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`falling-coffee ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <motion.span
          key={index}
          className="falling-treat"
          initial={{ y: "-12vh", rotate: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.12 }
              : {
                  y: "115vh",
                  x: [0, index % 2 ? 34 : -34, 0],
                  rotate: index % 2 ? 310 : -310,
                  opacity: [0, 0.28, 0.28, 0],
                }
          }
          transition={{
            duration: 13 + ((index * 7) % 12),
            delay: (index * 1.7) % 14,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${(index * 37 + 8) % 100}%`,
            fontSize: `${18 + ((index * 11) % 24)}px`,
          }}
        >
          {treats[index % treats.length]}
        </motion.span>
      ))}
    </div>
  );
}
