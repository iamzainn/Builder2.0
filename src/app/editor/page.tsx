// src/app/editor/page.tsx

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useThemeStore } from '@/lib/store/theme-store';
import EditorLayout from '@/components/editor/EditorLayout';
import { useRouter } from 'next/navigation';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setActiveTheme = useThemeStore(state => state.setActiveTheme);
  const getActiveTheme = useThemeStore(state => state.getActiveTheme);

  useEffect(() => {
    const themeId = searchParams.get('theme');
    // console.log(themeId);
    if (!themeId) {
      router.push('/'); // Redirect to theme selection if no theme ID
      return;
    }
    
    setActiveTheme(themeId);
    const theme = getActiveTheme();
  
    if (!theme) {
      router.push('/'); // Redirect if theme not found
      return;
    }
  }, [searchParams, setActiveTheme, getActiveTheme, router]);

  return <EditorLayout />;
}