// src/components/ui/icons.tsx

import {
    Truck,
    Shield,
    RepeatIcon,
    type LucideIcon,
  } from "lucide-react";
  
  export const Icons: Record<string, LucideIcon> = {
    truck: Truck,
    shield: Shield,
    repeat: RepeatIcon,
  };


  export type IconName = keyof typeof Icons;