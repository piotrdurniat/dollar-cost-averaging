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
import { DcaResult } from "../types/dcaStrategy";

interface PropTypes {
  result: DcaResult;
}

const DcaResultTable: FC<PropTypes> = ({ result }) => {
  const resultTable = [
    ["Total invested amount:", `\$ ${result.totalInvestmentValue.toFixed(2)}`],
    ["Final investment value:", `\$ ${result.finalInvestmentValue.toFixed(2)}`],
    ["Number of investments:", `${result.numberOfInvestments}`],
    ["Number of shares bought:", `${result.numberOfShares.toFixed(4)}`],
    ["Price change:", `\$ ${result.priceChange.toFixed(2)}`],
    ["Dividends", `\$ ${result.dividends.toFixed(2)}`],

    ["Investment return:", `\$ ${result.return.absolute.toFixed(2)}`],
    ["Relative return:", `${(result.return.relative * 100).toFixed(2)}%`],
    ["Annualized return:", `\$ ${result.annualizedReturn.absolute.toFixed(2)}`],
    [
      "Annualized relative return:",
      `${(result.annualizedReturn.relative * 100).toFixed(2)}%`,
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
