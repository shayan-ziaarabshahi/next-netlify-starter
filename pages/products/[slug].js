import styles from './../../styles/productDetailsPage.module.css'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import db from '../../db'
import Product from '../../models/Product'
import { Store } from './../../components/ContextProvider'
import Layout from './../../components/Layout'
import { BASE_URL } from 'config'



export default function ProductDetailsPage({ product }) {

    const { dispatch } = useContext(Store)

    if (!product) {
        return <h1>product not found</h1>
    }


    const handleAdd = async () => {
        const d = await fetch(`${BASE_URL}/api/products/${product.slug}`)
        const p = await d.json()

        if (p.countInStock === 0) {
            alert('sorry, the product is out of stock')
            return
        }

        dispatch({ type: 'ADD_TO_CARD', payload: { ...p, quantity: 1 } })
    }

    return (
        <Layout>
            <div className={styles.container}>
                <Link href='/'><div className={styles.backLink}>{'< go back'}</div></Link>
                <div className={styles.mainFlex}>
                    <Image src={product.image} width={500} height={500} alt={product.name} className={styles.image} />
                    <div className={styles.rightFlex}>
                        <div className={styles.dataPart}>
                            <h2 className={styles.name}>{product.name}</h2>
                            <div>
                                <span>category:</span>
                                <span> {product.category}</span>
                            </div>
                            <div>
                                <span>brand:</span>
                                <span> {product.brand}</span>
                            </div>
                            <div>
                                <span>rating:</span>
                                <span> {product.rating}</span>
                                <span> from </span>
                                <span>({product.numReviews} reviews)</span>
                            </div>
                            <div>
                                <span>description:</span>
                                <span> {product.description}</span>
                            </div>
                        </div>
                        <div className={styles.paymentPart}>
                            <div className={styles.paymentPartGrid}>
                                <div>price</div>
                                <div>$80</div>
                                <div>status</div>
                                <div>{product.countInStock > 0 ? 'in stock' : 'out of stock'}</div>
                            </div>
                            <div className={styles.btnWrapper}>
                            <button className={styles.paymentBtn} onClick={handleAdd}>add to card</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { slug } }) {

    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    return {
        props: {
            product: db.convertDocToObj(product)
        }
    }
}  
