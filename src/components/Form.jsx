import React from "react";
import Alert from "./Alert";
import { v4 as uuidv4 } from "uuid";

const Form = ({ setExpensesList, expensesList, setWeekBudget, weekBudget }) => {
  const [newExpense, setNewExpense] = React.useState({});
  const [error, setError] = React.useState(false);
  const [success, setSucess] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpense.expenseName === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    } else {
      setExpensesList([
        ...expensesList,
        {
          id: uuidv4(),
          expenseName: newExpense.expenseName,
          expenseAmount: parseInt(newExpense.expenseAmount),
        },
      ]);
      setWeekBudget({
        ...weekBudget,
        resultBudget:
          weekBudget.resultBudget + parseInt(newExpense.expenseAmount),
      });
      setSucess(true);
      setTimeout(() => {
        setSucess(false);
      }, 3000);
    }
    e.target.reset();
  };
  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <div>
      <h4>Add a new expense:</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expense">Expense</label>
          <input
            type="text"
            className="form-control"
            id="expense"
            required
            name="expenseName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            required
            name="expenseAmount"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add
        </button>
        {success && (
          <Alert type={"success"} msg={"¡Expense Added successfully!"} />
        )}
        {error && (
          <Alert type={"danger"} msg={"Error!, Fill out field properly."} />
        )}
      </form>
    </div>
  );
};

export default Form;
