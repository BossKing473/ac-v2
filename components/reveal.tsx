import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Props {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

export const Reveal: React.FC<Props> = ({ children, width = "fit-content", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      filter: "blur(10px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as [number, number, number, number], // Cubic bezier for smooth "premium" feel
        delay: delay
      }
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};