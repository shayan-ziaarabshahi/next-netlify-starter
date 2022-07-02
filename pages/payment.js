import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from './../components/Layout'
import styles from './../styles/payment.module.css'
import Link from 'next/link'
import { Store } from '../components/ContextProvider'
import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


export default function Payment() {

    const { state, dispatch } = useContext(Store)

    const router = useRouter()

    useEffect(() => {
        if (!state.userData) {
            router.push('/login?redirect=payment')
        }
    }, [router, state.userData])
    useEffect(() => {
        if (!state.card.shippingAddress) {
            router.push('/shipping')
        }
    }, [router, state.card.shippingAddress])



    const formValidationSchema = yup.object().shape({
        paymentMethod: yup.string().required()
    })

    const defaultValues = {
        paymentMethod: state.card.paymentMethod.paymentMethod
    }

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(formValidationSchema),
        defaultValues
    })

    const submitFunc = (data) => {
        dispatch({ type: 'ADD_PAYMENT_METHOD', payload: data })
        router.push('/placeOrder')
    }

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.header}>payment method</h1>
                <div className={styles.linksContainer}>
                    <Link href='/cardItemsPage'><span className={styles.link}>card items</span></Link>
                    &nbsp;{'>'}&nbsp;
                    <Link href='/shipping'><span className={styles.link}>shipping address</span></Link>
                </div>
                <div className={styles.formBox}>
                    <form onSubmit={handleSubmit(submitFunc)}>
                        <input type='radio' name='paymentMethod' value='paypal' {...register('paymentMethod')} /><span>Paypal</span>
                        <input type='radio' name='paymentMethod' value='stripe' {...register('paymentMethod')} /><span>Stripe</span>
                        <input type='radio' name='paymentMethod' value='cash' {...register('paymentMethod')} /><span>Cash</span>
                        <p style={{ fontSize: 'small', color: 'red' }}>{errors.paymentMethod && 'payment method is required'}</p>
                        <button type='submit' className={styles.submitBtn}>submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
