import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { ToggleButtonGroup, Typography, ToggleButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { themeState } from "../state/theme";

const ThemeButtonGroup = () => {
  const [theme, setTheme] = useRecoilState(themeState);
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
        Light
      </ToggleButton>

      <ToggleButton value="system">
        <SettingsBrightness sx={{ marginRight: 1 }} />
        System
      </ToggleButton>

      <ToggleButton value="dark">
        <DarkMode sx={{ marginRight: 1 }} />
        Dark
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeButtonGroup;