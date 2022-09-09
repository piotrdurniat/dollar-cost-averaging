import { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Chart from "@qognicafinance/react-lightweight-charts";
import Api from "../api/Api";
import { MarketDataTable } from "../types/marketData";

const HomePage: FC = () => {
  const chartOptions = {
    alignLabels: true,
    timeScale: {
      rightOffset: 12,
      barSpacing: 30,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: "#fff000",
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
  };
  const [chartData, setChartData] = useState<MarketDataTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/");
      setChartData([data]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Typography variant="body1">Loading...</Typography>;

  return (
    <>
      <Typography variant="h3">Home</Typography>
      <Box sx={{ width: "100%" }}>
        <Chart
          options={chartOptions}
          candlestickSeries={chartData}
          autoWidth
          height={320}
        />
      </Box>
    </>
  );
};

export default HomePage;
