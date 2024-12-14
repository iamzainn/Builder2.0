//src/lib/types/theme.ts

export type ThemeSection = {
  id: string;
  type: string;
  styles: Record<string, any>;
  settings: Record<string, any>;
  isVisible: boolean;
};

export type Theme = {
  settings: any;
  id: string;
  name: string;
  version: string;
  sections: ThemeSection[];
};