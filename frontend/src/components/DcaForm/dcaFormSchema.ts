import * as yup from "yup";
import { IntervalFrequency, DcaFormData } from "@typeDefs/DcaFormData";

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

const schema = yup.object<Shape<DcaFormData>>().shape({
  ticker: yup.string().required("Ticker symbol is required."),
  amount: yup
    .number()
    .required("Investment value is required.")
    .typeError("Investment value must be a number.")
    .positive("Investment value must be greater than 0."),
  startDate: yup.date().required("Start date is required.").typeError("Invalid date value."),
  endDate: yup
    .date()
    .required("End date is required.")
    .typeError("Invalid date value.")
    // Check if end date is after start date only if start date is valid
    .when("startDate", {
      is: (startDate: Date) => !isNaN(startDate.getTime()),
      then: yup
        .date()
        .required("End date is required.")
        .typeError("Invalid date value.")
        .min(yup.ref("startDate"), "End date must be after start date."),
    }),
  intervalCount: yup
    .number()
    .positive("Interval count value must be greater than 0.")
    .integer("Interval count value must be an integer.")
    .required("Interval count is required.")
    .typeError("Interval count value must be a number."),
  intervalFrequency: yup.mixed<IntervalFrequency>().required("Interval frequency is required."),
});

export default schema;
