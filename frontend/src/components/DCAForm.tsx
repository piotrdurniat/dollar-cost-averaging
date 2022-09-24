import { FC, useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Stack } from "@mui/system";

interface PropTypes {
  ticker: string;
  setTicker: (ticker: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  startDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
  onSubmit: () => void;
}

const intervals: { key: IntervalFrequency; label: string }[] = [
  {
    key: "DAILY",
    label: "day",
  },
  {
    key: "WEEKLY",
    label: "week",
  },
  {
    key: "MONTHLY",
    label: "month",
  },
  {
    key: "YEARLY",
    label: "year",
  },
];

type IntervalFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

const DCAForm: FC<PropTypes> = ({
  ticker,
  setTicker,
  amount,
  setAmount,
  startDate,
  setStartDate,
  onSubmit,
}) => {
  const [intervalValue, setIntervalValue] = useState("1");
  const [intervalFrequency, setIntervalFrequency] =
    useState<IntervalFrequency>("MONTHLY");
  const [intervalIsPlural, setIntervalIsPlural] = useState(false);

  const handleIntervalValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setIntervalIsPlural(newValue !== "1");
    setIntervalValue(newValue);
  };

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
          <Stack direction="row">
            <TextField
              id="interval-value"
              label="Repeat investment every"
              type="text"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={intervalValue}
              onChange={handleIntervalValueChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{ minWidth: 170 }}
            />
            <Select
              value={intervalFrequency}
              onChange={(e) =>
                setIntervalFrequency(e.target.value as IntervalFrequency)
              }
              aria-label="Frequency"
            >
              {intervals.map(({ key, label }) => (
                <MenuItem key={key} value={key}>
                  {label}
                  {intervalIsPlural && "s"}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>
      </Grid>
      <Button type="submit" variant="outlined" size="large">
        Calculate
      </Button>
    </Box>
  );
};

export default DCAForm;
