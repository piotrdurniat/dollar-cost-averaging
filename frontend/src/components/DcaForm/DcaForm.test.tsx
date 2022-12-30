import { describe, it } from "vitest";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import dayjs from "dayjs";
import DcaForm from "./DcaForm";
import { render, screen } from "../../util/test-utils";
import "../../i18n/i18n";
import { DcaFormData } from "../../types/DcaFormData";

const mockQueryClient = new QueryClient();

const mockThemeDark = {
  palette: {
    mode: "dark",
  },
} as const;

const mockSetFormData = (_: DcaFormData) => {
  return;
};

describe("DcaForm", () => {
  it("render DCA Form and test all of it's fields", () => {
    const mockFormData = {
      ticker: "msft",
      amount: 100,
      startDate: dayjs().subtract(1, "year"),
      endDate: dayjs(),
      intervalCount: 1,
      intervalFrequency: "MONTHLY",
    } as const;

    renderDcaForm(mockFormData);

    expect(getFirstInputInsideDiv("ticker")).toHaveValue(
      String(mockFormData.ticker)
    );
    expect(getFirstInputInsideDiv("amount")).toHaveValue(
      String(mockFormData.amount)
    );
    expect(getFirstInputInsideDiv("start-date")).toHaveValue(
      mockFormData.startDate.format("MM/DD/YYYY")
    );
    expect(getFirstInputInsideDiv("end-date")).toHaveValue(
      mockFormData.endDate.format("MM/DD/YYYY")
    );
    expect(getFirstInputInsideDiv("interval-count")).toHaveValue(
      String(mockFormData.intervalCount)
    );
    expect(getFirstInputInsideDiv("interval-frequency")).toHaveValue(
      String(mockFormData.intervalFrequency)
    );
  });

  it("render DCA Form with invalid fields and check errors", () => {
    const mockFormData = {
      ticker: "",
      amount: 0,
      startDate: dayjs("invalid date string"),
      endDate: dayjs("invalid date string"),
      intervalCount: 0,
      intervalFrequency: "MONTHLY",
    } as const;

    renderDcaForm(mockFormData);
  });

  const renderDcaForm = (formData: DcaFormData) => {
    const theme = createTheme(mockThemeDark);

    render(
      <RecoilRoot>
        <QueryClientProvider client={mockQueryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DcaForm formData={formData} setFormData={mockSetFormData} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );
  };

  const getFirstInputInsideDiv = (divId: string) => {
    return screen.getByTestId(divId).getElementsByTagName("input")[0];
  };
});
