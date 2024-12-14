import { useThemeStore } from '@/lib/store/theme-store';
import { useEditorStore } from '@/lib/store/editor-store';
import { useHistoryStore } from '@/lib/store/history-store';
import { DraggableSection } from './DraggableSection';
import { AddSectionButton } from './AddSectionButton';
import { DragOverlay } from './DragOverlay';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeSection } from '@/lib/types/theme';

export default function EditorCanvas() {
  const theme = useThemeStore(state => state.getActiveTheme());
  const isPreviewMode = useEditorStore(state => state.isPreviewMode);
  const reorderSections = useThemeStore(state => state.reorderSections);
  const recordChange = useHistoryStore(state => state.recordChange);
  const [activeSection, setActiveSection] = useState<ThemeSection | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance to start
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // Delay for touch devices
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const section = theme?.sections.find(s => s.id === event.active.id);
    if (section) {
      setActiveSection(section);
    }
    useEditorStore.getState().setSelectedElement(null);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveSection(null);
    const { active, over } = event;

    if (over && active.id !== over.id && theme) {
      const oldIndex = theme.sections.findIndex(
        section => section.id === active.id
      );
      const newIndex = theme.sections.findIndex(
        section => section.id === over.id
      );

      reorderSections(theme.id, oldIndex, newIndex);
      recordChange(theme);
    }
  };

  if (!theme) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No theme selected</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div 
        className={cn(
          "min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-sm transition-opacity",
          isDragging && "opacity-95"
        )}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={theme.sections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            {theme.sections.map((section, index) => (
              <div key={section.id}>
                <DraggableSection
                  section={section}
                  isPreview={isPreviewMode}
                />
                {!isPreviewMode && (
                  <AddSectionButton
                    themeId={theme.id}
                    index={index + 1}
                  />
                )}
              </div>
            ))}
          </SortableContext>
          <DragOverlay activeSection={activeSection} />
        </DndContext>
      </div>
    </div>
  );
}