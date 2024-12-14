// src/lib/config/devices.ts
export const deviceConfig = {
    mobile: {
      width: '375px',
      label: 'Mobile',
      icon: 'Smartphone',
      breakpoint: 640
    },
    tablet: {
      width: '768px',
      label: 'Tablet',
      icon: 'Tablet',
      breakpoint: 1024
    },
    desktop: {
      width: '100%',
      label: 'Desktop',
      icon: 'Monitor',
      breakpoint: 1440
    }
  } as const;