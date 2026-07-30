import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25 transform-gpu will-change-transform">
      {/* Aurora Orb 1 */}
      <div className="absolute -top-24 -left-20 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-indigo-300/30 via-blue-200/20 to-transparent blur-2xl transform-gpu" />

      {/* Aurora Orb 2 */}
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-purple-300/20 via-indigo-200/20 to-transparent blur-2xl transform-gpu" />

      {/* Aurora Orb 3 */}
      <div className="absolute -bottom-32 left-1/4 w-[380px] h-[380px] rounded-full bg-gradient-to-t from-sky-200/20 via-blue-300/10 to-transparent blur-2xl transform-gpu" />
    </div>
  );
};

