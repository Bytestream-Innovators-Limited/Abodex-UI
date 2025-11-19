import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeRangeToDays(timeRange: string) {
  switch (timeRange) {
    case "90d":
      return 90
    case "30d":
      return 30
    case "7d":
      return 7
    case "1d":
      return 24 / 24 // 1 day
    case "12hr":
      return 12 / 24 // 2 hours in days
    case "6hr":
      return 6 / 24 // 2 hours in days
    case "2hr":
      return 2 / 24 // 2 hours in days
    case "1hr":
      return 1 / 24 // 1 hour in days
    case "30mn":
      return 0.5 / 24 // 30 minutes in days
    case "15mn":
      return 0.25 / 24 // 15 minutes in days
    case "5mn":
      return (5 / 60) / 24 // 5 minutes in days
    default:
      return 90 // default fallback
  }
}

// Function to get display label for time range
export function getTimeRangeLabel(timeRange: string) {
  switch (timeRange) {
    case "90d":
      return "Last 3 months"
    case "30d":
      return "Last 30 days"
    case "7d":
      return "Last 7 days"
    case "1d":
      return "Last 24 hours"
    case "12hr":
      return "Last 12 hours"
    case "6hr":
      return "Last 6 hours"
    case "2hr":
      return "Last 2 hours"
    case "1hr":
      return "Last 60 mins"
    case "30mn":
      return "Last 30 mins"
    case "15mn":
      return "Last 15 mins"
    case "5mn":
      return "Last 5 mins"
    default:
      return "Last 3 months"
  }
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(price)
}

export const pastWeek = () => {
  return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime()
}

export const pastMonth = () => {
  return new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).getTime()
}

export const pastYear = () => {
  return new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000).getTime()
}

export const today = () => {
  return new Date().getTime()
}

/**
 * Checks if a given URL resolves to a valid, loadable image.
 * @param url The image URL to check.
 * @param timeoutMs Optional timeout in milliseconds (defaults to 5000ms).
 * @returns A Promise that resolves to true if the image is accessible, false otherwise.
 */
export const checkImageAccessibility = (
  url: string,
  timeoutMs: number = 5000
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url || typeof url !== "string" || url.trim().length === 0) {
      return resolve(false);
    }

    const img = new Image();

    // Success: The image loaded correctly
    img.onload = () => {
      // Check if the image has a non-zero size to filter out invalid placeholders
      if (img.width > 1 && img.height > 1) {
        clearTimeout(timeoutId); // Clear timeout if image loads successfully
        resolve(true);
      } else {
        clearTimeout(timeoutId);
        resolve(false);
      }
    };

    // Failure: The image failed to load (404, connection error, etc.)
    img.onerror = () => {
      clearTimeout(timeoutId);
      resolve(false);
    };

    // Set the source to start the loading process
    img.src = url;

    // Set a timeout to prevent hanging requests
    const timeoutId = setTimeout(() => {
      img.src = ""; // Abort the image load
      resolve(false);
    }, timeoutMs);
  });
};