import React, { useContext, useEffect } from 'react'
import styles from '../styles/cardItemsPage.module.css'
import Layout from '../components/Layout'
import { Store } from '../components/ContextProvider'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardItems() {

  const { state, dispatch } = useContext(Store)

  const router = useRouter()

  let i = 0
  let totalPrice = 0
  for (i; state.card.cardItems.length > i; i++) {
    totalPrice += Math.round((state.card.cardItems[i].price * state.card.cardItems[i].quantity) * 100 + Number.EPSILON) / 100
  }

  const handleChange = (item) => {
    dispatch({ type: 'ADD_TO_CARD', payload: item })
  }

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_CARD', payload: item })
  }

  const handleSubmit = () => {
    if (state.card.cardItems) {
      router.push('/shipping')
    } else {
      toast.error('no product is in your bag.')
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.container}>
        <h1>shopping card details</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <td className={styles.firstRowCell}>Image</td>
                <td className={styles.firstRowCell}>Name</td>
                <td className={styles.firstRowCell}>Quantity</td>
                <td className={styles.firstRowCell}>Price</td>
                <td className={styles.firstRowCell}>Action</td>
              </tr>
            </thead>
            <tbody>
              {state.card.cardItems && state.card.cardItems.map(item => (
                <tr key={item.slug}>
                  <td><Image src={item.image} width={75} height={75} alt={item.name} className={styles.image} /></td>
                  <td><Link href={`/products/${item.slug}`}><span className="globalLink">{item.name}</span></Link></td>
                  <td>
                    <select value={item.quantity} onChange={(e) => handleChange({ ...item, quantity: e.target.value })}>
                      {
                        [...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  <td>${item.price}</td>
                  <td><div className={styles.crossIcon} onClick={() => handleRemove(item)}><i className="bi bi-x"></i></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.totalBox}>
          <span className={styles.totalPriceLabel}>total price:</span>
          <span className={styles.totalPrice}>${totalPrice}</span>
          <div className={styles.btnWrapper} onClick={handleSubmit}><button className={styles.checkoutButton}>submit</button></div>
        </div>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CardItems), {
  ssr: false
})