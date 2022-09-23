import React, {useState} from "react";

function AddTransactionForm({handleAddTransaction}) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  })

  function updateFormData(event){
    setFormData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }

  function handleSubmit(event){
    event.preventDefault()
    handleAddTransaction(formData)
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" onChange={updateFormData} value={formData.date}/>
          <input type="text" name="description" placeholder="Description" onChange={updateFormData} value={formData.description}/>
          <input type="text" name="category" placeholder="Category" onChange={updateFormData} value={formData.category}/>
          <input type="number" name="amount" placeholder="Amount" step="0.01" onChange={updateFormData} value={formData.amount}/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
