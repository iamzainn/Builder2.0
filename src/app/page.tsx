import { ThemeCard } from "@/components/themes/ThemeCard";
import { defaultTheme } from "@/lib/themes/default-theme";


export default function ThemeSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Choose a theme</h1>
          <p className="mt-2 text-gray-600">
            Select a theme to start building your store. You can customize it later.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThemeCard theme={defaultTheme} />
        </div>
      </div>
    </div>
  );
}