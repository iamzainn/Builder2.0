import { useThemeStore } from "@/lib/store/theme-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function ThemeSettings() {
  const theme = useThemeStore((state) => state.getActiveTheme());
  const updateThemeSettings = useThemeStore((state) => state.updateThemeSettings);

  if (!theme) return null;

  const handleNameChange = (value: string) => {
    updateThemeSettings(theme.id, { name: value });
  };

  const getSectionsByType = (type: string) => {
    return theme.sections.filter((section) => section.type === type);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <Label>Theme Name</Label>
        <Input
          value={theme.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sections">
          <AccordionTrigger>Sections Overview</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Header Sections</h4>
                <SectionList sections={getSectionsByType("header")} />
              </div>
              <div>
                <h4 className="font-medium mb-2">Content Sections</h4>
                <SectionList 
                  sections={[
                    ...getSectionsByType("hero"),
                    ...getSectionsByType("features")
                  ]} 
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Footer Sections</h4>
                <SectionList sections={getSectionsByType("footer")} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="global">
          <AccordionTrigger>Global Settings</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-500">
              Global settings will be implemented in future updates.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface SectionListProps {
  sections: any[];
}

function SectionList({ sections }: SectionListProps) {
  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <div
          key={section.id}
          className="flex items-center justify-between p-2 bg-gray-50 rounded"
        >
          <span className="text-sm">
            {section.settings?.heading?.text || section.type}
          </span>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}