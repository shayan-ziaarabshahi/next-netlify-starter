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



export default function Register() {

    const formValidationSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(16).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'password must match')
    })


    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(formValidationSchema)

    })

    const { state, dispatch } = useContext(Store)

    const router = useRouter()

    const { redirect } = router.query

    useEffect(() => {
        if (state.userData) {
            router.push(redirect || '/')
        }
    }, [router, state.userData, redirect])

    const submitFunc = async (data) => {
        delete data.confirmPassword
        console.log(data)
        const p = await fetch(`/api/auth/register`, {
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
            toast.error('something went wrong.')
        }
    }



    return (
        <Layout>
            <ToastContainer />
            <div className={styles.container}>
                <h1 className={styles.header}>register</h1>
                <div className={styles.formBox}>
                    <form onSubmit={handleSubmit(submitFunc)} noValidate>
                        <input type='text' placeholder='name' {...register('name')} />
                        <p style={{ fontSize: 'small', color: 'red' }}>{errors.name?.message}</p>
                        <input type='email' placeholder='email' {...register('email')} />
                        <p style={{ fontSize: 'small', color: 'red' }}>{errors.email?.message}</p>
                        <input type='password' placeholder='password' {...register('password')} />
                        <p style={{ fontSize: 'small', color: 'red' }}>{errors.password?.message}</p>
                        <input type='password' placeholder='confirm password' {...register('confirmPassword')} />
                        <p style={{ fontSize: 'small', color: 'red' }}>{errors.confirmPassword?.message}</p>
                        <button type='submit' className={styles.submitBtn}>register</button>
                    </form>
                    <Link href='/login'><span className={styles.register}>login</span></Link><span className={styles.registerDescription}> {'(if you already have an account.)'}</span>
                </div>
            </div>
        </Layout>
    )

}