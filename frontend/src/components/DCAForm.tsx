import { FC } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import IntervalInput from "./IntervalInput";

interface PropTypes {
  ticker: string;
  setTicker: (ticker: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  startDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
  onSubmit: () => void;
}

const DCAForm: FC<PropTypes> = ({
  ticker,
  setTicker,
  amount,
  setAmount,
  startDate,
  setStartDate,
  onSubmit,
}) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Grid container spacing={2} mb={2} sx={{ maxWidth: 1400 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="ticker-input">Ticker symbol</InputLabel>
            <OutlinedInput
              id="ticker-input"
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              label="Ticker symbol"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="amount-input">
              Single investment amount
            </InputLabel>
            <OutlinedInput
              id="amount-input"
              type="number"
              label="Single investment amount"
              value={amount}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => setAmount(Number(e.target.value))}
            ></OutlinedInput>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newDate) => {
                if (newDate !== null) {
                  setStartDate(newDate);
                }
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <IntervalInput />
        </Grid>
      </Grid>
      <Button type="submit" variant="outlined" size="large">
        Calculate
      </Button>
    </Box>
  );
};

export default DCAForm;
