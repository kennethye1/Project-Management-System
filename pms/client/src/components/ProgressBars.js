import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const ProgressBars = ({ value }) => {
  let now = 0;
  if (value.total !== 0) {
    now = Math.trunc((value.finished / value.total) * 100);
  }
  return (
    <div className="container">
      <ProgressBar now={now} label={`${now}%`} />
    </div>
  );
};

export default ProgressBars;
