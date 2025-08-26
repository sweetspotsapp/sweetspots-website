import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateStr(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}

export function truncateWords(str: string, maxWords: number): string {
  const words = str.split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + '…';
}

export function priceLevelToCost(priceLevel: string): number[] {
  switch (priceLevel) {
    case "0":
      return [0];
    case "$":
      return [15];
    case "$$":
      return [15, 40];
    case "$$$":
      return [40, 100];
    case "$$$$":
      return [100, 200];
    default:
      return [15];
  }
}