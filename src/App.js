import React, { useEffect, useState } from 'react'
import { View } from './Components/View';
import { BsCommand } from "react-icons/bs";

//getting data from local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('receipts');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}
export const App = () => {


  const [receipts, setreceipts] = useState(getDatafromLS());

  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [payment_mode, setPayment] = useState('');
  const [remark, setRemark] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let receipt = {
      date: date,
      amount: amount,
      payment_mode: payment_mode,
      remark: remark
    }
    setreceipts([...receipts, receipt]);
    setDate('');
    setAmount('');
    setPayment('');
    setRemark('');
  }


  useEffect(() => {
    localStorage.setItem('receipts', JSON.stringify(receipts));
  }, [receipts])

  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='form-container'>
          <form className='form-group' onSubmit={handleSubmit} autoComplete='off'>
            <h5>Receipt Details</h5>
            <div className='container'>
            <div>
              <label className='required'>Date</label><br></br>
              <label className='required'>Amount</label><br></br>
              <label for="payment_modes" className='required'>Payment Mode</label><br></br>
              <label >Remark</label>
            </div>
            <div>
              <input type="date" placeholder='Enter Date' className='form-control' required onChange={(e) => setDate(e.target.value)} value={date}></input> <br></br>
              <input type="number" placeholder='Enter Amount (in INR)' className='form-control' required onChange={(e) => setAmount(e.target.value)} value={amount}></input><br></br>
              <select id='payment_mode' onChange={(e) => setPayment(e.target.value)} value={payment_mode}>
                <option value='cash'>Cash</option>
                <option value='upi'>UPI</option>
              </select><br></br>
              <input type="text" placeholder='Enter Remark' className='form-control' onChange={(e) => setRemark(e.target.value)} value={remark}></input><br></br>
            </div>
            </div>
            <div className='container2 ' >
              <button type='reset' value='Reset' className='btn btn-default btn-md'>CANCEL <br></br> <u>(ESC)</u></button>
              <button type='submit' className='btn btn-success btn-md'>SUBMIT <br></br> <u>( <BsCommand/> S)</u></button>
            </div>
          </form>
        </div>
        <div className='view-container'>
          {receipts.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Payment Mode</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <View receipts={receipts} />
                </tbody>
              </table>
            </div>
          </>}
          {receipts.length < 1 && <div> No Receipts are generated yet </div>}
        </div>
      </div>
    </div>
  )
}

export default App