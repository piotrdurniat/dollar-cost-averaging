import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { MarketData, Transaction } from "../types/dcaResults";
import { formatFixedFractionDigits } from "../util/formatter";

interface PropTypes {
  data: MarketData[];
  isFetching: boolean;
  isError: boolean;
  transactions: Transaction[];
}

const PriceChart: FC<PropTypes> = ({ data, isFetching, isError, transactions }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const theme = useTheme();

  const locale = useMemo(() => {
    switch (language) {
      case "pl":
        return "pl-PL";
      case "en":
        return "en-US";
      default:
        return "en-US";
    }
  }, [language]);

  const chartOptions = useMemo(
    () => ({
      localization: {
        locale,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      alignLabels: true,
      timeScale: {
        rightOffset: 0,
        // barSpacing: 30,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
      },
      layout: {
        backgroundColor: "transparent",
        textColor: theme.palette.text.primary,
        lineColor: theme.palette.divider,
      },
      grid: {
        vertLines: {
          color: theme.palette.divider,
        },
        horzLines: {
          color: theme.palette.divider,
        },
      },
    }),
    [locale, theme],
  );

  const markers = transactions.map(({ time, numberOfShares }) => ({
    time,
    position: "belowBar",
    color: "#2196F3",
    shape: "arrowUp",
    text: `${t("buy")} ${formatFixedFractionDigits(numberOfShares, 2)}`,
  }));

  return (
    <Paper variant="outlined" sx={{ backgroundColor: "transparent", marginTop: 2, padding: 1 }}>
      <Box sx={{ width: "100%", position: "relative" }} id="results-chart">
        <Chart
          options={chartOptions}
          candlestickSeries={[{ data, markers }]}
          autoWidth
          height={320}
        />

        <Box
          sx={{
            position: "absolute",
            display: "flex",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {isFetching ? (
            <CircularProgress />
          ) : isError ? (
            <Typography variant="body1">Eror fetching stock data.</Typography>
          ) : (
            data.length === 0 && <Typography variant="body1">No data.</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PriceChart;
