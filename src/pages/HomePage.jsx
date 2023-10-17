import { useState, useEffect } from "react";
import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";
import { readData, altReadData } from "../utility/query";
import MenuContainer from "../components/MenuContainer";
import { getIncome, getBudget } from "../utility/firebase"
//import readData from "../utility/query";

function HomePage() {
  const {Budget, Expenses } = dummyData;

  const [budget, setBudget] = useState(0)
  const [income, setIncome ] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);

  useEffect(() => {
    const init = async () => {
      const incomeTemp = await getIncome();
      setIncome(incomeTemp)
      const budgetTemp = await getBudget();
      setBudget(budgetTemp)
    }
    init();
  }, []);

//use uid in LocalStorage for querying DB to get up-to-date info! 
  useEffect(() => {
    const init = () => {
      let tempTotalExpen = 0;

      Object.entries(expensesState).map((expense) => {
        const [_, breakdown] = expense;
        const { total } = breakdown;

        tempTotalExpen += total;
      });

      setTotalExpenses(tempTotalExpen);
    };

    const read = async () => {
      await readData("users");
    };

    init();
  }, [expensesState]);


  return (
    <MenuContainer>
      <ChartSection
        budget={budget}
        income={income}
        setMonthlyBudget={setBudget}
        totalExpenses={totalExpenses}
      />
      <ExpenseSection
        expenses={expensesState}
        handleExpensesStateChange={setExpensesState}
        budgets={Budget}
      />
    </MenuContainer>
  );
}

export default HomePage;
