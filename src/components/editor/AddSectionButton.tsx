import { useState } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddSectionButtonProps {
  themeId: string;
  index: number;
}

export function AddSectionButton({ themeId, index }: AddSectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addSection = useThemeStore(state => state.addSection);

  const sectionTypes = [
    { type: 'hero', label: 'Hero Section' },
    { type: 'features', label: 'Features' },
    { type: 'footer', label: 'Footer' }
  ];

  const handleAddSection = (sectionType: string) => {
    addSection(themeId, sectionType, index);
    setIsOpen(false);
  };

  return (
    <>
      <div className="py-2 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {sectionTypes.map((section) => (
              <Button
                key={section.type}
                variant="outline"
                onClick={() => handleAddSection(section.type)}
                className="justify-start"
              >
                {section.label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}