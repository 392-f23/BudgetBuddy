import ChartSection from "../components/ChartSection";
import Header from "../components/Header";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";

function HomePage() {
  return (
    <ChartSection
      budget={dummyData["Budget"]["Monthly"]}
      income={dummyData.Income}
      expenses={dummyData.Expenses}
    />
  );
}

export default HomePage;
