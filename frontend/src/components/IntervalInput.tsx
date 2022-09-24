import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";

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

const IntervalInput: FC = () => {
  const [intervalCount, setIntervalCount] = useState("1");
  const [intervalFrequency, setIntervalFrequency] =
    useState<IntervalFrequency>("MONTHLY");
  const [intervalIsPlural, setIntervalIsPlural] = useState(false);

  const handleIntervalCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setIntervalIsPlural(newValue !== "1");
    setIntervalCount(newValue);
  };

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
  );
};

export default IntervalInput;
