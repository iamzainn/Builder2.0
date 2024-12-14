'use client';
import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { useEditorStore } from '@/lib/store/editor-store';

import { useSearchParams } from 'next/navigation';
import EditorHeader from './EditorHeader';
import EditorCanvas from './EditorCanvas';
import EditorSidebar from './EditorSidebar';

export default function EditorLayout() {
  const searchParams = useSearchParams();
  const setActiveTheme = useThemeStore(state => state.setActiveTheme);
  const isSidebarOpen = useEditorStore(state => state.isSidebarOpen);

  useEffect(() => {
    const themeId = searchParams.get('theme');
    if (themeId) {
      setActiveTheme(themeId);
    }
  }, [searchParams, setActiveTheme]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader />
      <div className="flex-1 flex overflow-hidden">
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'mr-[300px]' : ''
        }`}>
          <EditorCanvas />
        </main>
        <EditorSidebar />
      </div>
    </div>
  );
}