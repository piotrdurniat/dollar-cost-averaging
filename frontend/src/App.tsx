import { FC, useMemo } from "react";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRecoilValue } from "recoil";
import NavBar from "./components/NavBar";
import HomePage from "./views/Home";
import { paletteModeState } from "./state/theme";

const queryClient = new QueryClient();

const App: FC = () => {
  const paletteMode = useRecoilValue(paletteModeState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: green[600],
          },
          mode: paletteMode,
        },
      }),
    [paletteMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Box
          p={3}
          sx={{
            height: "100vh",
            backgroundColor: paletteMode == "light" ? "#f5f5f5" : null,
          }}
        >
          <HomePage />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
