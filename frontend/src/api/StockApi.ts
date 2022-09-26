import Api from "./Api";
import { AxiosResponse } from "axios";
import { DcaResults, MarketData } from "../types/dcaResults";

export class StockApi {
  static getPriceHistory(
    ticker: string,
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<MarketData[]>> {
    return Api.get("price-history", { params: { ticker, startDate, endDate } });
  }

  static getDcaResults(
    ticker: string,
    amount: number,
    startDate: string,
    endDate: string,
    interval: number
  ): Promise<AxiosResponse<DcaResults>> {
    return Api.get("dca-results", {
      params: { ticker, amount, startDate, endDate, interval },
    });
  }
}
