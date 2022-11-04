import "react-i18next";
import pl from "./resources/pl";

declare module "react-i18next" {
  interface CustomTypeOptions {
    keySeparator: ".";
    resources: {
      pl: typeof pl;
      en: typeof pl;
    };
  }
}
