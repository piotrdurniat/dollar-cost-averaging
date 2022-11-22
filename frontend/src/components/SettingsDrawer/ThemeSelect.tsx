import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { ToggleButtonGroup, Typography, ToggleButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { themeState } from "../../state/theme";

const ThemeButtonGroup = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup
      exclusive
      aria-label="Theme"
      value={theme}
      onChange={(_, newTheme) => {
        if (newTheme !== null) {
          setTheme(newTheme);
        }
      }}
    >
      <ToggleButton value="light">
        <LightMode sx={{ marginRight: 1 }} />
        <Typography variant="body2">{t("light")}</Typography>
      </ToggleButton>

      <ToggleButton value="system">
        <SettingsBrightness sx={{ marginRight: 1 }} />
        <Typography variant="body2">{t("system")}</Typography>
      </ToggleButton>

      <ToggleButton value="dark">
        <DarkMode sx={{ marginRight: 1 }} />
        <Typography variant="body2">{t("dark")}</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeButtonGroup;
