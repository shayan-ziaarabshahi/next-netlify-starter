import React, { useContext, useEffect, useState } from 'react'
import Layout from './../components/Layout'
import styles from './../styles/placeOrder.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Store } from '../components/ContextProvider'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function PlaceOrder() {

    const [loading, setLoading] = useState(false)

    const { state, dispatch } = useContext(Store)

    const router = useRouter()

    useEffect(() => {
        if (!state.userData) {
            router.push('/login?redirect=/placeOrder')
        }
    }, [router, state.userData])


    let roundFunc = (num) => Math.round(num * 100 + Number.EPSILON) / 100

    let i = 0
    let itemsPrice = 0
    for (i; state.card.cardItems.length > i; i++) {
        itemsPrice += roundFunc(state.card.cardItems[i].price * state.card.cardItems[i].quantity)
    }

    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = roundFunc(itemsPrice * 0.15)
    const totalPrice = roundFunc(itemsPrice + shippingPrice + taxPrice)

    let orderData = {
        orderItems: state.card.cardItems,
        shippingAddress: state.card.shippingAddress,
        paymentMethod: state.card.paymentMethod.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice 
    }


    const handlePlaceOrder = async () => {

        let emptyField = Object.values(orderData).some(item => item === '')
        if (emptyField) {
            toast.error('please make sure you have product in your bag and shipping address and payment method are set')
            return
        }

        setLoading(true)
        const p = await fetch(`/api/orders`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${state.userData.token}`
            },
            body: JSON.stringify(orderData)
        })
        const res = await p.json()
        setLoading(false)
        if (p.ok) {
            dispatch({ type: 'CLEAR_CARD_ITEMS' })
            router.push(`/order/${res._id}`)
        } else {
            toast.error('something went wrong. please contact the support group.')
        }
    }

    return (
        <Layout>
            <ToastContainer />
            <div className={styles.container}>
                <h1 className={styles.header}>Place Order</h1>
                <div className={styles.linksContainer}>
                    <Link href='/cardItemsPage'><span className={styles.link}>card items</span></Link>
                    &nbsp;{'>'}&nbsp;
                    <Link href='/shipping'><span className={styles.link}>shipping address</span></Link>
                    &nbsp;{'>'}&nbsp;
                    <Link href='/payment'><span className={styles.link}>payment methods</span></Link>
                </div>
                <div className={styles.mainFlex}>
                    <div className={styles.left}>
                        <div className={styles.shippingContainer}>
                            <h4>shipping address</h4>
                            <p>
                                <span>{state.card.shippingAddress.country}, </span>
                                <span> {state.card.shippingAddress.city},</span>
                                <span> {state.card.shippingAddress.address},</span>
                                <span> {state.card.shippingAddress.fullName}</span><br />
                                <span> {state.card.shippingAddress.postalCode}</span><br />
                                <span> {state.card.shippingAddress.phoneNumber}</span>
                            </p>
                        </div>
                        <div className={styles.paymentContainer}>
                            <h4>payment method</h4>
                            <span>{state.card.paymentMethod.paymentMethod}</span>
                        </div>
                        <div className={styles.ordersContainer}>
                            <h4>orders</h4>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td className={styles.firstRowCell}>Image</td>
                                            <td className={styles.firstRowCell}>Name</td>
                                            <td className={styles.firstRowCell}>Quantity</td>
                                            <td className={styles.firstRowCell}>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.card.cardItems ? state.card.cardItems.map(item => (
                                            <tr key={item.slug}>
                                                <td><Image src={item.image} width={75} height={75} alt={item.name} className={styles.image} /></td>
                                                <td><Link href={`/products/${item.slug}`}><span className={styles.link}>{item.name}</span></Link></td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price}</td>
                                            </tr>
                                        )) : <tr><td colSpan='4'>nothing to show</td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.summaryBox}>
                        <h4>charges</h4>
                        <div className={styles.summaryBoxGrid}>
                            <strong>Items:</strong>
                            <span>${itemsPrice}</span>
                            <strong>Tax:</strong>
                            <span>${taxPrice}</span>
                            <strong>Shipping:</strong>
                            <span>${shippingPrice}</span>
                            <strong>Total:</strong>
                            <span>${totalPrice}</span>
                        </div>
                        <button className={styles.orderBtn} onClick={handlePlaceOrder}>place order</button>
                        {loading && <div className={styles.ldsHeart}><div></div></div>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
