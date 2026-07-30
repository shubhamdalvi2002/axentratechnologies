import React from 'react';
import { motion } from 'motion/react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25 transform-gpu">
      {/* Aurora Orb 1 */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(165,180,252,0.4)_0%,rgba(191,219,254,0.2)_45%,transparent_70%)] pointer-events-none"
      />

      {/* Aurora Orb 2 */}
      <motion.div
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,180,254,0.35)_0%,rgba(199,210,254,0.18)_45%,transparent_70%)] pointer-events-none"
      />

      {/* Aurora Orb 3 */}
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.35)_0%,rgba(147,197,253,0.15)_45%,transparent_70%)] pointer-events-none"
      />
    </div>
  );
};

