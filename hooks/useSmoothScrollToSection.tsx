import React from "react";
import { useLenis } from "lenis/react";
//  handles smooth scroll to a section
export const useSmoothScrollToSection = () => {
  const lenis = useLenis();

  const handleSmoothScroll = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const section = document.querySelector(target) as HTMLElement;
    if (section && lenis) {
      lenis.scrollTo(section);
    }
  };

  return { handleSmoothScroll };
};
