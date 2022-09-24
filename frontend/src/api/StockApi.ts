import Api from "./Api";
import { AxiosResponse } from "axios";
import { MarketData } from "../types/marketData";
import { DcaResult } from "../types/dcaStrategy";

export class StockApi {
  static getPriceHistory(
    ticker: string,
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<MarketData[]>> {
    return Api.get("price-history", { params: { ticker, startDate, endDate } });
  }

  static getDcaResult(
    ticker: string,
    amount: number,
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<DcaResult>> {
    return Api.get("dca-result", {
      params: { ticker, amount, startDate, endDate },
    });
  }
}
