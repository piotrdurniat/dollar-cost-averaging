import { BorderRight } from "@mui/icons-material";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";

const intervals = [
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
] as const;

const intervalsMs = {
  DAILY: 1000 * 60 * 60 * 24,
  WEEKLY: 1000 * 60 * 60 * 24 * 7,
  MONTHLY: (1000 * 60 * 60 * 24 * 365) / 12,
  YEARLY: 1000 * 60 * 60 * 24 * 365,
};

type IntervalFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

const INITIAL_INTERVAL_COUNT = "1";
const INITIAL_INTERVAL_FREQUENCY = "MONTHLY";

export const getInitialIntervalMs = () => {
  return (
    intervalsMs[INITIAL_INTERVAL_FREQUENCY] * Number(INITIAL_INTERVAL_COUNT)
  );
};

interface PropTypes {
  setIntervalMs: (ms: number) => void;
}

const IntervalInput: FC<PropTypes> = ({ setIntervalMs }) => {
  const [intervalCount, setIntervalCount] = useState(INITIAL_INTERVAL_COUNT);
  const [intervalFrequency, setIntervalFrequency] = useState<IntervalFrequency>(
    INITIAL_INTERVAL_FREQUENCY
  );
  const [intervalIsPlural, setIntervalIsPlural] = useState(
    intervalCount !== "1"
  );

  const handleIntervalCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setIntervalIsPlural(newValue !== "1");
    setIntervalCount(newValue);
  };

  useEffect(() => {
    updateIntervalMs();
  }, [intervalCount, intervalFrequency]);

  const updateIntervalMs = () => {
    setIntervalMs(intervalsMs[intervalFrequency] * Number(intervalCount));
  };

  useEffect(() => {
    updateIntervalMs();
  }, []);

  return (
    <Stack direction="row">
      <TextField
        id="interval-value"
        label="Repeat investment every"
        type="text"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={intervalCount}
        onChange={handleIntervalCountChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        sx={{
          minWidth: 170,
          "& .MuiInputBase-root > fieldset": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            marginRight: "-1px",
            borderRightColor: "transparent",
          },
        }}
      />
      <Select
        value={intervalFrequency}
        onChange={(e) =>
          setIntervalFrequency(e.target.value as IntervalFrequency)
        }
        aria-label="Frequency"
        sx={{
          "& > fieldset": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
      >
        {intervals.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
            {intervalIsPlural && "s"}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default IntervalInput;
