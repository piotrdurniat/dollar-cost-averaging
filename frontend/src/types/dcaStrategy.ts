export interface DcaResult {
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
