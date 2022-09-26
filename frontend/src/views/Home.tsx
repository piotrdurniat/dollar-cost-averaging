import { FC, useState } from "react";
import { useQuery } from "react-query";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DcaForm";
import PriceChart from "../components/PriceChart";
import dayjs, { Dayjs } from "dayjs";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { getInitialIntervalMs } from "../components/IntervalInput";
import DcaResultTable from "../components/DcaResultTable";

const HomePage: FC = () => {
  const [ticker, setTicker] = useState("msft");
  const [amount, setAmount] = useState(100);
  const [startDate, setStartDate] = useState<Dayjs>(
    dayjs().subtract(1, "year")
  );
  const [intervalMs, setIntervalMs] = useState(getInitialIntervalMs());

  const dcaResult = useQuery("dcaResult", async () => {
    const startDateIso = startDate.toISOString();
    const endDateIso = dayjs().toISOString();
    const { data } = await StockApi.getDcaResults(
      ticker,
      amount,
      startDateIso,
      endDateIso,
      intervalMs
    );
    return data;
  });

  return (
    <Paper
      // variant="outlined"
      sx={{ margin: 2, padding: 2, height: "100%" }}
    >
      <Typography variant="h4" mb={3}>
        Dollar Cost Averaging Calculator
      </Typography>

      <Box mb={2}>
        <DCAForm
          ticker={ticker}
          setTicker={setTicker}
          amount={amount}
          setAmount={setAmount}
          onSubmit={dcaResult.refetch}
          startDate={startDate}
          setStartDate={setStartDate}
          setIntervalMs={setIntervalMs}
        />
      </Box>

      <Typography mt={2} variant="h6">
        Results:
      </Typography>
      <Divider />

      <DcaResultTable result={dcaResult.data?.financialResults} />

      <PriceChart
        data={dcaResult.data?.priceHistory ?? []}
        transactions={dcaResult.data?.transactions ?? []}
        isFetching={dcaResult.isFetching}
        isError={dcaResult.isError}
      />
    </Paper>
  );
};

export default HomePage;
