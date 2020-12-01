import React from "react";

const ProgressBar = ({ budgetPercentUsed, type }) => {
  return (
    <div className="progress">
      <div
        className={`progress-bar bg-${type}`}
        role="progressbar"
        style={{ width: budgetPercentUsed + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
