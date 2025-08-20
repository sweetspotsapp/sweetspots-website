// Cursor.tsx
import { MousePointer2, ThumbsUp } from 'lucide-react';
import React, { forwardRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LegacyAnimationControls, motion, type Transition } from 'framer-motion';

interface CursorProps {
  x?: number;
  y?: number;
  animate?: LegacyAnimationControls; // ✅ controls from useAnimationControls
  transition?: Transition;
  avatarSrc?: string;
  avatarFallback?: string;
  pointerColor?: string;
  pointerStrokeColor?: string;
  className?: string;
  allGood?: boolean;
}

const Cursor = forwardRef<HTMLDivElement, CursorProps>((props, ref) => {
  const {
    x, y, animate,
    transition,
    avatarSrc,
    avatarFallback = 'CN',
    pointerColor = 'white',
    pointerStrokeColor = 'black',
    className,
    allGood = false,
  } = props;

  useEffect(() => {
    if (animate && allGood) {
      animate.start({
        x,
        y,
        scale: 1.3,
        rotate: [0, 15, 0],
        transition: {
          scale: { duration: 0.4, ease: 'easeInOut' },
          rotate: { duration: 0.4, ease: 'easeInOut' },
          x: { duration: 0.4, ease: 'easeInOut' },
          y: { duration: 0.4, ease: 'easeInOut' },
        },
      }).then(() => {
        animate.start({
          scale: 1,
          rotate: 0,
        });
      });
    }
  }, [x, y, animate, allGood]);

  return (
    <motion.div
      ref={ref}
      className={`absolute z-[9999] pointer-events-none ${className}`}
      animate={animate ?? { x, y }}
      transition={transition ?? { type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }} className="flex items-center">
        <div className="flex">
          {
            allGood ? (
              <ThumbsUp
                              size={24}
                stroke={pointerStrokeColor}
                strokeWidth={2}
                fill={pointerColor}
              />
            ) : (
              <MousePointer2
                size={24}
                stroke={pointerStrokeColor}
                strokeWidth={2}
                fill={pointerColor}
              />
            )
          }
        </div>
        <div className="flex items-end ml-1">
          <Avatar className="h-6 w-6 border-2 border-black">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="text-xs">{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.div>
  );
});

Cursor.displayName = 'Cursor';
export default Cursor;