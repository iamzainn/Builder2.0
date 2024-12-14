import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { ThemeSection } from '@/lib/types/theme';
import { Section } from './Section';

interface DragOverlayProps {
  activeSection: ThemeSection | null;
}

export function DragOverlay({ activeSection }: DragOverlayProps) {
  if (!activeSection) return null;

  return (
    <DndDragOverlay>
      <div className="w-full max-w-screen-xl mx-auto bg-white shadow-lg opacity-80">
        <Section
          section={activeSection}
          isPreview={false}
        />
      </div>
    </DndDragOverlay>
  );
}