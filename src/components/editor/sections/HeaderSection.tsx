import { ThemeSection } from '@/lib/types/theme';

interface HeaderSectionProps {
  section: ThemeSection;
}

export default function HeaderSection({ section }: HeaderSectionProps) {
  const { settings } = section;

  return (
    <header className="flex items-center justify-between max-w-7xl mx-auto px-4">
      <div 
        className="font-bold"
        style={{ 
          fontSize: settings.logo.fontSize,
          color: settings.logo.color 
        }}
      >
        {settings.logo.text}
      </div>
      <nav>
        <ul className="flex space-x-6">
          {settings.navigation.map((item : any, index: number) => (
            <li key={index}>
              <a 
                href={item.link}
                className="text-gray-600 hover:text-gray-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}