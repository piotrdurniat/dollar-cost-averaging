import { FC, useState } from "react";
import { useQuery } from "react-query";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DCAForm";
import PriceChart from "../components/PriceChart";
import dayjs, { Dayjs } from "dayjs";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { getInitialIntervalMs } from "../components/IntervalInput";

const HomePage: FC = () => {
  const [ticker, setTicker] = useState("msft");
  const [amount, setAmount] = useState(100);
  const [startDate, setStartDate] = useState<Dayjs>(
    dayjs().subtract(1, "year")
  );
  const [intervalMs, setIntervalMs] = useState(getInitialIntervalMs());

  const chartData = useQuery(
    "chartData",
    async () => {
      const startDateIso = startDate.toISOString();
      const endDateIso = dayjs().toISOString();
      const { data } = await StockApi.getPriceHistory(
        ticker,
        startDateIso,
        endDateIso
      );
      return [{ data }];
    },
    { placeholderData: [{ data: [] }] }
  );

  const dcaResult = useQuery("dcaResult", async () => {
    const startDateIso = startDate.toISOString();
    const endDateIso = dayjs().toISOString();
    const { data } = await StockApi.getDcaResult(
      ticker,
      amount,
      startDateIso,
      endDateIso,
      intervalMs
    );
    console.log(data);
    return data;
  });

  return (
    <>
      <Paper sx={{ height: "100%" }}>
        <Box p={2}>
          <Typography variant="h4" mb={3}>
            Dollar Cost Averaging Calculator
          </Typography>

          <Box mb={2}>
            <DCAForm
              ticker={ticker}
              setTicker={setTicker}
              amount={amount}
              setAmount={setAmount}
              onSubmit={chartData.refetch}
              startDate={startDate}
              setStartDate={setStartDate}
              setIntervalMs={setIntervalMs}
            />
          </Box>

          <Divider />

          {dcaResult.data && (
            <Box mb={2} mt={2}>
              <Typography variant="body1">
                Sum of payments: ${dcaResult.data.totalInvestmentValue}
                <br />
                Final investment value: ${dcaResult.data.finalInvestmentValue}
                <br />
                Investment return: ${dcaResult.data.return.absolute}
                <br />
                Relative return: {dcaResult.data.return.relative * 100}%
                <br />
                Annualized return: ${dcaResult.data.annualizedReturn.absolute}
                <br />
                Annualized relative return:{" "}
                {dcaResult.data.annualizedReturn.relative * 100}%
              </Typography>
            </Box>
          )}

          <Divider />

          <PriceChart
            data={chartData.data}
            isFetching={chartData.isFetching}
            isError={chartData.isError}
          />
        </Box>
      </Paper>
    </>
  );
};

export default HomePage;
