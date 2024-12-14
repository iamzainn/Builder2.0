// src/lib/store/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ThemeSection } from '@/lib/types/theme';
import { defaultTheme } from '../themes/default-theme';
import { v4 as uuidv4 } from 'uuid';

interface ThemeStore {
  // State
  themes: Theme[];
  activeThemeId: string | null;
  
  // Theme Management
  addTheme: (theme: Theme) => void;
  removeTheme: (themeId: string) => void;
  setActiveTheme: (themeId: string) => void;
  getActiveTheme: () => Theme | null;
  
  // Section Management
  addSection: (themeId: string, sectionType: string, index?: number) => void;
  removeSection: (themeId: string, sectionId: string) => void;
  updateSection: (themeId: string, sectionId: string, path: string, value: any) => void;
  reorderSections: (themeId: string, startIndex: number, endIndex: number) => void;
  
  // Theme Customization
  updateThemeSettings: (themeId: string, settings: Record<string, any>) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      themes: [{
        ...defaultTheme,
        id: 'default-theme-1'
      }],
      activeThemeId: null,

      // Theme Management
      addTheme: (theme) => set((state) => ({
        themes: [...state.themes, theme]
      })),

      removeTheme: (themeId) => set((state) => ({
        themes: state.themes.filter(theme => theme.id !== themeId),
        activeThemeId: state.activeThemeId === themeId ? null : state.activeThemeId
      })),

      setActiveTheme: (themeId) => {
        const theme = get().themes.find(t => t.id === themeId);
        if (theme) {
          set({ activeThemeId: themeId });
          return true;
        }
        return false;
      },

      getActiveTheme: () => {
        const state = get();
        return state.themes.find(theme => theme.id === state.activeThemeId) || null;
      },

      // Section Management
      addSection: (themeId, sectionType, index) => set((state) => {
        const theme = state.themes.find(t => t.id === themeId);
        if (!theme) return state;

        const defaultConfig = defaultTheme.sections.find(s => s.type === sectionType);
        if (!defaultConfig) return state;

        const newSection: ThemeSection = {
          id: uuidv4(),
          type: sectionType,
          isVisible: true,
          styles: JSON.parse(JSON.stringify(defaultConfig.styles)),
          settings: JSON.parse(JSON.stringify(defaultConfig.settings))
        };

        const updatedTheme = {
          ...theme,
          sections: [...theme.sections]
        };

        if (typeof index === 'number') {
          updatedTheme.sections.splice(index, 0, newSection);
        } else {
          updatedTheme.sections.push(newSection);
        }

        return {
          themes: state.themes.map(t => 
            t.id === themeId ? updatedTheme : t
          )
        };
      }),

      removeSection: (themeId, sectionId) => set((state) => ({
        themes: state.themes.map(theme => 
          theme.id === themeId
            ? {
                ...theme,
                sections: theme.sections.filter(section => section.id !== sectionId)
              }
            : theme
        )
      })),

      updateSection: (themeId, sectionId, path, value) => set((state) => {
        return {
          themes: state.themes.map(theme => {
            if (theme.id !== themeId) return theme;

            return {
              ...theme,
              sections: theme.sections.map(section => {
                if (section.id !== sectionId) return section;

                const pathParts = path.split('.');
                const newSection = { ...section };
                let current = newSection;

                for (let i = 0; i < pathParts.length - 1; i++) {
                  const part = pathParts[i];
                  if (!(part in current)) {
                    current[part] = {};
                  }
                  current[part] = { ...current[part] };
                  current = current[part];
                }

                current[pathParts[pathParts.length - 1]] = value;
                return newSection;
              })
            };
          })
        };
      }),

      reorderSections: (themeId, startIndex, endIndex) => set((state) => {
        const theme = state.themes.find(t => t.id === themeId);
        if (!theme) return state;

        const newSections = [...theme.sections];
        const [removed] = newSections.splice(startIndex, 1);
        newSections.splice(endIndex, 0, removed);

        return {
          themes: state.themes.map(t =>
            t.id === themeId ? { ...t, sections: newSections } : t
          )
        };
      }),

      // Theme Customization
      updateThemeSettings: (themeId, settings) => set((state) => {
        const deepMerge = (target: any, source: any): any => {
          if (Array.isArray(source)) {
            return source;
          }

          const output = { ...target };
          
          Object.keys(source).forEach((key) => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
              output[key] = deepMerge(target[key] || {}, source[key]);
            } else {
              output[key] = source[key];
            }
          });
          
          return output;
        };

        return {
          themes: state.themes.map(theme =>
            theme.id === themeId
              ? {
                  ...theme,
                  sections: theme.sections.map(section => {
                    if (!settings.sections) return section;
                    const sectionUpdate = settings.sections.find((s: any) => s.id === section.id);
                    return sectionUpdate ? deepMerge(section, sectionUpdate) : section;
                  })
                }
              : theme
          )
        };
      }),
    }),
    {
      name: 'theme-store',
    }
  )
);