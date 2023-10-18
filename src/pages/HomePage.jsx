import { useState, useEffect } from "react";
import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";
import { fetchUserData } from "../utility/query";
import MenuContainer from "../components/MenuContainer";
// import { getIncome, getBudget } from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";
import { AggData } from "../utility/aggregateData";

function HomePage() {
  const { User, Income, Budget, Expenses, SpendingHistory } = dummyData;
  const [expenses, setExpenses] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);
  const [data, setData] = useState({}); 
  //const [spendingHistory, setSpendingHistory] = useState(""); 

  // useEffect(() => {
  //   const init = async () => {
  //     const incomeTemp = await getIncome();
  //     setIncome(incomeTemp);
  //     const budgetTemp = await getBudget();
  //     setBudget(budgetTemp);
  //   };
  //   init();
  // }, []);

  //use uid in LocalStorage for querying DB to get up-to-date info!
  useEffect(() => {
    const init = () => {
      let tempTotalExpen = 0;

      Object.entries(expensesState).map((expense) => {
        const [_, breakdown] = expense;
        const { total } = breakdown;

        tempTotalExpen += total;
      });

      // setTotalExpenses(tempTotalExpen);
    };

    const read = async () => {
      setIsLoading(true);
      const uid = localStorage.getItem("uid");
      const data = await fetchUserData(uid);
      // const data = await fetchUserData("test");
      //no data
      if (!data) {
        return;
      }

      const { income, budget, SpendingHistory} = data;
      console.log("data:", data)
      setData(data);
      console.log(SpendingHistory)
      setIncome(income);
      setBudget(budget);
      setIsLoading(false);
      //setSpendingHistory(spendingHistory)
      const [Expenses, totalExpenses] = AggData(SpendingHistory)
      console.log("total:", totalExpenses);
      setExpenses(Expenses);
      setTotalExpenses(totalExpenses)
      localStorage.setItem("SpendingHistory", JSON.stringify(SpendingHistory)); 
    };

    // const getExpenses = async 

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
        <ExpenseSection
          expenses={expenses}
          handleExpensesStateChange={setExpenses}
          budgets={Budget}
        />
      </MenuContainer>
    </LoadingContainer>
  );
}

export default HomePage;
