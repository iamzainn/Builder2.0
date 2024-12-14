// src/lib/types/editor.ts

import { Theme } from "./theme";

export type EditorMode = 'edit' | 'preview';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type SelectedElement = {
  sectionId: string;
  blockId?: string;
  type: 'section' | 'block';
};

export type EditorHistory = {
  past: Theme[];
  present: Theme;
  future: Theme[];
};

export type EditorState = {
  // Current theme being edited
  theme: Theme | null;
  
  // Editor UI state
  selectedElement: SelectedElement | null;
  mode: EditorMode;
  isSidebarOpen: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  setMode: (mode: EditorMode) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // Section operations
  addSection: (sectionType: string, index?: number) => void;
  removeSection: (sectionId: string) => void;
  updateSection: (sectionId: string, settings: Record<string, any>) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  
  // Block operations
  addBlock: (sectionId: string, blockType: string, index?: number) => void;
  removeBlock: (sectionId: string, blockId: string) => void;
  updateBlock: (sectionId: string, blockId: string, settings: Record<string, any>) => void;
  reorderBlocks: (sectionId: string, startIndex: number, endIndex: number) => void;
};