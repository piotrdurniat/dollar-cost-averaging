import { FC } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface PropTypes {
  ticker: string;
  setTicker: (ticker: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  refetch: () => void;
}

const DCAForm: FC<PropTypes> = ({
  ticker,
  setTicker,
  amount,
  setAmount,
  refetch,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" mb={2}>
          Dollar Cost Averaging Calculator
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          <FormControl variant="outlined" sx={{ marginRight: 2 }}>
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
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="amount-input">Amount</InputLabel>
            <OutlinedInput
              id="amount-input"
              type="number"
              label="amount"
              value={amount}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => setAmount(Number(e.target.value))}
            ></OutlinedInput>
          </FormControl>
        </form>
      </Paper>
    </Box>
  );
};

export default DCAForm;
