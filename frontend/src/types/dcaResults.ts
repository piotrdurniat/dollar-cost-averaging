export interface DcaResults {
  financialResults: FinancialResults;
  priceHistory: MarketData[];
}

export interface FinancialResults {
  totalInvestmentValue: number;
  finalInvestmentValue: number;
  numberOfInvestments: number;
  numberOfShares: number;
  priceChange: number;
  dividends: number;
  return: {
    absolute: number;
    relative: number;
  };
  annualizedReturn: {
    absolute: number;
    relative: number;
  };
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
