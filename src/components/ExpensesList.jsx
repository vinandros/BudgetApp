import React from "react";
import Expense from "./Expense";
import PropTypes from "prop-types";

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
ExpensesList.propTypes = {
  setExpensesList: PropTypes.func.isRequired,
  setWeekBudget: PropTypes.func.isRequired,
  expensesList: PropTypes.array.isRequired,
  weekBudget: PropTypes.object.isRequired,
};

export default ExpensesList;
