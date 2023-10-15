import { useState, useEffect } from "react";
import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";
import { readData, altReadData } from "../utility/query";
import MenuContainer from "../components/MenuContainer";

function HomePage() {
  const { Income, Budget, Expenses } = dummyData;
  const { Monthly } = Budget;

  const [monthlyBudget, setMonthlyBudget] = useState(Monthly);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesState, setExpensesState] = useState(Expenses);

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
    </MenuContainer>
  );
}

export default HomePage;
