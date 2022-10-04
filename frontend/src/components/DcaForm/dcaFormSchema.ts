import * as yup from "yup";
import { IntervalFrequency } from "../../types/FormData";

const schema = yup.object().shape({
  ticker: yup.string().required("Ticker symbol is required."),
  amount: yup
    .number()
    .required("Investment value is required.")
    .typeError("Investment value must be a number.")
    .not([0], "Investment value can not be 0."),
  startDate: yup
    .date()
    .required("Start date is required.")
    .typeError("Invalid date value."),
  intervalCount: yup
    .number()
    .positive("Interval count value must be positive.")
    .integer("Interval count must value be an integer.")
    .required("Interval count is required.")
    .typeError("Interval count value must be a number."),
  intervalFrequency: yup
    .mixed<IntervalFrequency>()
    .required("Interval frequency is required."),
});

export default schema;
