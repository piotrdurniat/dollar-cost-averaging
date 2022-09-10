import { FC, useState } from "react";
import { useQuery } from "react-query";
import { StockApi } from "../api/StockApi";
import DCAForm from "../components/DCAForm";
import StockChart from "../components/StockChart";

const HomePage: FC = () => {
  const [ticker, setTicker] = useState("msft");
  const [amount, setAmount] = useState(100);

  const { isFetching, isError, data, refetch } = useQuery(
    "stockData",
    async () => {
      const { data } = await StockApi.getPriceHistory(ticker);
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
      />

      <StockChart data={data} isFetching={isFetching} isError={isError} />
    </>
  );
};

export default HomePage;
