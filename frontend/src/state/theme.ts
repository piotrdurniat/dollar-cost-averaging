import { PaletteMode } from "@mui/material";
import { atom, selector } from "recoil";
import { localStorageEffect, mediaQueryEffect } from "./effects";

export const prefersDarkModeState = atom<boolean>({
  key: "prefersDarkMode",
  default: false,
  effects: [mediaQueryEffect("(prefers-color-scheme: dark)")],
});

type Theme = "light" | "system" | "dark";

export const themeState = atom<Theme>({
  key: "theme",
  default: "system",
  effects: [localStorageEffect<Theme>("themeMode")],
});

export const paletteModeState = selector<PaletteMode>({
  key: "paletteMode",
  get: ({ get }) => {
    const darkModeSystem = get(prefersDarkModeState);
    const selectedTheme = get(themeState);
    if (selectedTheme === "system") {
      return darkModeSystem ? "dark" : "light";
    }
    return selectedTheme;
  },
});
