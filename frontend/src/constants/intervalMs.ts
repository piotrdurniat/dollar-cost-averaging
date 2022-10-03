export const INTERVAL_MS = {
  DAILY: 1000 * 60 * 60 * 24,
  WEEKLY: 1000 * 60 * 60 * 24 * 7,
  MONTHLY: (1000 * 60 * 60 * 24 * 365) / 12,
  YEARLY: 1000 * 60 * 60 * 24 * 365,
} as const;
