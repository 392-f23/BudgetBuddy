

export const getExpensesForMonth = (spendingHistory, month) => {
    return spendingHistory.filter((expense) => new Date(expense.date).getMonth() == month)
}

export const getExpensesForDate = (spendingHistory, date) => {
    return spendingHistory.filter((expense) => expense.date === date);
}

export const AggData = (SpendingHistory) => {
    console.log(`type of spending history: ${typeof (SpendingHistory)}`)
    var totalExpenses = 0
    var template = {
        Rent: {
            total: 0,
            subExpense: {
                BaseRent: 0,
                Utilities: 0,
            },
        },
        Food: {
            total: 0,
            subExpense: {
                Groceries: 0,
                "Dine-Out": 0,
            },
        },
        Transport: {
            total: 0,
            subExpense: {
                Uber: 0,
                CTA: 0,
            },
        },
    }
    //LOOP THROUGH EACH SPENDING HISTORY OBJ => UPDATE TEMPLATE OBJ BASED OFF THIS => MIGHT NEED TO TAKE IN DATE(YYYY-MM-DD) AS PARAM???
    SpendingHistory.forEach(obj => {
        template[obj.category].total += parseFloat(obj.amount)
        template[obj.category].subExpense[obj.subcategory] += parseFloat(obj.amount)
        totalExpenses += parseFloat(obj.amount)
    });

    return [template, totalExpenses];
}

export const getAggregateExpenses = (spendingHistory) => {
    var aggregateExpenses = {}
    spendingHistory.forEach((expense) => {
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