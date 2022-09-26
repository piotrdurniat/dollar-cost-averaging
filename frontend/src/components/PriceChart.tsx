import { FC } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { MarketData } from "../types/dcaResults";

interface PropTypes {
  data: MarketData[];
  isFetching: boolean;
  isError: boolean;
}

const PriceChart: FC<PropTypes> = ({ data, isFetching, isError }) => {
  const theme = useTheme();

  const chartOptions = {
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
  };

  return (
    <Paper
      variant="outlined"
      sx={{ backgroundColor: "transparent", marginTop: 2, padding: 1 }}
    >
      <Box sx={{ width: "100%", position: "relative" }}>
        <Chart
          options={chartOptions}
          candlestickSeries={[{ data }]}
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
          {isFetching && <CircularProgress />}
          {isError && (
            <Typography variant="body1">Eror fetching stock data.</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PriceChart;
