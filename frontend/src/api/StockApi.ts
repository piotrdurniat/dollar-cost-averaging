import { StockInfo } from "@typeDefs/StockInfo";
import { DcaResults, MarketData } from "@typeDefs/dcaResults";
import Api from "./Api";

export class StockApi {
  static async getPriceHistory(ticker: string, startDate: string, endDate: string) {
    const { data } = await Api.get<MarketData[]>("price-history", {
      params: { ticker, startDate, endDate },
    });
    return data;
  }

  static async getDcaResults(
    ticker: string,
    amount: number,
    startDate: string,
    endDate: string,
    interval: number,
  ) {
    const { data } = await Api.get<DcaResults>("dca-results", {
      params: { ticker, amount, startDate, endDate, interval },
    });
    return data;
  }

  static async searchStocks(query: string, limit: number) {
    const { data } = await Api.get<StockInfo[]>("stocks", {
      params: { query, limit },
    });
    return data;
  }
}
