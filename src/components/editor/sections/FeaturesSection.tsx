import { ThemeSection } from "@/lib/types/theme";
import { Icons } from "@/components/ui/icons";

interface FeaturesSectionProps {
  section: ThemeSection;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  const { settings } = section;

  const renderIcon = (iconName: string) => {
    // Make sure the icon exists in Icons
    const Icon = Icons[iconName as keyof typeof Icons];
    if (!Icon) return null;

    // Return the icon component
    return <Icon className="h-6 w-6" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2
        className="text-3xl font-bold"
        style={{
          fontSize: settings.heading?.fontSize,
          color: settings.heading?.color,
          textAlign: settings.heading?.textAlign as any,
        }}
      >
        {settings.heading?.text}
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {settings.features?.map((feature: any) => (
          <div
            key={feature.id}
            className="relative p-6 bg-white rounded-xl shadow-sm"
          >
            <div className="text-xl mb-4">
              {feature.icon && renderIcon(feature.icon)}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}