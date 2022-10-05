import { FC } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { FinancialResults } from "../types/dcaResults";
import { formatPercent, formatPrice } from "../util/formatter";

interface PropTypes {
  result?: FinancialResults;
}

const emptyDcaResult = {
  totalInvestmentValue: 0,
  finalInvestmentValue: 0,
  numberOfInvestments: 0,
  numberOfShares: 0,
  priceChange: 0,
  dividends: 0,
  return: {
    absolute: 0,
    relative: 0,
  },
  annualizedReturn: {
    absolute: 0,
    relative: 0,
  },
} as const;

interface TableRow {
  label: string;
  value: number;
  format: (x: number) => string;
  color: boolean;
}

const DcaResultTable: FC<PropTypes> = ({ result }) => {
  const data = result ?? emptyDcaResult;

  const resultTable: TableRow[] = [
    {
      label: "Total invested amount",
      value: data.totalInvestmentValue,
      format: formatPrice,
      color: false,
    },
    {
      label: "Final investment value",
      value: data.finalInvestmentValue,
      format: formatPrice,
      color: false,
    },
    {
      label: "Number of investments",
      value: data.numberOfInvestments,
      format: (x: number) => String(x),
      color: false,
    },
    {
      label: "Number of shares bought",
      value: data.numberOfShares,
      format: (x: number) => x.toFixed(4),
      color: false,
    },
    {
      label: "Price change",
      value: data.priceChange,
      format: formatPrice,
      color: true,
    },
    {
      label: "Dividends",
      value: data.dividends,
      format: formatPrice,
      color: true,
    },
    {
      label: "Investment return",
      value: data.return.absolute,
      format: formatPrice,
      color: true,
    },
    {
      label: "Relative investment return",
      value: data.return.relative,
      format: formatPercent,
      color: true,
    },
    {
      label: "Annualized return",
      value: data.annualizedReturn.absolute,
      format: formatPrice,
      color: true,
    },
    {
      label: "Relative annualized return",
      value: data.annualizedReturn.relative,
      format: formatPercent,
      color: true,
    },
  ];

  return (
    <Box mb={2} mt={2}>
      <Grid container direction="row" spacing={2} sx={{ maxWidth: 1000 }}>
        <Grid item xs={12} md={6}>
          <TablePart tableData={resultTable.slice(0, 5)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TablePart tableData={resultTable.slice(5, 10)} />
        </Grid>
      </Grid>
    </Box>
  );
};

const TablePart: FC<{ tableData: TableRow[] }> = ({ tableData }) => {
  return (
    <TableContainer
      component={(props) => (
        <Paper
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            padding: 1,
            maxWidth: 600,
          }}
          {...props}
        />
      )}
    >
      <Table size="small">
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ padding: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    letterSpacing: ".07272727em",
                    fontWeight: 500,
                    fontSize: ".6875rem",
                    color: "text.secondary",
                    textTransform: "uppercase",
                  }}
                >
                  {row.label}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  textAlign: "right",
                  color:
                    !row.color || row.value == 0
                      ? "text.primary"
                      : row.value < 0
                      ? "#EF5350"
                      : "#26A69A",
                }}
              >
                {row.format(row.value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DcaResultTable;
