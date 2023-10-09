import ChartSection from "../components/ChartSection";
import ExpenseSection from "../components/ExpenseSection";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";

function HomePage() {
  return (
    <>
      <ChartSection
        budget={dummyData["Budget"]["Monthly"]}
        income={dummyData.Income}
        expenses={dummyData.Expenses}
      />
      <ExpenseSection />
    </>
  );
}

export default HomePage;
