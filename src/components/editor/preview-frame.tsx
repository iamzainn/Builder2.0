// src/components/editor/preview-frame.tsx
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editor-store";
import { deviceConfig } from "@/lib/config/devices";

export function PreviewFrame({ children }: { children: React.ReactNode }) {
  const devicePreview = useEditorStore((state) => state.devicePreview);
  const config = deviceConfig[devicePreview];

  return (
    <div className="w-full h-full overflow-auto flex justify-center bg-muted/10 p-8">
      <div
        className={cn(
          "h-full bg-background transition-all duration-300 ease-in-out",
          devicePreview !== 'desktop' && "border rounded-lg shadow-lg",
          devicePreview === 'mobile' && "w-[375px]",
          devicePreview === 'tablet' && "w-[768px]",
          devicePreview === 'desktop' && "w-full max-w-[1440px]"
        )}
        style={{
          minHeight: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
}