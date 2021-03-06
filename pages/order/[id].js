import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from './../../styles/orderReportPage.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Store } from '../../components/ContextProvider'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PayPalBtn from '../../components/PayPalBtn'
import dynamic from 'next/dynamic'





function OrderReportPage({ id }) {

    const [isPaid, setIsPaid] = useState(false)

    const router = useRouter()

    const { state, dispatch } = useContext(Store)

    const [orderData, setOrderData] = useState('')

    useEffect(() => {

        const getData = async () => {
            const g = await fetch(`/api/orders/${id}`, {
                headers: {
                    'authorization': `Bearer ${state.userData.token}`
                }
            })
            const res = await g.json()
            if (g.ok) {
                setOrderData(res)
            }
        }
        getData()

    }, [router, state.userData, id, isPaid])


    return (
        <Layout>
            <ToastContainer />
            {state.userData && orderData ? (
                <div className={styles.container}>
                    <h1 className={styles.header}>order {orderData._id}</h1>
                    <div className={styles.linksContainer}>
                        <Link href='/cardItemsPage'><span className={styles.link}>card items</span></Link>
                        &nbsp;{'>'}&nbsp;
                        <Link href='/shipping'><span className={styles.link}>shipping address</span></Link>
                        &nbsp;{'>'}&nbsp;
                        <Link href='/payment'><span className={styles.link}>payment methods</span></Link>
                        &nbsp;{'>'}&nbsp;
                        <Link href='/placeOrder'><span className={styles.link}>place order</span></Link>
                    </div>
                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.shippingContainer}>
                                <h4>shipping address</h4>
                                <p>
                                    <span>{orderData.shippingAddress.country}, </span>
                                    <span> {orderData.shippingAddress.city},</span>
                                    <span> {orderData.shippingAddress.address},</span>
                                    <span> {orderData.shippingAddress.fullName}</span><br />
                                    <span> {orderData.shippingAddress.postalCode}</span><br />
                                    <span> {orderData.shippingAddress.phoneNumber}</span>
                                </p>
                                <div>
                                    <strong>status:</strong>&nbsp;<span>{orderData.isDelivered ? orderData.deliveredAt : 'not delivered'}</span>
                                </div>
                            </div>
                            <div className={styles.paymentContainer}>
                                <div>
                                    <h4>payment method</h4>
                                    <p>{orderData.paymentMethod}</p>
                                </div>
                                <div>
                                    <strong>status:</strong>&nbsp;<span>{orderData.isPaid ? 'paid at ' + orderData.paidAt : 'not paid'}</span>
                                </div>
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
                                            {orderData.orderItems.map(item => (
                                                <tr key={item._id}>
                                                    <td><Image src={item.image} width={75} height={75} alt={item.name} className={styles.image} /></td>
                                                    <td><Link href={`/products/${item.slug}`}><span className={styles.link}>{item.name}</span></Link></td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={styles.summaryBox}>
                            <h4>charges</h4>
                            <div className={styles.summaryBoxGrid}>
                                <strong>Items:</strong>
                                <span>${orderData.itemsPrice}</span>
                                <strong>Tax:</strong>
                                <span>${orderData.taxPrice}</span>
                                <strong>Shipping:</strong>
                                <span>${orderData.shippingPrice}</span>
                                <strong>Total:</strong>
                                <span>${orderData.totalPrice}</span>
                            </div>
                            {!isPaid && !orderData.isPaid && <div>
                                <PayPalBtn
                                    product={orderData}
                                    token={state.userData.token}
                                    setIsPaid={setIsPaid}
                                />
                            </div>}
                        </div>
                    </div>
                </div>
            ) : <h1 className="loginStatement">You Have To <Link href='/login'><span className="globalLink">LogIn</span></Link> First</h1>
            }
        </Layout>
    )
}

export async function getServerSideProps({ query: { id } }) {
    return {
        props: {
            id
        }
    }
}

export default dynamic(() => Promise.resolve(OrderReportPage), { ssr: false })