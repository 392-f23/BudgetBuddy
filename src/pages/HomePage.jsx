import ChartSection from "../components/ChartSection";
import Header from "../components/Header";
// Temp import dummy data
import { dummyData } from "../assets/dummy_data";
import {useEffect} from 'react'
// import fs from 'fs'
function HomePage() {
    // const changeIncome = (income) => {
    //     const dataFilePath = './assets.dummy_data.js';f
    //     const rawData = fs.readFileSync(dataFilePath);
    //     const originalData = JSON.parse(rawData);
    //     originalData.Income = income;
    //     const updatedData = JSON.stringify(originalData, null, 2);
    //     fs.writeFileSync(dataFilePath, updatedData);
    // }
    return (
        <>
            <Header/>
            <ChartSection budget = {dummyData["Budget"]["Monthly"]} income={dummyData.Income} expenses={dummyData.Expenses} /> 
        </>
    )
}

export default HomePage;