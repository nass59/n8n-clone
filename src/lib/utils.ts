/**
 * Utility functions for common operations.
 * Exports cn() for merging Tailwind classes without conflicts.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * PURPOSE: Merge Tailwind CSS classes intelligently, preventing conflicts
 * PURE: Yes
 * USED BY: All components with conditional or dynamic Tailwind classes
 * EXAMPLE: cn("px-2", condition && "px-4") -> "px-4" (rightmost wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
