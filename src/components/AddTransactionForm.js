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

  function validateForm(){
    const formDetails = {
      containsEmptyInput:false,
      hasInvalidDate:true,
      isInvalid:false
    }

    //form should not contain empty field
    for(const inputData in formData){
      if(!formData[inputData]){
        formDetails.containsEmptyInput = true
        break
      }
    }

    //date should be between 2000 and today
    const allowablePastDate = (new Date("2019")).getTime()
    const today = (new Date()).getTime()
    const formDataDate = (new Date(formData.date)).getTime()
    formDetails.hasInvalidDate = formDataDate < allowablePastDate ? true : formDataDate > today ? true : false

    //general state of validity of the form
    formDetails.isInvalid = formDetails.containsEmptyInput || formDetails.hasInvalidDate || false

    return formDetails;
  }

  function handleSubmit(event){
    event.preventDefault()
    const formInput = validateForm()

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

      alert('Input submitted successfully')
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
