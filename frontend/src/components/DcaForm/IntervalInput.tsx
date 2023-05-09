import { FC } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { DcaFormData } from "@typeDefs/DcaFormData";

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

interface Props {
  register: UseFormRegister<DcaFormData>;
  errors: FieldErrors<DcaFormData>;
  control: Control<DcaFormData, any>;
  watch: UseFormWatch<DcaFormData>;
}

const IntervalInput: FC<Props> = ({ register, errors, control, watch }) => {
  const intervalCount = watch("intervalCount");
  const { t } = useTranslation();

  return (
    <Stack direction="row" alignItems="flex-start">
      <TextField
        id="interval-count"
        data-testid="interval-count"
        {...register("intervalCount")}
        error={Boolean(errors.intervalCount)}
        helperText={errors.intervalCount ? errors.intervalCount.message : " "}
        label={t("repeatInvestmentEvery")}
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
        render={({ field: { onChange, value } }) => (
          <Select
            id="interval-frequency"
            data-testid="interval-frequency"
            value={value}
            onChange={value => onChange(value)}
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
                {t(label, { count: Number(intervalCount) })}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Stack>
  );
};

export default IntervalInput;
