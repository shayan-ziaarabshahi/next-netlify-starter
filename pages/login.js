import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import Layout from './../components/Layout'
import styles from './../styles/login.module.css'
import { useState } from 'react'
import { Store } from '../components/ContextProvider'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic'




function Login() {

    const formValidationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(formValidationSchema)

    })

    const { state, dispatch } = useContext(Store)

    const router = useRouter()

    const { redirect } = router.query

    const submitFunc = async (data) => {

        const p = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await p.json()
        if (p.ok) {
            dispatch({ type: 'ADD_USER_DATA', payload: res })
            router.push(redirect || '/')
        } else {
            toast.error('invalid user and password')
        }

    }


    return (
        <Layout>
            <ToastContainer />
            {!state.userData ? (
                <div className={styles.container}>
                    <h1 className={styles.header}>Login</h1>
                    <div className={styles.formBox}>
                        <form onSubmit={handleSubmit(submitFunc)} noValidate>
                            <input name='email' type='email' placeholder='email'  {...register('email')} />
                            <p style={{ fontSize: 'small', color: 'red' }}>{errors.email?.message}</p>
                            <input name='password' type='password' placeholder='password'   {...register('password')} />
                            <p style={{ fontSize: 'small', color: 'red' }}>{errors.password?.message}</p>
                            <button type='submit' className={styles.submitBtn}>login</button>
                        </form>
                        <Link href='/register'><span className={styles.register}>register</span></Link><span className={styles.registerDescription}> {'(if you have not any account yet.)'}</span>
                    </div>
                </div>
            ) : <h1 className="loginStatement">You Are Already Logged In</h1>}
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(Login), {
    ssr: false
})

