import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, useTheme } from "@mui/material";

const Chart = ({ budget, expenses }) => {
  const [totalExpen, setTotalExpen] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const init = () => {
      let tempTotalExpen = 0;

      Object.entries(expenses).map((expense) => {
        const [_, breakdown] = expense;
        const { total } = breakdown;
        tempTotalExpen += total;
      });

      setTotalExpen(tempTotalExpen);
    };

    init();
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6">Total Budget: ${budget}</Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: totalExpen, label: "Spent" },
              { id: 1, value: budget - totalExpen, label: "What's Left" },
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
};

export default Chart;
