export interface MarketDataTable {
  schema: {
    fields: {
      name: string;
      type: number;
    }[];
    pandas_version: string;
    primaryKey: string[];
  };
  data: MarketData[];
}

export interface MarketData {
  time: string;
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
  dividends: number;
  stockSplits: number;
}