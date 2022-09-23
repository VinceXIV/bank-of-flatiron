import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const apiHost = 'http://localhost:8001'
  const [transactions, setTransactions] = useState("")
  const [search, setSearch] = useState("")
  const [newTransaction, setNewTransaction] = useState("")

  useEffect(() =>{
    fetch(`${apiHost}/transactions`)
    .then(res => res.json())
    .then(data => setTransactions(data))
  }, [])

  useEffect(()=>{
    if(newTransaction){
      fetch(`${apiHost}/transactions`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newTransaction)
      })
      .then(result => result.json())
      .then(data => setTransactions([...transactions, data]))
    }
    
  },[newTransaction])

  function handleAddTransactionForm(newTransaction){
    setNewTransaction(newTransaction)
  }

  return (
    <div>
      <Search search={search} setSearch={setSearch}/>
      <AddTransactionForm handleAddTransaction={handleAddTransactionForm}/>
      <TransactionsList transactions={transactions} search={search}/>
    </div>
  );
}

export default AccountContainer;
