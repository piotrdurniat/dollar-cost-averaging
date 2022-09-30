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
  FormHelperText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntervalInput from "./IntervalInput";
import schema from "./dcaFormSchema";
import { FormData } from "../types/FormData";

interface PropTypes {
  formData: FormData;
  setFormData: (data: FormData) => void;
  setIntervalMs: (ms: number) => void;
}

const DCAForm: FC<PropTypes> = ({ formData, setFormData, setIntervalMs }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        setFormData(data);
      })}
    >
      <Grid container spacing={2} mb={2} sx={{ maxWidth: 1400 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            fullWidth
            variant="outlined"
            id="ticker"
            type="text"
            label="Ticker symbol"
            {...register("ticker")}
            error={Boolean(errors.ticker)}
            helperText={errors.ticker ? errors.ticker.message : " "}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="amount">Single investment value</InputLabel>
            <OutlinedInput
              id="amount"
              type="number"
              label="Single investment value"
              {...register("amount")}
              error={Boolean(errors.amount)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <FormHelperText>
              {errors.amount ? errors.amount.message : " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="startDate"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePicker
                  label="Start date"
                  value={value}
                  onChange={(value) => onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      id="startDate"
                      helperText={error ? error.message : " "}
                      fullWidth
                      {...params}
                      error={Boolean(error)}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <IntervalInput setIntervalMs={setIntervalMs} />
        </Grid>
      </Grid>
      <Button type="submit" variant="outlined" size="large" disabled={!isValid}>
        Calculate
      </Button>
    </Box>
  );
};

export default DCAForm;
