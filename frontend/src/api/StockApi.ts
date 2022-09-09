import Api from "./Api";
import { AxiosResponse } from "axios";
import { MarketDataTable } from "../types/marketData";

export class StockApi {
  static getPriceHistory(
    ticker: string
  ): Promise<AxiosResponse<MarketDataTable>> {
    return Api.get("price-history", { params: { ticker } });
  }
}
