import { FC, useState } from "react";
import { useQuery } from "react-query";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DcaForm";
import PriceChart from "../components/PriceChart";
import dayjs from "dayjs";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { getInitialIntervalMs } from "../components/IntervalInput";
import DcaResultTable from "../components/DcaResultTable";
import { FormData } from "../types/FormData";

const initialFormData = {
  ticker: "msft",
  amount: 100,
  startDate: dayjs().subtract(1, "year"),
} as const;

const HomePage: FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [intervalMs, setIntervalMs] = useState(getInitialIntervalMs());

  const dcaResult = useQuery(["dcaResult", formData], async () => {
    const startDateIso = formData.startDate.toISOString();
    const endDateIso = dayjs().toISOString();
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
        <DCAForm
          formData={formData}
          setFormData={setFormData}
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
