import React, {useEffect, useState} from "react";
import {transactionDataApiHost as apiHost} from './apiHosts'

function Transaction({transaction}) {

  function handleDelete(event){
    console.log(event)
  }

  return (
    <tr id={transaction.id} onClick={handleDelete}>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
