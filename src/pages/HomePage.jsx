import { useState, useEffect } from "react";
import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";

function HomePage() {
  const { Income, Budget, Expenses } = dummyData;
  const { Monthly } = Budget;

  const [monthlyBudget, setMonthlyBudget] = useState(Monthly);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);

  useEffect(() => {
    const init = () => {
      let tempTotalExpen = 0;

      Object.entries(Expenses).map((expense) => {
        const [_, breakdown] = expense;
        const { total } = breakdown;
        tempTotalExpen += total;
      });

      setTotalExpenses(tempTotalExpen);
    };

    init();
  }, [expensesState]);

  return (
    <>
      <ChartSection
        budget={monthlyBudget}
        income={Income}
        setMonthlyBudget={setMonthlyBudget}
        totalExpenses={totalExpenses}
      />
      <ExpenseSection
        expenses={expensesState}
        handleExpensesStateChange={setExpensesState}
        budgets={Budget}
      />
    </>
  );
}

export default HomePage;
