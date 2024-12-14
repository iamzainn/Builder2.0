import { ThemeSection } from '@/lib/types/theme';
import { cn } from '@/lib/utils';


interface HeaderSectionProps {
  section: ThemeSection;
  devicePreview: string;
}

export default function HeaderSection({ section,devicePreview }: HeaderSectionProps) {
  const { settings } = section;

   // Get responsive settings
   const getResponsiveValue = (key: string, defaultValue: any) => {
    const responsiveValue = settings?.responsive?.[devicePreview]?.[key];
    return responsiveValue || settings?.[key] || defaultValue;
  };

  return (
    <header className={cn(
      "flex items-center",
      devicePreview === 'mobile' ? "flex-col gap-4" : "justify-between"
    )}>
      <div 
        className={cn(
          "font-bold",
          devicePreview === 'mobile' ? "text-xl" : "text-2xl"
        )}
        style={{ 
          fontSize: getResponsiveValue('logo.fontSize', '1.5rem'),
          color: getResponsiveValue('logo.color', '#000000')
        }}
      >
        {settings.logo.text}
      </div>
      
      <nav className={cn(
        devicePreview === 'mobile' ? "flex flex-col gap-2" : "flex gap-6"
      )}>
      

        {settings.navigation.map((item: any) => (
          <a
            key={item.id}
            href={item.link}
            className={cn(
                  "transition-colors hover:text-primary",
                  devicePreview === 'mobile' ? "text-base" : "text-sm"
                )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );;
}