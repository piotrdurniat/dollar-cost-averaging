import { FC, useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import SettingsDrawer from "./SettingsDrawer";

const NavBar: FC = () => {
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            DCA App
          </Typography>
          <IconButton
            size="large"
            aria-label="settings drawer"
            onClick={() => setSettingsDrawerOpen(true)}
            color="inherit"
          >
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SettingsDrawer
        open={settingsDrawerOpen}
        setOpen={setSettingsDrawerOpen}
      />
    </Box>
  );
};

export default NavBar;
