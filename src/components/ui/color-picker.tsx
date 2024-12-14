import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const predefinedColors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#808080", "#800000",
  "#808000", "#008000", "#800080", "#008080", "#000080"
];

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [inputValue, setInputValue] = React.useState(color);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      onChange(value);
    }
  };

  const handleColorSelect = (newColor: string) => {
    setInputValue(newColor);
    onChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start", className)}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border border-gray-200"
              style={{ backgroundColor: color }}
            />
            <span>{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Preset Colors</Label>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "h-6 w-6 rounded border border-gray-200",
                    color === presetColor && "ring-2 ring-offset-2 ring-black"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorSelect(presetColor)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Custom Color</Label>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="#000000"
              className="font-mono"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}