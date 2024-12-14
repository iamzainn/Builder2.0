
//src/lib/schemas/default-theme.ts
import { SectionSchema } from "../types/schema";

export const defaultThemeSchema: Record<string, SectionSchema> = {
    header: {
      type: 'header',
      label: 'Header',
      category: 'header',
      styles: {
        padding: {
          type: 'spacing',
          label: 'Padding',
          default: '1rem'
        },
        backgroundColor: {
          type: 'color',
          label: 'Background Color',
          default: '#ffffff'
        },
        isVisible: {
          type: 'boolean',
          label: 'Show Header',
          default: true
        }
      },
      settings: {
        logo: {
          type: 'text',
          label: 'Logo Text',
          default: 'My Store'
        },
        logoColor: {
          type: 'color',
          label: 'Logo Color',
          default: '#000000'
        }
      }
    },
    hero: {
      type: 'hero',
      label: 'Hero Section',
      category: 'content',
      styles: {
        padding: {
          type: 'spacing',
          label: 'Padding',
          default: '4rem'
        },
        backgroundColor: {
          type: 'color',
          label: 'Background Color',
          default: '#f3f4f6'
        },
        isVisible: {
          type: 'boolean',
          label: 'Show Hero',
          default: true
        }
      },
      settings: {
        heading: {
          type: 'text',
          label: 'Heading',
          default: 'Welcome to our store'
        },
        subheading: {
          type: 'text',
          label: 'Subheading',
          default: 'Find amazing products at great prices'
        },
        buttonText: {
          type: 'text',
          label: 'Button Text',
          default: 'Shop Now'
        }
      }
    },
    features: {
      type: 'features',
      label: 'Features Section',
      category: 'content',
      styles: {
        padding: {
          type: 'spacing',
          label: 'Padding',
          default: '4rem'
        },
        backgroundColor: {
          type: 'color',
          label: 'Background Color',
          default: '#ffffff'
        },
        isVisible: {
          type: 'boolean',
          label: 'Show Features',
          default: true
        }
      },
      settings: {
        heading: {
          type: 'text',
          label: 'Section Heading',
          default: 'Our Features'
        },
        items: {
          type: 'array',
          label: 'Feature Items',
          default: [
            {
              title: 'Feature 1',
              description: 'Description for feature 1'
            },
            {
              title: 'Feature 2',
              description: 'Description for feature 2'
            },
            {
              title: 'Feature 3',
              description: 'Description for feature 3'
            }
          ]
        }
      }
    },
    footer: {
      type: 'footer',
      label: 'Footer',
      category: 'footer',
      styles: {
        padding: {
          type: 'spacing',
          label: 'Padding',
          default: '2rem'
        },
        backgroundColor: {
          type: 'color',
          label: 'Background Color',
          default: '#1f2937'
        },
        isVisible: {
          type: 'boolean',
          label: 'Show Footer',
          default: true
        }
      },
      settings: {
        copyright: {
          type: 'text',
          label: 'Copyright Text',
          default: '© 2024 My Store. All rights reserved.'
        },
        textColor: {
          type: 'color',
          label: 'Text Color',
          default: '#ffffff'
        }
      }
    }
  };