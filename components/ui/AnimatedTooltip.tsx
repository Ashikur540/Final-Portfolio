import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";

export const AnimatedToolTip = ({
  children,
  tooltipText,
}: {
  children: ReactNode;
  tooltipText: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    if (mouseX < rect.width / 3) {
      setTooltipX(-30);
    } else if (mouseX > (2 * rect.width) / 3) {
      setTooltipX(30);
    } else {
      setTooltipX(0);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className=""
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-0 transform -translate-y-20 h-fit bg-slate-900 rounded-lg flex items-center justify-center max-w-60 px-4 py-2 text-sm"
              initial={{ opacity: 0, y: -10, scale: 0.8, x: tooltipX }}
              animate={{
                opacity: 1,
                y: [0, -50],
                x: 0,
                scale: 1,
                transition: {
                  y: { type: "spring", stiffness: 500, damping: 20 },
                  x: { type: "spring", stiffness: 100, damping: 10 },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
            >
              {tooltipText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
