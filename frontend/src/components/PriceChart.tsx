import { FC } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { MarketData } from "../types/marketData";

const chartOptions = {
  alignLabels: true,
  timeScale: {
    rightOffset: 0,
    // barSpacing: 30,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    borderColor: "#808080",
    visible: true,
    timeVisible: true,
    secondsVisible: false,
  },
};

interface PropTypes {
  data?: { data: MarketData[] }[];
  isFetching: boolean;
  isError: boolean;
}

const PriceChart: FC<PropTypes> = ({ data, isFetching, isError }) => {
  return (
    <Paper sx={{ padding: 3, position: "relative" }}>
      <Box sx={{ width: "100%" }}>
        <Chart
          options={chartOptions}
          candlestickSeries={data}
          autoWidth
          height={320}
        />
      </Box>

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
    </Paper>
  );
};

export default PriceChart;
