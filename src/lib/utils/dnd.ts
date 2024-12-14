// src/lib/utils/dnd.ts

import { Active, Over } from '@dnd-kit/core';
import { ThemeSection } from '@/lib/types/theme';

export const reorderArray = <T>(array: T[], from: number, to: number): T[] => {
  const newArray = array.slice();
  const [removed] = newArray.splice(from, 1);
  newArray.splice(to, 0, removed);
  return newArray;
};

export const findSectionPosition = (
  sections: ThemeSection[],
  id: string
): number => {
  return sections.findIndex(section => section.id === id);
};

export const getSectionFromId = (
  sections: ThemeSection[],
  id: string
): ThemeSection | undefined => {
  return sections.find(section => section.id === id);
};

export const canDropSection = (
  active: Active,
  over: Over | null,
  sections: ThemeSection[]
): boolean => {
  if (!over) return false;
  
  const activeSection = getSectionFromId(sections, active.id as string);
  const overSection = getSectionFromId(sections, over.id as string);
  
  if (!activeSection || !overSection) return false;
  
  // Add any additional drop validation logic here
  return true;
};