import React from "react";
import { motion } from "framer-motion";

const CurvedDivider = ({
  height = "120px",
  flip = false,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={`w-full ${flip ? "rotate-180" : ""}`}
        style={{ height }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Main curved path */}
          <motion.path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill={`url(#gradient-${flip ? "flip" : "normal"})`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`gradient-${flip ? "flip" : "normal"}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#fef2f2" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fef2f2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-300/30 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CurvedDivider;
