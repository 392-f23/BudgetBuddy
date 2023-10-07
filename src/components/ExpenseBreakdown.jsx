import { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from '@mui/material';
import Expense from "./Expense";

const ExpenseBreakdown = ({ subExpenses, expense, value }) => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Typography variant="h3" sx={{ width: '20%' }}>{expense[0]}</Typography>
                <LinearProgress variant="determinate" sx={{ width: '70%', margin: '0 auto' }} value={expense[1]} />
                
            </Box>
            <Box>
                {Object.entries(subExpenses).map(([subExpense, value]) => 
                <div key={subExpense}>
                    <Expense expense={subExpense} value={value}/>
                    
                    
                </div>)}
                {/* {expense[2].map((key, value) => <Expense expense={subExpense} value={value}/>)} */}

            </Box>
        </>
    );
};

export default ExpenseBreakdown;