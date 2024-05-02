import React from "react";
import { Pie } from "@ant-design/plots";

const PieChart = ({ pieData }) => {
  const config = {
    data: pieData,
    angleField: "value",
    colorField: "category",
    style: {
      lineWidth: 1,
      stroke: "#ffffff",
    },
  };
  return <Pie {...config} />;
};

export default PieChart;
