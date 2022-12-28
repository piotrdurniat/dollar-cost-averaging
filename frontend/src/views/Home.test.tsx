import { describe, it } from "vitest";
import Home from "./Home";
import { RecoilRoot } from "recoil";
import { render, screen } from "../util/test-utils";
import "../i18n/i18n";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeOptions } from "@mui/material";

const mockQueryClient = new QueryClient();

const mockThemeLight = {
  palette: {
    mode: "light",
  },
} as const;

const mockThemeDark = {
  palette: {
    mode: "dark",
  },
} as const;

describe("Home", () => {
  it("renders Home component in dark mode", () => {
    const theme = createTheme(mockThemeDark);
    testHome(theme);
  });

  it("renders Home component in light mode", () => {
    const theme = createTheme(mockThemeLight);
    testHome(theme);
  });

  const testHome = (theme: ThemeOptions) => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={mockQueryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Home />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    // Expect h4 to be rendered
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  };
});
