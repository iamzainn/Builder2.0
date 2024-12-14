// src/lib/store/editor-store.ts

import { create } from 'zustand';

interface SelectedElement {
  sectionId: string;
  type: 'section' | 'settings';
}

interface EditorState {
  // UI State
  isSidebarOpen: boolean;
  selectedElement: SelectedElement | null;
  isPreviewMode: boolean;
  
  // Actions
  setSidebarOpen: (isOpen: boolean) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  
  // Helper
  clearSelection: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  isSidebarOpen: true,
  selectedElement: null,
  isPreviewMode: false,

  // Actions
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  setSelectedElement: (element) => set({ 
    selectedElement: element,
    isSidebarOpen: true // Open sidebar when selecting an element
  }),
  
  setPreviewMode: (isPreview) => set({ 
    isPreviewMode: isPreview,
    selectedElement: null // Clear selection in preview mode
  }),

  clearSelection: () => set({ selectedElement: null }),
}));