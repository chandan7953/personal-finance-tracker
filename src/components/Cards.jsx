import React from "react";
import { Card, Row, Col } from "antd";

function Cards({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  cardStyle,
  reset,
}) {
  return (
    <Row
      style={{
        width: "100%",
      }}
    >
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card bordered={true} style={cardStyle}>
          <h2>Current Balance</h2>
          <p>₹{currentBalance}</p>
          <div className="btn btn-blue" style={{ margin: 0 }} onClick={reset}>
            Reset Balance
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card bordered={true} style={cardStyle}>
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <div
            className="btn btn-blue"
            style={{ margin: 0 }}
            onClick={showIncomeModal}
          >
            Add Income
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card bordered={true} style={cardStyle}>
          <h2>Total Expenses</h2>
          <p>₹{expenses}</p>
          <div className="btn btn-blue" onClick={showExpenseModal}>
            Add Expense
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
