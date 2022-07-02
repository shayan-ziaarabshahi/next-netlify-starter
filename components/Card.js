import styles from './../styles/card.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { Store } from './ContextProvider'


export default function Card({data}) {

  const {state, dispatch} = useContext(Store)

  const handleAdd = async () => {
    const d = await fetch(`/api/products/${data.slug}`)
    const p = await d.json()

    if (p.countInStock === 0) {
      alert('sorry, the product is out of stock')
      return
    }
    
    dispatch({type:'ADD_TO_CARD', payload:{...p, quantity:1}})
  }

  return (
    <div className={styles.container}>
        <Image src={data.image} width={290} height={290}/>
        <div className={styles.datacontainer}>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.price}>${data.price}</div>
            <Link href={`./products/${data.slug}`} ><button className={styles.detailsBtn}>details</button></Link>
            <button className={styles.cardBtn} onClick={handleAdd}>add to card</button>
        </div>
    </div>
  )
}
