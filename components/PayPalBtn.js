import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useState } from 'react'

export default function PayPalBtn({ product, token, setIsPaid }) {

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'a good product',
              amount: {
                value: product.totalPrice
              }
            }
          ]
        })
      }}
      onApprove={async (data, actions) => {
        
        const order = await actions.order.capture()
          .then(async (paidOrder) => {
            await fetch(`http://localhost:3000/api/orders/${product._id}/pay`, {
              method: "PUT",
              headers: {
                "authorization": `Bearer ${token}`
              },
              body: JSON.stringify(paidOrder)
            })
          })

          .then(() => setIsPaid(true))
      }}
      onCancel={(data, actions) => {
        //display cancel message, modal or redirect user to cancel page
      }}
      onError={(err) => {
        setError(err)
        console.log('paypal checkout onError', err)
      }}
    ></PayPalButtons>
  )
}
