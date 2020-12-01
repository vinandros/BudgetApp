import React from "react";
import Expense from "./Expense";

const ExpensesList = ({
  expensesList,
  setExpensesList,
  setWeekBudget,
  weekBudget,
}) => {
  const handleDelete = (id, expenseAmount) => {
    setExpensesList(expensesList.filter((expense) => expense.id !== id));
    setWeekBudget({
      ...weekBudget,
      resultBudget: weekBudget.resultBudget - expenseAmount,
    });
  };
  return (
    <div>
      <h4>Expenses List:</h4>
      {expensesList.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ExpensesList;
