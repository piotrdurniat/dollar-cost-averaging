import { FC, Fragment } from "react";
import { UseFormRegister } from "react-hook-form";
import {
  Autocomplete,
  createFilterOptions,
  Divider,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { FormData } from "../../types/FormData";
import { StockInfo } from "../../types/StockInfo";
import stockInfoJson from "../../stock_info/nasdaq.json";

const stockInfo = stockInfoJson as StockInfo[];

interface PropTypes {
  register: UseFormRegister<FormData>;
  errors: any;
}

const filterOptions = createFilterOptions({
  matchFrom: "any",
  ignoreAccents: true,
  ignoreCase: true,
  limit: 20,
  stringify: (option: StockInfo) => `${option.symbol} ${option.name}`,
});

const StockInput: FC<PropTypes> = ({ register, errors }) => {
  return (
    <Autocomplete
      freeSolo
      id="ticker"
      options={stockInfo}
      getOptionLabel={(option: StockInfo | string) =>
        typeof option === "string" ? option : option.symbol
      }
      filterOptions={filterOptions}
      value="msft"
      renderInput={(params) => (
        <TextField
          {...register("ticker")}
          error={Boolean(errors.ticker)}
          helperText={errors.ticker ? errors.ticker.message : " "}
          {...params}
          name="ticker"
          variant="outlined"
          type="text"
          label="Ticker symbol"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
      renderOption={(props, { name, symbol, exchange }) => (
        <Fragment key={symbol}>
          <ListItem {...props}>
            <ListItemText
              primary={name}
              secondary={`${symbol} : ${exchange}`}
            />
          </ListItem>
          <Divider />
        </Fragment>
      )}
    />
  );
};

export default StockInput;
