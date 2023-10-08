import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, useTheme } from "@mui/material";

function Chart({ budget, expenses }) {
  var totalExpen = 0;
  for (var key in expenses) {
    totalExpen += expenses[key].total;
  }

  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6">
        Total Budget: ${budget}
      </Typography>
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: totalExpen,
                label: "Spent",
              },
              {
                id: 1,
                value: budget - totalExpen,
                label: "What's Left",
              },
            ],
            innerRadius: 100,
            cornerRadius: 10,
          },
        ]}
        width={425}
        height={425}
        colors={[theme.palette.primary.main, theme.palette.primary[3]]}
      />
    </Box>
  );
}

export default Chart;
