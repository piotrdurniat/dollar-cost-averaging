import { FC, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { MarketData } from "../types/marketData";
import { StockApi } from "../api/StockApi";

const chartOptions = {
  alignLabels: true,
  timeScale: {
    rightOffset: 0,
    barSpacing: 30,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    borderColor: "#808080",
    visible: true,
    timeVisible: true,
    secondsVisible: false,
  },
};

const HomePage: FC = () => {
  const [chartData, setChartData] = useState<{ data: MarketData[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState("msft");

  const getStockData = async () => {
    setLoading(true);
    const {
      data: { data },
    } = await StockApi.getPriceHistory(ticker);
    setChartData([{ data }]);
    setLoading(false);
  };

  useEffect(() => {
    getStockData();
  }, []);

  if (chartData.length == 0) return <CircularProgress />;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getStockData();
        }}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="ticker-input">Ticker symbol</InputLabel>
          <OutlinedInput
            id="ticker-input"
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={getStockData}
                  edge="end"
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
            label="Ticker symbol"
            sx={{ marginBottom: 2 }}
          />
        </FormControl>
      </form>

      <Paper sx={{ padding: 3, position: "relative" }}>
        <Box sx={{ width: "100%" }}>
          <Chart
            options={chartOptions}
            candlestickSeries={chartData}
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
          {loading && <CircularProgress />}
        </Box>
      </Paper>
    </>
  );
};

export default HomePage;
