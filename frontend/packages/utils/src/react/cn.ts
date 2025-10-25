import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Combines clsx with conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
