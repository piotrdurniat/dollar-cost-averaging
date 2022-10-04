import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { FC, useMemo } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { FormData } from "../../types/FormData";

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

interface PropTypes {
  register: UseFormRegister<FormData>;
  errors: any;
  control: Control<FormData, any>;
  watch: UseFormWatch<FormData>;
}

const IntervalInput: FC<PropTypes> = ({ register, errors, control, watch }) => {
  const watchIntervalValue = watch("intervalCount");

  const intervalIsPlural = useMemo(
    () => watchIntervalValue > 1,
    [watchIntervalValue]
  );

  return (
    <Stack direction="row" alignItems="flex-start">
      <TextField
        id="interval-count"
        {...register("intervalCount")}
        error={Boolean(errors.intervalCount)}
        helperText={errors.intervalCount ? errors.intervalCount.message : " "}
        label="Repeat investment every"
        type="text"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
      <Controller
        name="intervalFrequency"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            value={value}
            onChange={(value) => onChange(value)}
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
        )}
      />
    </Stack>
  );
};

export default IntervalInput;
