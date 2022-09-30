import { Dayjs } from "dayjs";

export interface FormData {
  ticker: string;
  amount: number;
  startDate: Dayjs;
}
