import MenuContainer from "../components/MenuContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography, Box } from "@mui/material";
import { dummyData } from "../assets/dummy_data";
import { useState, useEffect } from "react";
import { getExpensesForDate } from "../utility/aggregateData";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";

const InsightsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [aggregateSeries, setAggregateSeries] = useState([]);
  const [spendingPerDay, setSpendingPerDay] = useState(0);

  let date = new Date();
  let month = date.getMonth() + 1;
  let numberDays = new Date(2023, month, 0).getDate();

  const [onTrackSpendingPerDay, setOnTrackSpendingPerDay] = useState(0);
  const categories = ["Rent", "Food", "Transport"];

  const recentWeek = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return date.toISOString().split("T")[0];
  });

  const recentWeekShorter = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const tempDate = date.toISOString().split("T")[0];
    const tempDateArr = tempDate.split("-");
    const [year, month, day] = tempDateArr;

    return `${month}-${day}`;
  });
  useEffect(() => {
    const init = async () => {
      setIsLoading(false);
      const uid = localStorage.getItem("uid");
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const { SpendingHistory: history, budget, income, expenses } = data;

        setBudget(budget);
        setIncome(income);

        const curDay = date.getUTCDate();
        const numDaysLeft = numberDays - curDay;

        const totalExpense = Object.entries(expenses).reduce(
          (sum, [_, value]) => sum + value["total"],
          0
        );

        const remainingIncome = budget - totalExpense;
        const spendingPerDay = (remainingIncome / numDaysLeft).toFixed(2);
        const perDay = (budget / numberDays).toFixed(2);
        setSpendingPerDay(perDay);
        setOnTrackSpendingPerDay(spendingPerDay);

        const tempSeries = categories.map((category) => {
          return {
            data: recentWeek.map((date) => {
              const expensesForToday = getExpensesForDate(history, date);
              return expensesForToday
                .filter((expense) => expense.category === category)
                .reduce((sum, expense) => sum + expense["amount"], 0);
            }),
            label: category,
          };
        });

        setAggregateSeries(tempSeries);
      }
      setIsLoading(false);
    };

    init();
  }, []);
  return (
    <LoadingContainer isLoading={isLoading}>
      <MenuContainer data={dummyData}>
        <Box sx={{ height: "100%", padding: "32px" }}>
          <Typography
            data-cy="spendingInsights"
            variant="h1"
            sx={{ textAlign: "center" }}
          >
            Spending Insights
          </Typography>
          <BarChart
            series={aggregateSeries}
            xAxis={[{ scaleType: "band", data: recentWeekShorter }]}
          />
          <Typography variant="h2" sx={{ pb: 2 }}>
            Spending Recommendations
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: "2.5", pb: 4 }}
            data-testid="Spending-per-day-recommendation"
          >
            Based off of your monthly income of ${income} and your budget of $
            {budget}, we recommend spending about ${spendingPerDay} per day.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: "2.5", pb: 4 }}>
            Based off of your current spending, you can spend about $
            {onTrackSpendingPerDay} per day to stay on track.
          </Typography>
        </Box>
      </MenuContainer>
    </LoadingContainer>
  );
};

export default InsightsPage;
