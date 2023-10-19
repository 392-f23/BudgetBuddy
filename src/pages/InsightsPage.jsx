import MenuContainer from "../components/MenuContainer";
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from "@mui/material";
import { readData, altReadData } from "../utility/query";
import { dummyData } from "../assets/dummy_data";
import { useState, useEffect } from "react";
import { getExpensesForDate, getExpensesForMonth, getAggregateExpenses, AggData} from "../utility/aggregateData";

const InsightsPage = () => {
  const spendingHistory = JSON.parse(localStorage.getItem('SpendingHistory'))
  console.log(spendingHistory)
  const { User, Income, Budget, Expenses} = dummyData;
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);
  // turns number into comma-separated dollar amount
  const income = Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const budget = Budget.Monthly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //get the month
  let date = new Date();
  let month = date.getMonth() + 1;
  //number of days in the given month! 
  let numberDays = new Date(2023, month, 0).getDate()
  //budget per day if we assume budget is uniform via all days of month!
  let dailyBudget = Budget.Monthly / numberDays
  const spendingPerDay = (Income / numberDays).toFixed(2); 
  //cur day of month as of right now! 
  const curDay = date.getUTCDate(); 
  //num days left in current month!
  let numDaysLeft = numberDays - curDay 
  //avg amount spending allowed for remaining income over rem days! 
  const remainingIncome = (Income - totalExpenses)
  //console.log("remainingIncome: ", remainingIncome)
  const onTrackSpendingPerDay = (remainingIncome / numDaysLeft).toFixed(2); 
  //console.log("onTrack: ", onTrackSpendingPerDay)
  const dates = ["2023-10-01","2023-10-02","2023-10-03","2023-10-04"];
  const categories = ["Rent", "Food", "Transport"];
  const aggregateSeries = categories.map(category => {
    return ({
      data: dates.map(date => {
        console.log(spendingHistory)
        let expensesForToday = getExpensesForDate(spendingHistory, date);
        return category in getAggregateExpenses(expensesForToday) ? getAggregateExpenses(expensesForToday)[category].total : 0;
      }),
      label: category
    })
  })
  return (
    <MenuContainer data={dummyData}>
      <Typography variant="h1" sx={{ pt: 4 }}>
        Spending Insights
      </Typography>
      <BarChart series = {aggregateSeries} 
                xAxis={[{ scaleType: 'band', data: dates }]}/>
      <Typography variant="h2" sx={{ pb: 2 }}>
        Spending Recommendations
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: "2.5", pb: 4 }}>
        Based off of your monthly income of ${income} and your budget of ${budget}, we recommend 
        spending about ${spendingPerDay} per day.
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: "2.5", pb: 4 }}>
        Based off of your current spending, you can spend about ${onTrackSpendingPerDay} per 
        day to stay on track.
      </Typography>
      
    </MenuContainer>
  );
};

export default InsightsPage;
