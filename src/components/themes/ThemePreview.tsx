// src/components/themes/ThemePreview.tsx

import { Theme } from "@/lib/types/theme";
import { defaultThemeSchema } from "@/lib/schemas/default-theme";

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header Preview */}
      <div 
        className="h-8 px-4 flex items-center"
        style={{
          backgroundColor: theme.sections.find(s => s.type === 'header')?.styles.backgroundColor?.default || '#ffffff'
        }}
      >
        <div className="w-20 h-3 bg-gray-800 rounded" />
      </div>

      {/* Hero Preview */}
      <div 
        className="flex-1 p-4 flex flex-col items-center justify-center"
        style={{
          backgroundColor: theme.sections.find(s => s.type === 'hero')?.styles.backgroundColor?.default || '#f3f4f6'
        }}
      >
        <div className="w-32 h-4 bg-gray-800 rounded mb-2" />
        <div className="w-48 h-3 bg-gray-600 rounded" />
        <div className="mt-4 w-24 h-8 bg-blue-600 rounded" />
      </div>

      {/* Features Preview */}
      <div className="h-20 p-4 flex justify-center space-x-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-20 h-full bg-gray-100 rounded" />
        ))}
      </div>

      {/* Footer Preview */}
      <div 
        className="h-6 px-4 flex items-center"
        style={{
          backgroundColor: theme.sections.find(s => s.type === 'footer')?.styles.backgroundColor?.default || '#1f2937'
        }}
      >
        <div className="w-24 h-2 bg-gray-400 rounded" />
      </div>
    </div>
  );
}