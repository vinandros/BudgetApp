import React from "react";
import Form from "./components/Form";
import ExpensesList from "./components/ExpensesList";
import Ask from "./components/Ask";
import BudgetState from "./components/BudgetState";
const App = () => {
  const [weekBudget, setWeekBudget] = React.useState({
    fullBudget: 2000,
    resultBudget: 900,
  });
  const [expensesList, setExpensesList] = React.useState([
    {
      expenseAmount: 500,
      expenseName: "Transportation",
      id: "6c63b025-cc41-4e38-bd28-92b9d1a503e2",
    },
    {
      expenseAmount: 400,
      expenseName: "Groceries",
      id: "122a90de-3e5a-4f02-a63c-538dbcba38d7",
    },
  ]);
  return (
    <div className="container-fluid">
      <div className="row overlap">
        <div className="col-md-4 mx-auto mt-4 mb-0 rounded shadow-lg p-2 mb-1 bg-white rounded-lg border-dark border">
          <h1 className="text-center font-weight-bold text-uppercase font-italic">
            Budget App
          </h1>
        </div>
      </div>
      {weekBudget.fullBudget ? (
        <div className="row col-md-8 mx-auto">
          <div className="col-10 bg bg-white mt-0 d-flex flex-wrap justify-content-around  mx-auto rounded-lg border-dark border shadow-lg">
            <div className="col-md-5 p-3 p-md-4">
              <Form
                setExpensesList={setExpensesList}
                expensesList={expensesList}
                setWeekBudget={setWeekBudget}
                weekBudget={weekBudget}
              />
            </div>
            <div className="col-md-6 p-3 p-md-4">
              {expensesList.length === 0 ? null : (
                <ExpensesList
                  expensesList={expensesList}
                  setExpensesList={setExpensesList}
                  setWeekBudget={setWeekBudget}
                  weekBudget={weekBudget}
                />
              )}

              <BudgetState weekBudget={weekBudget} />
            </div>
          </div>
        </div>
      ) : (
        <div className="row col-md-8 mx-auto">
          <div className="col-10 bg bg-white mt-0 d-flex flex-wrap justify-content-around  mx-auto rounded-lg border-dark border shadow-lg">
            <div className="col-md-10 p-3 p-md-4">
              <Ask setWeekBudget={setWeekBudget} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
