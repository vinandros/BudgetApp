import React from "react";
import Alert from "./Alert";

const Ask = ({ setWeekBudget }) => {
  const [error, setError] = React.useState(false);
  const [budget, setBudget] = React.useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setWeekBudget({ fullBudget: budget, resultBudget: 0 });
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <h2 className="pr-3">Week budget:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="amount"
            onChange={(e) => setBudget(parseInt(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Set Week Budget
        </button>
        {error && (
          <Alert type={"danger"} msg={"Amount Budget can´t be zero."} />
        )}
      </form>
    </div>
  );
};

export default Ask;
