import React from 'react';
import { motion } from 'motion/react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30 transform-gpu">
      {/* Aurora Orb 1 */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-300/30 via-blue-200/20 to-transparent blur-[80px] will-change-transform transform-gpu"
      />

      {/* Aurora Orb 2 */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-purple-300/20 via-indigo-200/20 to-transparent blur-[90px] will-change-transform transform-gpu"
      />

      {/* Aurora Orb 3 */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-sky-200/20 via-blue-300/10 to-transparent blur-[80px] will-change-transform transform-gpu"
      />
    </div>
  );
};
