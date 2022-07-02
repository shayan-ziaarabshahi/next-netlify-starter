import { useRouter } from 'next/router'
import React from 'react'
import { useContext, useEffect } from 'react'
import { Store } from './../components/ContextProvider'
import Layout from './../components/Layout'
import styles from './../styles/orders.module.css'

export default function Orders() {

  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  useEffect(() => {
    if (!state.userData) {
      router.push('/login?redirect=/orders')
    }
    console.log(state.userData.token)
    const handler = async () => {
      const g = await fetch(`http://localhost:3000/api/orders/history`, {
        method:'GET',
        headers: {
          'authorization': `Bearer ${state.userData.token}`
        }
      })
      const res = await g.json()
      console.log(res)
    }
    handler()
  },[router, state.userData])


  return (
    <Layout>
      <div className={styles.container}>
        <div>
          <table className={styles.table}>
              <thead>
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
              </thead>
          </table>
        </div>
      </div>
    </Layout>
    
  )
}


