import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
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

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
    fontFamily: "Lato",
    fontWeight: 500,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <StyledText x={left + width / 2} y={top + height / 2}>
          {children}
        </StyledText>
      </>
    );
  }

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
          variant="h4"
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
              { id: 1, value: currBudget - totalExpen, label: "Left" },
            ],
            innerRadius: 100,
            cornerRadius: 10,
          },
        ]}
        width={425}
        height={425}
        colors={[theme.palette.primary.main, theme.palette.primary[3]]}
        sx={{
          "--ChartsLegend-itemWidth": "200px",
          "--ChartsLegend-itemMarkSize": "20px",
          "--ChartsLegend-labelSpacing": "5px",
          "--ChartsLegend-rootSpacing": "5px",
          "--ChartsLegend-rootOffsetX": "20px",
          "--ChartsLegend-rootOffsetY": "0px",
        }}
      >
        {/* <PieCenterLabel>Your Budget</PieCenterLabel> */}
      </PieChart>
    </Box>
  );
};

export default Chart;
