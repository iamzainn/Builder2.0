// src/lib/store/editor-store.ts
import { create } from 'zustand';
import type { DeviceType } from '@/lib/types/editor';

interface SelectedElement {
  sectionId: string;
  type: 'section' | 'settings';
}

interface EditorState {
  // UI State
  isSidebarOpen: boolean;
  selectedElement: SelectedElement | null;
  isPreviewMode: boolean;
  devicePreview: DeviceType;
  
  // Actions
  setSidebarOpen: (isOpen: boolean) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setDevicePreview: (device: DeviceType) => void;
  
  // Helper
  clearSelection: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  isSidebarOpen: true,
  selectedElement: null,
  isPreviewMode: false,
  devicePreview: 'desktop',

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

  setDevicePreview: (device) => set({ 
    devicePreview: device,
    // Optionally reset or adjust certain UI states when changing device view
    // selectedElement: null 
  }),

  clearSelection: () => set({ selectedElement: null }),
}));