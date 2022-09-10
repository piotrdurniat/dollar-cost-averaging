import Api from "./Api";
import { AxiosResponse } from "axios";
import { MarketData } from "../types/marketData";

export class StockApi {
  static getPriceHistory(ticker: string): Promise<AxiosResponse<MarketData[]>> {
    return Api.get("price-history", { params: { ticker } });
  }
}
