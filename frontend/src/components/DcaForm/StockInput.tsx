import { FC, Fragment, useEffect, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Autocomplete, Divider, ListItem, ListItemText, TextField } from "@mui/material";
import { StockApi } from "@api/StockApi";
import { DcaFormData } from "../../types/DcaFormData";
import { StockInfo } from "../../types/StockInfo";

interface PropTypes {
  register: UseFormRegister<DcaFormData>;
  errors: any;
  watch: UseFormWatch<DcaFormData>;
}

const StockInput: FC<PropTypes> = ({ register, errors, watch }) => {
  const watchTicker = watch("ticker");
  const [searchRes, setSearchRes] = useState<StockInfo[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await StockApi.searchStocks(watchTicker, 10);
      setSearchRes(res.data);
    })();
  }, [watchTicker]);

  return (
    <Autocomplete
      freeSolo
      id="ticker"
      data-testid="ticker"
      options={searchRes}
      getOptionLabel={(option: StockInfo | string) =>
        typeof option === "string" ? option : option.symbol
      }
      filterOptions={x => x}
      value="msft"
      renderInput={params => (
        <TextField
          {...register("ticker")}
          error={Boolean(errors.ticker)}
          helperText={errors.ticker ? errors.ticker.message : " "}
          {...params}
          name="ticker"
          variant="outlined"
          type="text"
          label={t("tickerSymbol")}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
      renderOption={(props, { name, symbol, exchange }) => (
        <Fragment key={symbol}>
          <ListItem {...props}>
            <ListItemText primary={name} secondary={`${symbol} : ${exchange}`} />
          </ListItem>
          <Divider />
        </Fragment>
      )}
    />
  );
};

export default StockInput;
