import React from 'react'

export const View = ({receipts}) => {
  return receipts.map(receipt => (
    <tr key={receipt.payment_mode}>
      <td>{receipt.date}</td>
      <td>{receipt.amount}</td>
      <td>{receipt.payment_mode}</td>
      <td>{receipt.remark}</td>
    </tr>
  ))
}
