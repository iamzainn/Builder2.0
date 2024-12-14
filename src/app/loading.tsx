// src/app/loading.tsx

import { Card, CardContent } from "@/components/ui/card";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="aspect-[16/9] bg-gray-200 rounded animate-pulse" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}