import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "@i18n/i18n";
import { RecoilRoot } from "recoil";
import { describe, it } from "vitest";
import { render, screen } from "@utils/test-utils";
import SettingsDrawer from "./SettingsDrawer";

const mockQueryClient = new QueryClient();

const mockThemeDark = {
  palette: {
    mode: "dark",
  },
} as const;

describe("SettingsDrawer", () => {
  it("render SettingsDrawer component", () => {
    const theme = createTheme(mockThemeDark);

    render(
      <RecoilRoot>
        <QueryClientProvider client={mockQueryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SettingsDrawer open={true} setOpen={() => null} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>,
    );

    expect(screen.getByTestId("theme-button-group")).toBeInTheDocument();
    expect(screen.getByTestId("language-button-group")).toBeInTheDocument();
  });
});
