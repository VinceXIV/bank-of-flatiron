import Transaction from "./Transaction";

function TransactionsList({transactions, search}) {

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

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {transactionList}
      </tbody>
    </table>
  );
}

export default TransactionsList;
