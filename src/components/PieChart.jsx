import React from "react";
import { Pie } from "@ant-design/plots";

const PieChart = () => {
  const config = {
    data: [
      { type: "sdfj", value: 27 },
      { type: "jhdfj", value: 25 },
      { type: "fjjdf", value: 18 },
      { type: "fgmnn", value: 15 },
      { type: "gkjjg", value: 10 },
      { type: "gdjkgj", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    paddingRight: 80,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default PieChart;
