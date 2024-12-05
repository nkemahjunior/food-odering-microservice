import { useState, useEffect } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;

      setDeviceType({
        isMobile: width <= 768, // Mobile: width <= 768px
        isTablet: width > 768 && width <= 1024, // Tablet: 768px < width <= 1024px
        isLaptop: width > 1024 && width <= 1440, // Laptop: 1024px < width <= 1440px
        isDesktop: width > 1440, // Desktop: width > 1440px
      });
    };

    updateDeviceType(); // Initial check

    window.addEventListener("resize", updateDeviceType); // Re-check on resize
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  return deviceType;
}
