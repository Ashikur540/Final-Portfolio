import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { ReactNode, useState } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface AnimatedTooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  children,
  content,
  position = "top",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue<number>(0);

  const rotate: MotionValue<number> = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX: MotionValue<number> = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const getTooltipStyles = (position: TooltipPosition): React.CSSProperties => {
    switch (position) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "0.5rem",
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "0.5rem",
        };
      case "left":
        return {
          top: "50%",
          right: "100%",
          transform: "translateY(-50%)",
          marginRight: "0.5rem",
        };
      case "right":
        return {
          top: "50%",
          left: "100%",
          transform: "translateY(-50%)",
          marginLeft: "0.5rem",
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`relative inline-block z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{
              ...getTooltipStyles(position),
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
            className="absolute z-50 flex text-xs flex-col items-center justify-center rounded-md bg-black shadow-xl px-4 py-2"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTooltip;
