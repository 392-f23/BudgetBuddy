import MenuContainer from "../components/MenuContainer";
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from "@mui/material";
import { readData, altReadData } from "../utility/query";
import { dummyData } from "../assets/dummy_data";
import { useState, useEffect } from "react";

const InsightsPage = () => {
  const { Income, Budget, Expenses } = dummyData;
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);
  // turns number into comma-separated dollar amount
  const income = Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const budget = Budget.Monthly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // useEffect(() => {
  //   const init = () => {
  //     let tempTotalExpen = 0;

  //     Object.entries(expensesState).map((expense) => {
  //       const [_, breakdown] = expense;
  //       const { total } = breakdown;

  //       tempTotalExpen += total;
  //     });

  //     setTotalExpenses(tempTotalExpen);
  //   };

  //   const read = async () => {
  //     await readData("users");
  //   };

  //   init();
  // }, [expensesState]);
  // console.log(totalExpenses)
  let date = new Date();
  let month = date.getMonth() + 1;
  let numberDays = new Date(2023, month, 0).getDate()
  //avg amount spent allowed per day
  let dailyBudget = Budget.Monthly / numberDays
  const spendingPerDay = 0; // todo: calculate new Date().getDate()
  const onTrackSpendingPerDay = Budget.Monthly / numberDays; // todo: calculate
  
  return (
    <MenuContainer>
      <Typography variant="h1" sx={{ pt: 4 }}>
        Spending Insights
      </Typography>
      <BarChart series = {[{ data: [4, 3, 5], label: "Rent" }, { data: [1, 6, 3], label: "Food" }, { data: [2, 5, 6], label: "Transport"}]} 
                xAxis={[{ scaleType: 'band', data: ['date1', 'date2', 'date3'] }]}/>
      <Typography variant="h2" sx={{ pb: 2 }}>
        Spending Recommendations
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: "2.5", pb: 4 }}>
        Based off of your monthly income of ${income} and your budget of ${budget}, we recommend 
        spending about ${spendingPerDay} per day.
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: "2.5", pb: 4 }}>
        Based off of your current spending, you can only spend about ${onTrackSpendingPerDay} per 
        day to stay on track.
      </Typography>
      
    </MenuContainer>
  );
};

export default InsightsPage;
