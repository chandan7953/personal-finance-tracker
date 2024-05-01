import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/AddExpenseModal";
import AddIncomeModal from "../components/AddIncomeModal";
import moment from "moment";
import Loader from "../components/Loader";
import NoTransactions from "../components/NoTransactions";
import TransactionSearch from "../components/TransactionSearch";
import { unparse } from "papaparse";

const Dashboard = () => {
  const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem",
    borderRadius: "0.5rem",
    minWidth: "400px",
    flex: 1,
  };
  const [user] = useAuthState(auth);

  // const sampleTransactions = [
  // {
  //   name: "Pay day",
  //   type: "income",
  //   date: "2023-01-15",
  //   amount: 2000,
  //   tag: "salary",
  // },
  // ];
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      try {
        const transactionsRef = collection(
          db,
          `users/${user.uid}/transactions`
        );
        const snapshot = await getDocs(transactionsRef);
        const transactionsArray = snapshot.docs.map((doc) => doc.data());
        setTransactions(transactionsArray);
        toast.success("Transactions Fetched!");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions.");
        setLoading(false); // Reset loading state in case of error
      }
    } else {
      console.error("User not found.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  // Calculate the initial balance, income, and expenses
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const reset = async () => {
    try {
      const transactionsCollectionRef = collection(
        db,
        `users/${user.uid}/transactions`
      );

      // Function to delete all documents in a collection
      const deleteCollection = async (collectionRef) => {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      };

      // Call the deleteCollection function to delete all documents in the transactions collection
      await deleteCollection(transactionsCollectionRef);

      toast.success("All transactions deleted.");
      fetchTransactions();
    } catch (error) {
      toast.error("Error resetting transactions:", error);
    }
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) {
        toast.success("Transaction Added!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  };

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            cardStyle={cardStyle}
            reset={reset}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
            currentBalance={currentBalance}
          />

          {/* charts section  */}
          {transactions.length == 0 ? (
            <NoTransactions />
          ) : (
            <>
              <p>here i have to do</p>
            </>
          )}

          {/* table Section  */}
          <TransactionSearch
            transactions={transactions}
            exportToCsv={exportToCsv}
            fetchTransactions={fetchTransactions}
            addTransaction={addTransaction}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
