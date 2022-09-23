import {useState} from 'react'
import Transaction from "./Transaction";

function TransactionsList({transactions, setTransactions, search}) {

  // Here, we know that array sort in javascript accepts a callback that takes two items; a, and b
  // and returns 1 if the item that is passed as the first argument is bigger, -1 if the second 
  // item is the bigger one, and 0 if they are equal. As such, we are using -1 as the sort strategies
  // for all items, which means that on the first click, the items will be sorted in the ascending
  // order. Multiple clicks toggle the order in which sorting is done by converting the value of
  // sort strategy between -1 and 1
  const [sortStrategy] = useState({
      date: -1,
      description: -1,
      category: -1,
      amount: -1
    })

  let transactionList = "Loading..." // will show this if data being fetched hasn't returned

  if(transactions){
    // filters displayed list on description and category
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.description.toLowerCase().includes(search.toLowerCase())) 
    })

    transactionList = filteredTransactions.map(transaction => {
      return <Transaction key={transaction.id} transaction={transaction}/>
    })
  }


  function updateSortStrategy(item){
    sortStrategy[item] = sortStrategy[item] * -1 //modifying directly because I don't want the component to rerender
  }


  function sortTransactionList(event){
    const sortBy  = event.target.textContent.toLowerCase()
    updateSortStrategy(sortBy)

    let transactionsCopy 
    
    if(sortBy === "category" || sortBy === "description"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()){
          return sortStrategy[sortBy]
        }else if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
          return sortStrategy[sortBy] * -1
        }else {
          return 0
        }
      })
    }else if(sortBy === "amount"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a.amount > b.amount){
          return sortStrategy.amount
        }else if(a.amount < b.amount){
          return sortStrategy.amount * -1
        }else {
          return 0
        }
      })  
    }else if(sortBy === "date"){
      transactionsCopy = [...transactions].sort((a, b) => {
        const timeA = (new Date(a.date)).getTime()
        const timeB = (new Date(b.date)).getTime()

        if(timeA> timeB){
          return sortStrategy.date
        }else if(timeA < timeB){
          return sortStrategy.date * -1
        }else {
          return 0
        }
      })       
    }

    setTransactions(transactionsCopy)
  }


  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by date">Date</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by description">Description</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by category">Category</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by amount">Amount</h3>
          </th>
        </tr>
        {transactionList}
      </tbody>
    </table>
  );
}

export default TransactionsList;
