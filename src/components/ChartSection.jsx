import Chart from "./Chart";
import { Box, Typography } from "@mui/material";

function ChartSection({ income, budget, expenses }) {
  return (
    <Box sx={{ padding: "16px" }}>
      <Chart budget={budget} expenses={expenses} />
      <Typography varianat="h3">Your monthly income: ${income}</Typography>
    </Box>
  );
}

export default ChartSection;
