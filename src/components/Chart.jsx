import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";

const Chart = ({ budget, expenses }) => {
  const [totalExpen, setTotalExpen] = useState(0);
  const [currBudget, setCurrBudget] = useState(budget);
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          varianat="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          Total Budget:
        </Typography>
        <TextField
          defaultValue={currBudget}
          onChange={(event) => setCurrBudget(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ pr: 3 }}
        ></TextField>
      </Box>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: totalExpen, label: "Spent" },
              { id: 1, value: currBudget - totalExpen, label: "What's Left" },
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
