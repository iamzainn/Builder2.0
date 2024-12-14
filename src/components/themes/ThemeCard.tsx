'use client';
import { Theme } from "@/lib/types/theme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ThemePreview } from "./ThemePreview";

interface ThemeCardProps {
  theme: Theme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const router = useRouter();

  const handleSelectTheme = useCallback(() => {
    // We'll implement theme store later
    router.push(`/editor?theme=default-theme-1`);
  }, [router]);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-0">
        <CardTitle>{theme.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="relative aspect-[16/9] bg-gray-100 rounded-md overflow-hidden">
          <ThemePreview theme={theme} />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            {theme.sections.length} sections included:
          </div>
          <div className="text-sm text-gray-600">
            {theme.sections.map(section => section.type).join(', ')}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleSelectTheme} 
          className="w-full"
        >
          Select and Customize
        </Button>
      </CardFooter>
    </Card>
  );
}
