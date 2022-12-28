import { Dayjs } from "dayjs";

export type IntervalFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export interface FormData {
  ticker: string;
  amount: number;
  startDate: Dayjs;
  endDate: Dayjs;
  intervalCount: number;
  intervalFrequency: IntervalFrequency;
}
