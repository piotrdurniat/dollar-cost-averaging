import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Box, Divider, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DcaForm";
import PriceChart from "../components/PriceChart";
import DcaResultTable from "../components/DcaResultTable";
import { FormData, IntervalFrequency } from "../types/FormData";
import { INTERVAL_MS } from "../constants/intervalMs";

const initialFormData = {
  ticker: "msft",
  amount: 100,
  startDate: dayjs().subtract(1, "year"),
  intervalCount: 1,
  intervalFrequency: "MONTHLY",
} as const;

const getIntervalMs = (
  intervalCount: number,
  intervalFrequency: IntervalFrequency
) => {
  return INTERVAL_MS[intervalFrequency] * intervalCount;
};

const HomePage: FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const dcaResult = useQuery(["dcaResult", formData], async () => {
    const startDateIso = formData.startDate.toISOString();
    const endDateIso = dayjs().toISOString();

    const intervalMs = getIntervalMs(
      formData.intervalCount,
      formData.intervalFrequency
    );

    const { data } = await StockApi.getDcaResults(
      formData.ticker,
      formData.amount,
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
        <DCAForm formData={formData} setFormData={setFormData} />
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
