import { FC, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface PropTypes {
  ticker: string;
  setTicker: (ticker: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  refetch: () => void;
  startDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
}

const DCAForm: FC<PropTypes> = ({
  ticker,
  setTicker,
  amount,
  setAmount,
  startDate,
  setStartDate,
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newDate) => {
                if (newDate !== null) {
                  setStartDate(newDate);
                }
              }}
              renderInput={(params) => <TextField sx={{ ml: 2 }} {...params} />}
            />
          </LocalizationProvider>
        </form>
      </Paper>
    </Box>
  );
};

export default DCAForm;
