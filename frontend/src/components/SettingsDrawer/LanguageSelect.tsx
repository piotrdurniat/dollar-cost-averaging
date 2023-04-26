import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { supportedLanguages } from "../../constants/languages";

const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup data-testid="language-button-group" value={i18n.language}>
      {supportedLanguages.map((language, index) => (
        <ToggleButton
          value={language}
          key={index}
          sx={{ borderRadius: 2 }}
          onClick={() => i18n.changeLanguage(language)}
        >
          <Typography variant="body2" pr={0.5}>
            {t(language)}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LanguageSelect;
