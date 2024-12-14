// src/lib/store/history-store.ts

import { create } from 'zustand';
import { Theme } from '@/lib/types/theme';
import { useThemeStore } from './theme-store';

interface HistoryState {
  past: Theme[];
  future: Theme[];
  
  // Actions
  recordChange: (theme: Theme) => void;
  undo: () => void;
  redo: () => void;
  
  // State
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Clear
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],

  recordChange: (theme) => {
    const currentTheme = useThemeStore.getState().getActiveTheme();
    if (!currentTheme) return;

    set(state => ({
      past: [...state.past, currentTheme],
      future: [] // Clear future when new change is made
    }));
  },

  undo: () => {
    const { past } = get();
    if (past.length === 0) return;

    const currentTheme = useThemeStore.getState().getActiveTheme();
    if (!currentTheme) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    set(state => ({
      past: newPast,
      future: [currentTheme, ...state.future]
    }));

    useThemeStore.setState(state => ({
      themes: state.themes.map(t =>
        t.id === currentTheme.id ? previous : t
      )
    }));
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return;

    const currentTheme = useThemeStore.getState().getActiveTheme();
    if (!currentTheme) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set(state => ({
      past: [...state.past, currentTheme],
      future: newFuture
    }));

    useThemeStore.setState(state => ({
      themes: state.themes.map(t =>
        t.id === currentTheme.id ? next : t
      )
    }));
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  clearHistory: () => set({ past: [], future: [] })
}));

// Hook to automatically record changes
export const useRecordHistory = () => {
  const recordChange = useHistoryStore(state => state.recordChange);
  const activeTheme = useThemeStore(state => state.getActiveTheme());

  const recordThemeChange = () => {
    if (activeTheme) {
      recordChange(activeTheme);
    }
  };

  return recordThemeChange;
};