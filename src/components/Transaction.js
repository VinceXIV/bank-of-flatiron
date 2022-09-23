import React, {useEffect, useState} from "react";
import {transactionDataApiHost as apiHost} from './apiHosts'

function Transaction({transaction, setTransactions}) {

  function handleDelete(event){
    fetch(`${apiHost}/transactions/${transaction.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(result => result.json())
    .then(
      fetch(`${apiHost}/transactions`)
      .then(result => result.json())
      .then(data => setTransactions(data))
    )

  }

  return (
    <tr onClick={handleDelete}>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
