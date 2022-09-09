import { FC } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import HomePage from "./views/Home";

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box p={3}>
        <HomePage />
      </Box>
    </>
  );
};

export default App;
