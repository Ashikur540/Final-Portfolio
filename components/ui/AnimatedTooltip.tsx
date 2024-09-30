import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export const AnimatedToolTip = ({
  children,
  tooltipText,
  position = "top",
}: {
  children: ReactNode;
  tooltipText: string;
  position?: TooltipPosition; // Optional prop for position control
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [tooltipX, setTooltipX] = useState(0);

  // const handleMouseMove = (event: MouseEvent) => {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   const mouseX = event.clientX - rect.left;

  //   if (mouseX < rect.width / 3) {
  //     setTooltipX(-30);
  //   } else if (mouseX > (2 * rect.width) / 3) {
  //     setTooltipX(30);
  //   } else {
  //     setTooltipX(0);
  //   }
  // };

  const getTooltipPositionStyle = () => {
    switch (position) {
      case "top":
        return {
          bottom: "100%", // Place tooltip above the element
          // left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px", // Add spacing between the element and tooltip
        };
      case "bottom":
        return {
          top: "100%", // Place tooltip below the element
          // left: "50%",
          transform: "translateX(-50%, 50%)",
          marginTop: "8px", // Add spacing
        };
      case "left":
        return {
          right: "100%", // Place tooltip to the left
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px", // Add spacing
        };
      case "right":
        return {
          left: "100%", // Place tooltip to the right
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "8px", // Add spacing
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        // onMouseMove={handleMouseMove}
      >
        {children}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bg-slate-900 rounded-lg flex items-center justify-center min-w-fit max-w-[400px] px-4 py-2 text-sm z-10 "
              style={getTooltipPositionStyle()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 0.2 },
                  scale: { type: "spring", stiffness: 500, damping: 20 },
                },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {tooltipText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
