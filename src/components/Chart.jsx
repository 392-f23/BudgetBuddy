import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import styles from "./Chart.module.css"; 
import { Typography } from '@mui/material';
const Chart = ({ budget, expenses }) => {
    let totalExpen = 0;
    for (var key in expenses){
        totalExpen += expenses[key];
    }
    
    return (
        <Box sx = {{textAlign: 'center'}} className = {styles["chartWrapper"]}>
            <Typography className = {styles["budget"]} variant="h6" component="h3" >Total Budget: ${budget}</Typography> 
            <PieChart series = {[
                {
                    data: [
                        {id: 0, value: totalExpen, label: "Spent"},
                        {id: 1, value: budget - totalExpen, label: "What's Left"}
                    ],
                    innerRadius: 100,
                    cornerRadius: 10
                }
            ]}
            width = {425} 
            height = {425}
            colors = {["red", "green"]}
            />
        </Box>
    ); 
}

export default Chart; 