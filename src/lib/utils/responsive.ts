import { DeviceType } from "../types/editor";
import { cn } from "../utils";

// src/lib/utils/responsive.ts
export const getResponsiveValue = <T>(
    value: { mobile?: T; tablet?: T; desktop: T },
    device: DeviceType
  ): T => {
    if (device === 'mobile' && value.mobile) return value.mobile;
    if (device === 'tablet' && value.tablet) return value.tablet;
    return value.desktop;
  };
  
  export const createResponsiveClasses = (
    baseClasses: string,
    responsiveClasses: Partial<Record<DeviceType, string>>
  ) => {
    return cn(
      baseClasses,
      responsiveClasses.mobile && `sm:${responsiveClasses.mobile}`,
      responsiveClasses.tablet && `md:${responsiveClasses.tablet}`,
      responsiveClasses.desktop && `lg:${responsiveClasses.desktop}`
    );
  };