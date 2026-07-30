import React from 'react';
import { motion } from 'motion/react';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'div',
}) => {
  const MotionComponent = motion[as] as React.ElementType;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`transform-gpu ${className}`}
    >
      {text}
    </MotionComponent>
  );
};

