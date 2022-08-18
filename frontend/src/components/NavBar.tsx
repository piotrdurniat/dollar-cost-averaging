import { FC } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const NavBar: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            DCA App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
