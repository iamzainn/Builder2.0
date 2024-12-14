// src/components/editor/section-settings.tsx
import { useThemeStore } from '@/lib/store/theme-store';
import { defaultTheme } from '@/lib/themes/default-theme';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ColorPicker } from '@/components/ui/color-picker';
import { Switch } from '@/components/ui/switch';

interface SectionSettingsProps {
  themeId: string;
  sectionId: string;
}

export default function SectionSettings({ themeId, sectionId }: SectionSettingsProps) {
  const theme = useThemeStore(state => state.getActiveTheme());
  const updateThemeSettings = useThemeStore(state => state.updateThemeSettings);
  const section = theme?.sections.find(s => s.id === sectionId);

  if (!section) return null;

  // Get default settings for this section type
  const defaultSection = defaultTheme.sections.find(s => s.type === section.type);
  
  const handleUpdate = (path: string, value: any) => {
    const updatedSection = {
      ...section,
      settings: { ...section.settings }
    };

    // Handle nested paths
    const pathParts = path.split('.');
    let current = updatedSection.settings;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current[pathParts[i]] = { ...current[pathParts[i]] };
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;

    updateThemeSettings(themeId, {
      sections: theme?.sections.map(s => 
        s.id === sectionId ? updatedSection : s
      )
    });
  };

  const handleStyleUpdate = (key: string, value: any) => {
    const updatedSection = {
      ...section,
      styles: {
        ...section.styles,
        [key]: value
      }
    };

    updateThemeSettings(themeId, {
      sections: theme?.sections.map(s => 
        s.id === sectionId ? updatedSection : s
      )
    });
  };

  return (
    <div className="p-4 space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {/* Visibility Settings */}
        <AccordionItem value="visibility">
          <AccordionTrigger>Visibility</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between">
              <Label>Show Section</Label>
              <Switch
                checked={section.isVisible}
                onCheckedChange={(checked) => {
                  const updatedSection = { ...section, isVisible: checked };
                  updateThemeSettings(themeId, {
                    sections: theme?.sections.map(s => 
                      s.id === sectionId ? updatedSection : s
                    )
                  });
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Style Settings */}
        <AccordionItem value="styles">
          <AccordionTrigger>Styles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker
                  color={section.styles.backgroundColor}
                  onChange={(color) => handleStyleUpdate('backgroundColor', color)}
                />
              </div>
              <div className="space-y-2">
                <Label>Padding</Label>
                <Input
                  value={section.styles.padding}
                  onChange={(e) => handleStyleUpdate('padding', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Content Settings based on section type */}
        <AccordionItem value="content">
          <AccordionTrigger>Content</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {section.type === 'header' && (
                <>
                  <div className="space-y-2">
                    <Label>Logo Text</Label>
                    <Input
                      value={section.settings.logo.text}
                      onChange={(e) => handleUpdate('logo.text', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Color</Label>
                    <ColorPicker
                      color={section.settings.logo.color}
                      onChange={(color) => handleUpdate('logo.color', color)}
                    />
                  </div>
                </>
              )}

              {section.type === 'hero' && (
                <>
                  <div className="space-y-2">
                    <Label>Heading Text</Label>
                    <Input
                      value={section.settings.heading.text}
                      onChange={(e) => handleUpdate('heading.text', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subheading Text</Label>
                    <Input
                      value={section.settings.subheading.text}
                      onChange={(e) => handleUpdate('subheading.text', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={section.settings.button.text}
                      onChange={(e) => handleUpdate('button.text', e.target.value)}
                    />
                  </div>
                </>
              )}

              {section.type === 'features' && (
                <>
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={section.settings.heading.text}
                      onChange={(e) => handleUpdate('heading.text', e.target.value)}
                    />
                  </div>
                  {/* Feature items */}
                  {section.settings.features?.map((feature: any, index: number) => (
                    <div key={feature.id} className="space-y-2 border-t pt-4">
                      <Label>Feature {index + 1}</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...section.settings.features];
                          newFeatures[index] = { ...feature, title: e.target.value };
                          handleUpdate('features', newFeatures);
                        }}
                        placeholder="Feature Title"
                      />
                      <Input
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...section.settings.features];
                          newFeatures[index] = { ...feature, description: e.target.value };
                          handleUpdate('features', newFeatures);
                        }}
                        placeholder="Feature Description"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}