// src/components/editor/DraggableSection.tsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ThemeSection } from '@/lib/types/theme';
import { Section } from './Section';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/lib/store/editor-store';
import { DeviceType } from '@/lib/types/editor';

interface DraggableSectionProps {
  section: ThemeSection;
  isPreview: boolean;
  
}

export function DraggableSection({ section, isPreview }: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });
  const devicePreview = useEditorStore((state) => state.devicePreview);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group',
        isDragging && 'z-50',
        !isPreview && 'hover:outline hover:outline-2 hover:outline-blue-500',
        // Add responsive classes based on device
        devicePreview === 'mobile' && 'mobile-view',
        devicePreview === 'tablet' && 'tablet-view'
      )}
    >
      {!isPreview && (
        <button
          className={cn(
            'absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-white border border-gray-200 shadow-sm hover:bg-gray-50'
          )}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </button>
      )}
      <Section 
        section={section} 
        isPreview={isPreview}
        // devicePreview={devicePreview}
      />
    </div>
  );
}