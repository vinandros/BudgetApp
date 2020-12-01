import React from "react";
const Expense = ({ expense, handleDelete }) => {
  const { expenseName, expenseAmount, id } = expense;
  return (
    <div className="d-flex justify-content-between align-items-center mt-2 border">
      <p className="m-0"> {expenseName}</p>
      <p className="font-weight-bold m-0">
        {expenseAmount}
        <button
          type="button"
          className="btn"
          onClick={() => handleDelete(id, expenseAmount)}
        >
          <span className="badge badge-pill badge-danger mt-0">&times;</span>
        </button>
      </p>
    </div>
  );
};

export default Expense;
