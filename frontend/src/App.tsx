import { FC, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useRecoilValue } from "recoil";
import NavBar from "./components/NavBar";
import { paletteModeState } from "./state/theme";
import HomePage from "./views/Home";

const queryClient = new QueryClient();

const App: FC = () => {
  const paletteMode = useRecoilValue(paletteModeState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#26A69A",
          },
          mode: paletteMode,
        },
        components: {
          MuiTableRow: {
            styleOverrides: {
              root: {
                "&:last-child td": {
                  borderBottom: 0,
                },
              },
            },
          },
        },
      }),
    [paletteMode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: paletteMode == "light" ? "#f5f5f5" : null,
          }}
        >
          <NavBar />
          <HomePage />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
