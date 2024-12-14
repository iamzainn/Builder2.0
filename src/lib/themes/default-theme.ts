// src/lib/themes/default-theme.ts

import { Theme, ThemeSection } from '@/lib/types/theme';
import { v4 as uuidv4 } from 'uuid';
export const THEME_ID = 'default-theme-1';

const defaultSections: ThemeSection[] = [
  {
    id: uuidv4(),
    type: 'header',
    isVisible: true,
    styles: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb'
    },
    settings: {
      logo: {
        text: 'Your Store',
        fontSize: '1.5rem',
        color: '#111827'
      },
      navigation: [
        { label: 'Home', link: '#' },
        { label: 'Shop', link: '#' },
        { label: 'About', link: '#' }
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'hero',
    isVisible: true,
    styles: {
      padding: '4rem',
      backgroundColor: '#f3f4f6',
      textAlign: 'center'
    },
    settings: {
      heading: {
        text: 'Welcome to our store',
        fontSize: '3rem',
        color: '#111827'
      },
      subheading: {
        text: 'Find amazing products at great prices',
        fontSize: '1.25rem',
        color: '#4b5563'
      },
      button: {
        text: 'Shop Now',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        link: '#'
      }
    }
  },
  {
    id: uuidv4(),
    type: 'features',
    isVisible: true,
    styles: {
      padding: '4rem',
      backgroundColor: '#ffffff'
    },
    settings: {
      heading: {
        text: 'Our Features',
        fontSize: '2.25rem',
        color: '#111827',
        textAlign: 'center'
      },
      features: [
        {
          id: uuidv4(),
          icon: 'truck',
          title: 'Free Shipping',
          description: 'Free shipping on all orders over $50'
        },
        {
          id: uuidv4(),
          icon: 'shield',
          title: 'Secure Payments',
          description: 'All transactions are secure and encrypted'
        },
        {
          id: uuidv4(),
          icon: 'repeat',
          title: 'Easy Returns',
          description: '30-day return policy for all items'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'footer',
    isVisible: true,
    styles: {
      padding: '2rem',
      backgroundColor: '#1f2937',
      color: '#ffffff'
    },
    settings: {
      copyright: {
        text: '© 2024 Your Store. All rights reserved.',
        fontSize: '0.875rem',
        color: '#9ca3af'
      },
      links: [
        { label: 'Privacy Policy', link: '#' },
        { label: 'Terms of Service', link: '#' },
        { label: 'Contact', link: '#' }
      ]
    }
  }
];

export const defaultTheme: Theme = {
  id: THEME_ID,
  name: 'Default Store Theme',
  version: '1.0.0',
  settings: {},
  sections: defaultSections
};