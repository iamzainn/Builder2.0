import { ThemeSection } from '@/lib/types/theme';
import { useEditorStore } from '@/lib/store/editor-store';
import { cn } from '@/lib/utils';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import FooterSection from './sections/FooterSection';


interface SectionProps {
  section: ThemeSection;
  isPreview: boolean;
}

export function Section({ section, isPreview }: SectionProps) {
  const setSelectedElement = useEditorStore(state => state.setSelectedElement);
  const selectedElement = useEditorStore(state => state.selectedElement);

  const isSelected = selectedElement?.sectionId === section.id;

  const handleSectionClick = () => {
    if (!isPreview) {
      setSelectedElement({ sectionId: section.id, type: 'section' });
    }
  };

  if (!section.isVisible) return null;

  const getSectionComponent = () => {
    switch (section.type) {
      case 'header':
        return <HeaderSection section={section} />;
      case 'hero':
        return <HeroSection section={section} />;
      case 'features':
        return <FeaturesSection section={section} />;
      case 'footer':
        return <FooterSection section={section} />;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return (
    <div
      className={cn(
        'relative transition-all',
        !isPreview && 'hover:outline hover:outline-2 hover:outline-blue-500',
        isSelected && 'outline outline-2 outline-blue-500'
      )}
      onClick={handleSectionClick}
      style={section.styles}
    >
      {getSectionComponent()}
    </div>
  );
}