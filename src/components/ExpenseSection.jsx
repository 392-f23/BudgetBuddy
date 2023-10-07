import { useState, useEffect } from 'react';
import Expense from './Expense.jsx';
import ExpenseBreakdown from './ExpenseBreakdown.jsx';
import { dummyData } from '../assets/dummy_data.js';

const ExpenseSection = () => {
    // budgets, expenses
    const { Expenses: expenses, Budget: budgets } = dummyData;

    const [state, setState] = useState([]);
    useEffect(() => {
        const initialize = () => {
            const temp = [];
            Object.entries(expenses).map(([expense, value]) => {
                const initialBudget = budgets[expense];
                const { total, subExpenses } = value;
                temp.push([expense, (100 * total / initialBudget), subExpenses]);
            });

            setState(temp);
        };

        initialize();
    }, []);

    return (
        <div className='expense-section'>
            <h1>Expense Breakdown </h1>
            {/* {Object.entries(expenses).map(([expense, value]) => 
            <div key={expense}>
                <Expense expense={expense} value={value}/>
                
                
            </div>)} */}

            {state.map((expense) => <ExpenseBreakdown subExpenses={expenses} expense={expense} key={expense} />)}
        </div>
    )
}

export default ExpenseSection;

/*
const ExpenseSection = ({budgets, expenses}) => (
    <div className='expense-section'>
        {Object.entries(expenses).map(([expense, value]) => <Expense expense={expense} value={value}/>)}
        {Object.entries(expenses).map(([expense, value]) => <ExpenseBreakdown category={key} budget={budgets['expense']} expense={value}/>)}
    </div>
)
*/