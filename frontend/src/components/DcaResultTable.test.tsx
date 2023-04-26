import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "@i18n/i18n";
import { RecoilRoot } from "recoil";
import { describe, it } from "vitest";
import { FinancialResults } from "@typeDefs/dcaResults";
import { render } from "@utils/test-utils";
import DcaResultTable from "./DcaResultTable";

const mockQueryClient = new QueryClient();

const mockThemeDark = {
  palette: {
    mode: "dark",
  },
} as const;

const mockResult: FinancialResults = {
  totalInvestmentValue: 0,
  finalInvestmentValue: 0,
  numberOfInvestments: 0,
  numberOfShares: 0,
  priceChange: 0,
  dividends: 0,
  return: {
    absolute: 0,
    relative: 0,
  },
  annualizedReturn: {
    absolute: 0,
    relative: 0,
  },
} as const;

describe("DcaResultTable", () => {
  it("render DcaResultTable component", () => {
    const theme = createTheme(mockThemeDark);

    render(
      <RecoilRoot>
        <QueryClientProvider client={mockQueryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DcaResultTable result={mockResult} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>,
    );
  });
});
