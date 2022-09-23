import React, {useState} from "react";
import {validateForm} from './utilityFunctions'

function AddTransactionForm({handleAddTransaction}) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  })

  function updateFormData(event){
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    const formInput = validateForm(formData)

    if(formInput.containsEmptyInput){
      alert("please fill all inputs with values")
    }else if(formInput.hasInvalidDate){
      alert("Please enter valid date\nYear is expected to be between 2019 and today")
    }else if(!formInput.isInvalid){
      handleAddTransaction(formData)
  
      setFormData({
        date: "",
        description: "",
        category: "",
        amount: ""
      })

      alert('Data submitted successfully')
    } 
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
