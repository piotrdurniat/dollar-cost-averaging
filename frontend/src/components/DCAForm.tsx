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
  refetch,
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
    <Box sx={{ marginBottom: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" mb={2}>
          Dollar Cost Averaging Calculator
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControl variant="outlined">
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

            <Grid item>
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
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  value={startDate}
                  onChange={(newDate) => {
                    if (newDate !== null) {
                      setStartDate(newDate);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item>
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
              />
              <Select
                value={intervalFrequency}
                onChange={(e) =>
                  setIntervalFrequency(e.target.value as IntervalFrequency)
                }
                aria-label="Frequency"
              >
                {intervals.map(({ key, label }) => (
                  <MenuItem value={key}>
                    {label}
                    {intervalIsPlural && "s"}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Button type="submit" variant="outlined" size="large">
                Calculate
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default DCAForm;
