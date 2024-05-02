import React from "react";
import transactions from "../assets/transactions.svg";

function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={transactions} alt="No Transaction" className="no-transaction" />

      <span style={{ textAlign: "center", fontSize: "1rem" }}>
        You Have No Transactions Currently
      </span>
    </div>
  );
}

export default NoTransactions;
