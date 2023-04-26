import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Box, Divider, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DcaForm";
import DcaResultTable from "../components/DcaResultTable";
import PriceChart from "../components/PriceChart";
import { INTERVAL_MS } from "../constants/intervalMs";
import { DcaFormData, IntervalFrequency } from "../types/DcaFormData";

const initialFormData = {
  ticker: "msft",
  amount: 100,
  startDate: dayjs().subtract(1, "year"),
  endDate: dayjs(),
  intervalCount: 1,
  intervalFrequency: "MONTHLY",
} as const;

const getIntervalMs = (intervalCount: number, intervalFrequency: IntervalFrequency) => {
  return INTERVAL_MS[intervalFrequency] * intervalCount;
};

const HomePage: FC = () => {
  const [formData, setFormData] = useState<DcaFormData>(initialFormData);
  const { t } = useTranslation();

  const dcaResult = useQuery(["dcaResult", formData], async () => {
    const startDateIso = formData.startDate.toISOString();
    const endDateIso = formData.endDate.toISOString();

    const intervalMs = getIntervalMs(formData.intervalCount, formData.intervalFrequency);

    const { data } = await StockApi.getDcaResults(
      formData.ticker,
      formData.amount,
      startDateIso,
      endDateIso,
      intervalMs,
    );
    return data;
  });

  return (
    <Paper
      // variant="outlined"
      role="main"
      sx={{ margin: 2, padding: 2, height: "100%" }}
    >
      <Typography variant="h4" mb={3}>
        {t("header")}
      </Typography>

      <Box mb={2}>
        <DCAForm formData={formData} setFormData={setFormData} />
      </Box>

      <Typography mt={2} variant="h6">
        {t("results")}
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
