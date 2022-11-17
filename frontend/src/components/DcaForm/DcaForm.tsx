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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntervalInput from "./IntervalInput";
import schema from "./dcaFormSchema";
import { FormData } from "../../types/FormData";
import StockInput from "./StockInput";
import { useTranslation } from "react-i18next";

interface PropTypes {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const DCAForm: FC<PropTypes> = ({ formData, setFormData }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const { t } = useTranslation();

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
          <StockInput register={register} errors={errors} watch={watch} />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <FormControl
            variant="outlined"
            fullWidth
            error={Boolean(errors.amount)}
          >
            <InputLabel htmlFor="amount">
              {t("singleInvestmentValue")}
            </InputLabel>
            <OutlinedInput
              id="amount"
              label={t("singleInvestmentValue")}
              {...register("amount")}
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
                  label={t("startDate")}
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
          <IntervalInput
            register={register}
            errors={errors}
            control={control}
            watch={watch}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="outlined" size="large" disabled={!isValid}>
        {t("calculate")}
      </Button>
    </Box>
  );
};

export default DCAForm;
