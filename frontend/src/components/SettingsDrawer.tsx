import { Close } from "@mui/icons-material";
import { Drawer, Typography, Box, IconButton, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";
import ThemeButtonGroup from "./ThemeButtonGroup";

interface PropTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SettingsDrawer: FC<PropTypes> = ({ open, setOpen }) => {
  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            width: 360,
            borderRadius: "10px 0px 0px 10px",
          },
        }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box>
          <Stack
            p={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Settings</Typography>
            <IconButton
              size="medium"
              color="primary"
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <Box p={2}>
            <Typography
              variant="body1"
              pb={2}
              color="text.secondary"
              fontSize="0.6875rem"
              textTransform="uppercase"
            >
              mode
            </Typography>
            <ThemeButtonGroup />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
