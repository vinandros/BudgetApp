import React from "react";
import PropTypes from "prop-types";
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

ProgressBar.propTypes = {
  budgetPercentUsed: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProgressBar;
