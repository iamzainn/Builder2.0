import { useThemeStore } from '@/lib/store/theme-store';
import { useEditorStore } from '@/lib/store/editor-store';
import { useHistoryStore } from '@/lib/store/history-store';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Undo2, Redo2, Save } from 'lucide-react';

export default function EditorHeader() {
  const theme = useThemeStore(state => state.getActiveTheme());
  const { isPreviewMode, setPreviewMode } = useEditorStore();
  const { canUndo, canRedo, undo, redo } = useHistoryStore();

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold">
          {theme?.name || 'Theme Editor'}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPreviewMode(!isPreviewMode)}
        >
          {isPreviewMode ? (
            <><EyeOff className="h-4 w-4 mr-2" /> Edit</>
          ) : (
            <><Eye className="h-4 w-4 mr-2" /> Preview</>
          )}
        </Button>

        <div className="h-4 w-px bg-gray-200" />

        <Button
          variant="ghost"
          size="sm"
          disabled={!canUndo()}
          onClick={undo}
        >
          <Undo2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          disabled={!canRedo()}
          onClick={redo}
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <div className="h-4 w-px bg-gray-200" />

        <Button variant="default" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </header>
  );
}