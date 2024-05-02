import React from "react";
import { Line } from "@ant-design/plots";

const LineChart = ({ chartDataSort }) => {
  const config = {
    data: chartDataSort,
    xField: "date",
    yField: "amount",
  };
  return (
    <>
      <h2>Financial Statistics</h2>
      <Line {...config} />
    </>
  );
};

export default LineChart;
