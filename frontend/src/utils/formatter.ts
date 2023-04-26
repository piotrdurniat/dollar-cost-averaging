import i18next from "i18next";

const getLocale = (language: string): string => {
  switch (language) {
    case "pl":
      return "pl-PL";
    case "en":
      return "en-US";
    default:
      return "en-US";
  }
};

export const formatPrice = (value: number) => {
  const locale = getLocale(i18next.language);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatPercent = (value: number) => {
  const locale = getLocale(i18next.language);
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatFixedFractionDigits = (value: number, digits: number) => {
  const locale = getLocale(i18next.language);
  return new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 1,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
};
