// src/components/editor/Section.tsx
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
  const devicePreview = useEditorStore(state => state.devicePreview);

  const isSelected = selectedElement?.sectionId === section.id;

  const handleSectionClick = () => {
    if (!isPreview) {
      setSelectedElement({ sectionId: section.id, type: 'section' });
    }
  };

  if (!section.isVisible) return null;

  // Get responsive styles based on device
  const getResponsiveStyles = () => {
    const baseStyles = { ...section.styles };
    const responsiveStyles = section.styles?.responsive?.[devicePreview] || {};

    return {
      ...baseStyles,
      ...responsiveStyles
    };
  };

  const getSectionComponent = () => {
    const sectionProps = {
      section,
      devicePreview
    };

    switch (section.type) {
      case 'header':
        return <HeaderSection {...sectionProps} />;
      case 'hero':
        return <HeroSection {...sectionProps} />;
      case 'features':
        return <FeaturesSection {...sectionProps} />;
      case 'footer':
        return <FooterSection {...sectionProps} />;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return (
    <div
      className={cn(
        'relative transition-all',
        !isPreview && 'hover:outline hover:outline-2 hover:outline-blue-500',
        isSelected && 'outline outline-2 outline-blue-500',
        // Add responsive classes based on device
        devicePreview === 'mobile' && 'max-w-full px-4',
        devicePreview === 'tablet' && 'max-w-full px-6',
        devicePreview === 'desktop' && 'max-w-7xl mx-auto px-8'
      )}
      onClick={handleSectionClick}
      style={getResponsiveStyles()}
    >
      {getSectionComponent()}
    </div>
  );
}