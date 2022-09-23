import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const apiHost = 'http://localhost:8001'
  const [transactions, setTransactions] = useState("")

  useEffect(() =>{
    fetch(`${apiHost}/transactions`)
    .then(res => res.json())
    .then(data => setTransactions(data))
  }, [])

  return (
    <div>
      <Search />
      <AddTransactionForm />
      <TransactionsList transactions={transactions}/>
    </div>
  );
}

export default AccountContainer;
