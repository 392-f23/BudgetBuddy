import { useState, useEffect } from "react";
import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";
import { fetchUserData } from "../utility/query";
import MenuContainer from "../components/MenuContainer";
import LoadingContainer from "../components/LoadingContainer";
import { AggData } from "../utility/aggregateData";

function HomePage() {
  const { User, Income, Budget, Expenses, SpendingHistory } = dummyData;
  const [expenses, setExpenses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);
  const [data, setData] = useState({});

  useEffect(() => {
    const init = () => {
      let tempTotalExpen = 0;

      Object.entries(expensesState).map((expense) => {
        const [_, breakdown] = expense;
        const { total } = breakdown;

        tempTotalExpen += total;
      });
    };

    const read = async () => {
      setIsLoading(true);
      const uid = localStorage.getItem("uid");
      const data = await fetchUserData(uid);

      if (!data) {
        return;
      }

      const { income, budget, SpendingHistory } = data;
      setData(data);
      setIncome(income);
      setBudget(budget);
      setIsLoading(false);
      const [Expenses, totalExpenses] = AggData(SpendingHistory);
      setExpenses(Expenses);
      setTotalExpenses(totalExpenses);
      localStorage.setItem("SpendingHistory", JSON.stringify(SpendingHistory));
    };

    init();
    read();
  }, [expensesState]);

  return (
    <LoadingContainer isLoading={isLoading}>
      <MenuContainer data={data} totalExpenses={totalExpenses}>
        <ChartSection
          budget={budget}
          income={income}
          setMonthlyBudget={setBudget}
          totalExpenses={totalExpenses}
        />
        <ExpenseSection handleExpensesStateChange={setExpenses} />
      </MenuContainer>
    </LoadingContainer>
  );
}

export default HomePage;
