import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

interface CountUpProps {
  value: string | number; // e.g. "10,000+" or "50+" or "100%" or "200+"
  className?: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ value, className = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  // Extract number and suffix/prefix (e.g., "10,000+" -> number 10000, suffix "+", comma true)
  const strValue = String(value);
  const numericMatch = strValue.match(/[\d,.]+/);
  const rawNumber = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, '')) : 0;
  
  const prefix = strValue.substring(0, numericMatch ? strValue.indexOf(numericMatch[0]) : 0);
  const suffix = strValue.substring(numericMatch ? strValue.indexOf(numericMatch[0]) + numericMatch[0].length : 0);
  const hasComma = numericMatch ? numericMatch[0].includes(',') : false;

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  const [displayVal, setDisplayVal] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionVal.set(rawNumber);
    }
  }, [isInView, motionVal, rawNumber]);

  useEffect(() => {
    return springVal.on('change', (latest) => {
      let formatted = Math.round(latest).toString();
      if (hasComma) {
        formatted = Math.round(latest).toLocaleString('en-US');
      }
      setDisplayVal(formatted);
    });
  }, [springVal, hasComma]);

  return (
    <span ref={ref} className={className}>
      {prefix}{isInView ? displayVal : '0'}{suffix}
    </span>
  );
};
