import { useEditorStore } from '@/lib/store/editor-store';
import { useThemeStore } from '@/lib/store/theme-store';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import SectionSettings from './settings/SectionSettings';
import ThemeSettings from './settings/ThemeSettings';


export default function EditorSidebar() {
  const isSidebarOpen = useEditorStore(state => state.isSidebarOpen);
  const setSidebarOpen = useEditorStore(state => state.setSidebarOpen);
  const selectedElement = useEditorStore(state => state.selectedElement);
  const theme = useThemeStore(state => state.getActiveTheme());

  if (!isSidebarOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed right-4 top-20"
        onClick={() => setSidebarOpen(true)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed right-0 top-14 bottom-0 w-[300px] bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-medium">
          {selectedElement ? 'Section Settings' : 'Theme Settings'}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {selectedElement ? (
          <SectionSettings
            themeId={theme?.id ?? ''}
            sectionId={selectedElement.sectionId}
          />
        ) : (
          <ThemeSettings />
        )}
      </div>
    </div>
  );
}