import dummyData from '../assets/dummy_data.js'

export const getExpensesForMonth = (SpendingHistory, month) => {
    return SpendingHistory.filter((expense) => new Date(expense.date).getMonth() == month)
}

export const getExpensesForDate = (SpendingHistory, date) => {
    return SpendingHistory.filter((expense) => new Date(expense.date) == date)
}

// {
//     Rent: { total: 1300, subExpense: { BaseRent: 1300, Utilities: 225 } },
//     Food: { total: 300, subExpense: { Groceries: 300, 'Dine-out': 123 } },
//     Transport: { total: 250, subExpense: { Uber: 250, CTA: 150 } }
//   }

export const getAggregateExpenses = (expenses) => {
    aggregateExpenses = {}
    expenses.forEach((expense) => {
        const { date, category, subcategory, amount } = expense
        if (category in aggregateExpenses) {
            if (subcategory in aggregateExpenses[category]) {
                aggregateExpenses[category].subExpense[subcategory] += amount
            } else {
                aggregateExpenses[category].subExpense[subcategory] = amount
            }
        } else {
            aggregateExpenses[category] = { total: amount, subExpense: { [subcategory]: amount } }
        }
    })
    return aggregateExpenses;
}