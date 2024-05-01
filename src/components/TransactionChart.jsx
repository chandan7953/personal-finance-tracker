import { Card } from "antd";
import React from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const TransactionChart = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          margin: "2rem",
        }}
      >
        <div
          style={{
            width: "65%",
          }}
        >
          <Card
            bordered={true}
            style={{
              height: "520px",
              boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
              borderRadius: "0.5rem",
              flex: 1,
            }}
          >
            <LineChart />
          </Card>
        </div>

        <div
          style={{
            width: "30%",
          }}
        >
          <Card
            bordered={true}
            style={{
              height: "520px",
              boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
              borderRadius: "0.5rem",
              flex: 0.45,
            }}
          >
            <PieChart />
          </Card>
        </div>
      </div>
    </>
  );
};

export default TransactionChart;
