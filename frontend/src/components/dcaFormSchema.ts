import * as yup from "yup";

const schema = yup.object().shape({
  ticker: yup.string().required("Ticker symbol is required."),
  amount: yup
    .number()
    .required("Investment value is required.")
    .typeError("Value must be a number."),
  startDate: yup
    .date()
    .required("Start date is required.")
    .typeError("Invalid date value."),
});

export default schema;
