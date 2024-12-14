import { ThemeSection } from "@/lib/types/theme";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  section: ThemeSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const { settings } = section;

  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1
        className="text-4xl font-bold tracking-tight sm:text-6xl"
        style={{
          fontSize: settings.heading.fontSize,
          color: settings.heading.color,
        }}
      >
        {settings.heading.text}
      </h1>
      <p
        className="mt-6 text-lg leading-8"
        style={{
          fontSize: settings.subheading.fontSize,
          color: settings.subheading.color,
        }}
      >
        {settings.subheading.text}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button
          style={{
            backgroundColor: settings?.button?.backgroundColor,
            color: settings.button?.textColor,
          }}
        >
          {settings.button?.text}
        </Button>
      </div>
    </div>
  );
}