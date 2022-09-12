import { FC, useState } from "react";
import { useQuery } from "react-query";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DCAForm";
import PriceChart from "../components/PriceChart";
import dayjs, { Dayjs } from "dayjs";

const HomePage: FC = () => {
  const [ticker, setTicker] = useState("msft");
  const [amount, setAmount] = useState(100);
  const [startDate, setStartDate] = useState<Dayjs>(
    dayjs().subtract(1, "year")
  );

  const { isFetching, isError, data, refetch } = useQuery(
    "stockData",
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

  return (
    <>
      <DCAForm
        ticker={ticker}
        setTicker={setTicker}
        amount={amount}
        setAmount={setAmount}
        refetch={refetch}
        startDate={startDate}
        setStartDate={setStartDate}
      />

      <PriceChart data={data} isFetching={isFetching} isError={isError} />
    </>
  );
};

export default HomePage;
