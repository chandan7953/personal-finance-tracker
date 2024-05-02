import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Row, Col, Card } from "antd";

const TransactionChart = ({ transactions, cardStyle }) => {
  const [data, setData] = useState([...transactions]);

  // Update data state when transactions prop changes
  useEffect(() => {
    setData([...transactions]);
  }, [transactions]);

  const processChartData = () => {
    let sortedTransactions = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let initialAmount = 0;
    const chartDataSort = sortedTransactions.map((item) => {
      initialAmount += item.type === "expense" ? -item.amount : item.amount;
      return { date: item.date, amount: initialAmount };
    });

    const spendingData = {};
    sortedTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const tag = transaction.tag;
        spendingData[tag] = (spendingData[tag] || 0) + transaction.amount;
      }
    });

    const pieData = Object.entries(spendingData).map(([category, value]) => ({
      category,
      value,
    }));

    return { chartDataSort, pieData };
  };

  const { chartDataSort, pieData } = processChartData();

  return (
    <>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={16} xl={16}>
          <Card bordered={true} style={cardStyle}>
            <LineChart chartDataSort={chartDataSort} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card bordered={true} style={{ ...cardStyle }}>
            <h2>Total Spending</h2>
            {pieData.length === 0 ? (
              <p>Seems like you haven't spent anything till now...</p>
            ) : (
              <PieChart pieData={pieData} />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TransactionChart;
