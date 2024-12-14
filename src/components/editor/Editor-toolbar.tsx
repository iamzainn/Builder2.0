// src/components/editor/Editor-toolbar.tsx
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEditorStore } from '@/lib/store/editor-store';
import { deviceConfig } from '@/lib/config/devices';
import type { DeviceType } from '@/lib/types/editor';

export function DevicePreview() {
  const devicePreview = useEditorStore((state) => state.devicePreview);
  const setDevicePreview = useEditorStore((state) => state.setDevicePreview);

  const icons = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor
  };

  return (
    <ToggleGroup 
      type="single" 
      value={devicePreview}
      onValueChange={(value: DeviceType) => {
        if (value) setDevicePreview(value);
      }}
      className="border rounded-lg p-1"
    >
      {(Object.keys(deviceConfig) as DeviceType[]).map((device) => {
        const Icon = icons[device];
        return (
          <ToggleGroupItem
            key={device}
            value={device}
            className="data-[state=on]:bg-primary/10 w-10 h-10"
            aria-label={deviceConfig[device].label}
          >
            <Icon className="h-4 w-4" />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}