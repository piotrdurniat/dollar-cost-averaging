import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Close } from "@mui/icons-material";
import { Drawer, Typography, Box, IconButton, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import LanguageSelect from "./LanguageSelect";
import ThemeButtonGroup from "./ThemeSelect";

interface PropTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SettingsDrawer: FC<PropTypes> = ({ open, setOpen }) => {
  const { t } = useTranslation();

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            minWidth: 360,
            borderRadius: "10px 0px 0px 10px",
          },
        }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box>
          <Stack p={2} direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">{t("settings")}</Typography>
            <IconButton
              size="medium"
              id="close-settings"
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
              {t("colorTheme")}
            </Typography>
            <ThemeButtonGroup />
            <Typography
              variant="body1"
              pb={2}
              pt={2}
              color="text.secondary"
              fontSize="0.6875rem"
              textTransform="uppercase"
            >
              {t("language")}
            </Typography>

            <LanguageSelect />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
