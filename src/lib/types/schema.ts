//src/lib/types/schema.ts

export type ComponentStyleSchema = {
  padding?: {
    type: 'spacing';
    label: string;
    default?: string;
  };
  margin?: {
    type: 'spacing';
    label: string;
    default?: string;
  };
  backgroundColor?: {
    type: 'color';
    label: string;
    default?: string;
  };
  isVisible?: {
    type: 'boolean';
    label: string;
    default: boolean;
  };
};

export type TextStyleSchema = {
  color?: {
    type: 'color';
    label: string;
    default?: string;
  };
  fontSize?: {
    type: 'select';
    label: string;
    options: Array<{ label: string; value: string }>;
    default?: string;
  };
  fontWeight?: {
    type: 'select';
    label: string;
    options: Array<{ label: string; value: string }>;
    default?: string;
  };
};

export type SectionSchema = {
  type: string;
  
  label: string;
  category: 'header' | 'content' | 'footer';
  styles: ComponentStyleSchema;
  settings: Record<string, {
    type: string;
    
    label: string;
    default?: any;
    options?: Array<{ label: string; value: any }>;
  }>;
};