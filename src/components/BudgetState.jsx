import React from "react";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";

const BudgetState = ({ weekBudget }) => {
  const [budgetPercentUsed, setBudgetPercentUsed] = React.useState(0);
  const [progressBarType, setProgressBarType] = React.useState("success");

  React.useEffect(() => {
    setBudgetPercentUsed(
      (weekBudget.resultBudget / weekBudget.fullBudget) * 100
    );
  }, [weekBudget]);

  React.useEffect(() => {
    if (budgetPercentUsed >= 85) {
      setProgressBarType("danger");
    } else if (budgetPercentUsed >= 65) {
      setProgressBarType("warning");
    } else {
      setProgressBarType("success");
    }
  }, [budgetPercentUsed]);
  return (
    <div className="mt-3">
      <h4>Budget state:</h4>
      <ProgressBar
        budgetPercentUsed={budgetPercentUsed}
        type={progressBarType}
      />
      <div className="d-flex justify-content-between">
        <p>
          Total:
          <span className="font-weight-bold d-inline">
            {weekBudget.fullBudget}
          </span>
        </p>
        <p>
          Rest:
          <span className="font-weight-bold d-inline">
            {weekBudget.fullBudget - weekBudget.resultBudget}
          </span>
        </p>
      </div>
    </div>
  );
};

BudgetState.propTypes = {
  weekBudget: PropTypes.object.isRequired,
};

export default BudgetState;
