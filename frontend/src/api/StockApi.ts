import { AxiosResponse } from "axios";
import { StockInfo } from "../types/StockInfo";
import { DcaResults, MarketData } from "../types/dcaResults";
import Api from "./Api";

export class StockApi {
  static getPriceHistory(
    ticker: string,
    startDate: string,
    endDate: string,
  ): Promise<AxiosResponse<MarketData[]>> {
    return Api.get("price-history", { params: { ticker, startDate, endDate } });
  }

  static getDcaResults(
    ticker: string,
    amount: number,
    startDate: string,
    endDate: string,
    interval: number,
  ): Promise<AxiosResponse<DcaResults>> {
    return Api.get("dca-results", {
      params: { ticker, amount, startDate, endDate, interval },
    });
  }

  static searchStocks(query: string, limit: number): Promise<AxiosResponse<StockInfo[]>> {
    return Api.get("stocks", {
      params: { query, limit },
    });
  }
}
