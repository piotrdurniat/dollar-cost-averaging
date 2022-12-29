import { describe, it } from "vitest";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import SettingsDrawer from "./SettingsDrawer";
import { render, screen } from "../../util/test-utils";
import "../../i18n/i18n";

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
            <SettingsDrawer open={true} setOpen={(_: boolean) => {}} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    expect(screen.getByTestId("theme-button-group")).toBeInTheDocument();
    expect(screen.getByTestId("language-button-group")).toBeInTheDocument();
  });
});
