import { motion } from "motion/react";
import React from "react";

export const LoaderOne = ({ size = 8 }) => {
  const dot = {
    hidden: { opacity: 0.3, scale: 1 },
    visible: { opacity: 1, scale: 1.4 },
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={dot}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          style={{
            width: size,
            height: size,
          }}
          className="rounded-full bg-neutral-400 dark:bg-neutral-200"
        />
      ))}
    </div>
  );
};
