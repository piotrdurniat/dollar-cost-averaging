import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import "dayjs/locale/en";
import "dayjs/locale/pl";
import { DcaFormData } from "../../types/DcaFormData";
import IntervalInput from "./IntervalInput";
import StockInput from "./StockInput";
import schema from "./dcaFormSchema";

interface PropTypes {
  formData: DcaFormData;
  setFormData: (data: DcaFormData) => void;
}

const DCAForm: FC<PropTypes> = ({ formData, setFormData }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(data => {
        setFormData(data);
      })}
    >
      <Grid container spacing={2} mb={2} sx={{ maxWidth: 2000 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.3}>
          <StockInput register={register} errors={errors} watch={watch} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.3}>
          <FormControl variant="outlined" fullWidth error={Boolean(errors.amount)}>
            <InputLabel htmlFor="amount">{t("singleInvestmentValue")}</InputLabel>
            <OutlinedInput
              id="amount"
              data-testid="amount"
              label={t("singleInvestmentValue")}
              {...register("amount")}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <FormHelperText id="amount-helper-text">
              {errors.amount ? errors.amount.message : " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.3}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label={t("startDate")}
                  value={value}
                  onChange={value => {
                    onChange(value);
                    trigger();
                  }}
                  renderInput={params => (
                    <TextField
                      id="start-date"
                      data-testid="start-date"
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

        <Grid item xs={12} sm={6} md={4} lg={2.3}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
            <Controller
              name="endDate"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label={t("endDate")}
                  value={value}
                  onChange={value => {
                    onChange(value);
                    trigger();
                  }}
                  renderInput={params => (
                    <TextField
                      id="end-date"
                      data-testid="end-date"
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

        <Grid item xs={12} sm={6} md={4} lg={2.8}>
          <IntervalInput register={register} errors={errors} control={control} watch={watch} />
        </Grid>
      </Grid>
      <Button
        id="calculate"
        data-testid="calculate"
        type="submit"
        variant="outlined"
        size="large"
        disabled={!isValid}
      >
        {t("calculate")}
      </Button>
    </Box>
  );
};

export default DCAForm;
