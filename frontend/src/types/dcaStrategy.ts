export interface DcaResult {
  totalInvestmentValue: number;
  finalInvestmentValue: number;
  return: {
    absolute: number;
    relative: number;
  };
  annualizedReturn: {
    absolute: number;
    relative: number;
  };
}
