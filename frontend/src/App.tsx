import { FC } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import HomePage from "./views/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <NavBar />
      <Box p={3}>
        <HomePage />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
