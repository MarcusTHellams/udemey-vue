import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSafeJSONParse = <T>(str: string) => {
  let result;
  try {
    result = JSON.parse(str);
  } catch {
    result = {};
  }
  return result as T;
};
