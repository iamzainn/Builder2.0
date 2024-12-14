import { ThemeSection } from "@/lib/types/theme";

interface FooterSectionProps {
  section: ThemeSection;
}

export default function FooterSection({ section }: FooterSectionProps) {
  const { settings } = section;

  return (
    <footer className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p
          style={{
            fontSize: settings.copyright?.fontSize,
            color: settings.copyright?.color,
          }}
        >
          {settings.copyright?.text}
        </p>
        <nav>
          <ul className="flex space-x-6">
            {settings.links?.map((item: any) => (
              <li key={item.label}>
                <a
                  href={item.link}
                  className="text-gray-400 hover:text-gray-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
