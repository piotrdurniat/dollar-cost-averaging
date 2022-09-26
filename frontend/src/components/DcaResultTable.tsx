import { FC } from "react";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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

const DcaResultTable: FC<PropTypes> = ({ result }) => {
  const data = result ?? emptyDcaResult;

  const resultTable = [
    ["Total invested amount:", formatPrice(data.totalInvestmentValue)],
    ["Final investment value:", formatPrice(data.finalInvestmentValue)],
    ["Number of investments:", `${data.numberOfInvestments}`],
    ["Number of shares bought:", `${data.numberOfShares.toFixed(4)}`],
    ["Price change:", formatPrice(data.priceChange)],
    ["Dividends", formatPrice(data.dividends)],
    ["Investment return:", formatPrice(data.return.absolute)],
    ["Relative return:", formatPercent(data.return.relative)],
    ["Annualized return:", formatPrice(data.annualizedReturn.absolute)],
    [
      "Annualized relative return:",
      formatPercent(data.annualizedReturn.relative),
    ],
  ];

  return (
    <Box mb={2} mt={2}>
      <Stack direction="row" spacing={2}>
        <TablePart tableData={resultTable.slice(0, 5)} />
        <TablePart tableData={resultTable.slice(5, 10)} />
      </Stack>
    </Box>
  );
};

const TablePart: FC<{ tableData: string[][] }> = ({ tableData }) => {
  return (
    <TableContainer
      component={(props) => (
        <Paper
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            padding: 1,
            maxWidth: 400,
          }}
          {...props}
        />
      )}
    >
      <Table size="small">
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DcaResultTable;
