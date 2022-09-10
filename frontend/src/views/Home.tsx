import { FC, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Chart from "@qognicafinance/react-lightweight-charts";
import { useQuery } from "react-query";
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
  const [ticker, setTicker] = useState("msft");

  const { isFetching, isError, data, refetch } = useQuery(
    "stockData",
    async () => {
      const {
        data: { data },
      } = await StockApi.getPriceHistory(ticker);
      return [{ data }];
    },
    { placeholderData: [{ data: [] }] }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <FormControl sx={{ m: 1 }} variant="outlined">
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
                  onClick={() => refetch()}
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
    </>
  );
};

export default HomePage;
