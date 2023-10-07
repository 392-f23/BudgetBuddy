import Chart from "./Chart";
import { Typography } from "@mui/material";

function ChartSection({ income, budget, expenses}) {
    return (
        <>
            <Chart budget={budget} expenses={expenses}/>
            <Typography>
                Your monthly income: ${income}
            </Typography>
        </>
    )
}

export default ChartSection;