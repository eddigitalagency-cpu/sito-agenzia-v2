import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const ringX = useSpring(rawX, { damping: 26, stiffness: 300, mass: 0.6 });
  const ringY = useSpring(rawY, { damping: 26, stiffness: 300, mass: 0.6 });

  useEffect(() => {
    // Only on pointer-fine devices (no touch)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as Element;
      setHovered(!!t.closest('a, button, [role="button"], input, textarea, select, label'));
    };

    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    document.addEventListener('mousemove',  move,  { passive: true });
    document.addEventListener('mouseover',  over,  { passive: true });
    document.addEventListener('mousedown',  down);
    document.addEventListener('mouseup',    up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      document.removeEventListener('mousemove',  move);
      document.removeEventListener('mouseover',  over);
      document.removeEventListener('mousedown',  down);
      document.removeEventListener('mouseup',    up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — moves instantly */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          pointerEvents: 'none',
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
          borderRadius: '50%',
          backgroundColor: '#FF6A00',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
        }}
      />

      {/* Ring — follows with spring lag */}
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
        animate={{
          width:  clicking ? 28 : hovered ? 44 : 34,
          height: clicking ? 28 : hovered ? 44 : 34,
          opacity: visible ? (hovered ? 0.7 : 0.35) : 0,
          borderColor: hovered ? '#FF6A00' : 'currentColor',
        }}
        transition={{ duration: 0.18 }}
        className="rounded-full border t-text"
        // border uses currentColor → adapts to theme via t-text
      />
    </>
  );
}
