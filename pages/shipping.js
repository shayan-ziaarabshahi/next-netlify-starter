import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Store } from './../components/ContextProvider'
import { useContext } from 'react'
import Layout from './../components/Layout'
import styles from './../styles/shipping.module.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'


export default function Shipping() {

  const { state, dispatch } = useContext(Store)

  const router = useRouter()

  useEffect(() => {
    if (!state.userData) {
      router.push('/login?redirect=/shipping')
    }
  }, [router, state.userData])


  const formValidationSchema = yup.object().shape({
    fullName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
    phoneNumber: yup.string().required(),
  })

  const defaultValues = {
    fullName: state.card.shippingAddress.fullName,
    address: state.card.shippingAddress.address,
    city: state.card.shippingAddress.city,
    postalCode: state.card.shippingAddress.postalCode,
    country: state.card.shippingAddress.country,
    phoneNumber: state.card.shippingAddress.phoneNumber
  }

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues
  })


  const submitFunc = (data) => {
    dispatch({ type: 'ADD_SHIPPING_ADDRESS', payload: data })
    router.push('/payment')
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>shipping address</h1>
        <div className={styles.linksContainer}>
          <Link href='/cardItemsPage'><span className={styles.link}>card items</span></Link>
        </div>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit(submitFunc)} noValidate>
            <input type='text' placeholder='Full Name' {...register('fullName')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.fullName?.message}</p>
            <input type='text' placeholder='Address' {...register('address')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.address?.message}</p>
            <input type='text' placeholder='City' {...register('city')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.city?.message}</p>
            <input type='text' placeholder='Postal Code' {...register('postalCode')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.postalCode?.message}</p>
            <input type='text' placeholder='Country' {...register('country')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.country?.message}</p>
            <input type='text' placeholder='Phone Number' {...register('phoneNumber')} />
            <p style={{ fontSize: 'small', color: 'red' }}>{errors.phoneNumber?.message}</p>
            <button type='submit' className={styles.submitBtn}>submit</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
