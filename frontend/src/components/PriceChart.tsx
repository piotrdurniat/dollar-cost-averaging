import { FC } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { MarketData } from "../types/marketData";

interface PropTypes {
  data?: { data: MarketData[] }[];
  isFetching: boolean;
  isError: boolean;
}

const PriceChart: FC<PropTypes> = ({ data, isFetching, isError }) => {
  const theme = useTheme();

  const chartOptions = {
    alignLabels: true,
    timeScale: {
      rightOffset: 0,
      // barSpacing: 30,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
    layout: {
      backgroundColor: theme.palette.background.paper,
      textColor: theme.palette.text.primary,
      lineColor: theme.palette.text.disabled,
    },
    grid: {
      vertLines: {
        color: theme.palette.text.disabled,
      },
      horzLines: {
        color: theme.palette.text.disabled,
      },
    },
  };

  return (
    <Box mt={2} sx={{ width: "100%", position: "relative" }}>
      <Chart
        options={chartOptions}
        candlestickSeries={data}
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
  );
};

export default PriceChart;
