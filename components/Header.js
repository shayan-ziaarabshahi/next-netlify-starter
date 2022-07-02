import styles from './../styles/header.module.css'
import { useContext } from 'react'
import { Store } from './ContextProvider'
import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



export default function Header() {

  const { state, dispatch } = useContext(Store)

  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
    Cookies.remove('userData')
    Cookies.remove('cardItems')
    Cookies.remove('shippingAddress')
    Cookies.remove('paymentMethod')
    dispatch({type:'USER_LOGOUT'})
  }


  return (
    <div className={styles.container}>
      <div className={styles.upContainer}>
        <Link href='/'><div className={styles.brand}>Store</div></Link>
        <div className={styles.upRightContainer}>
        { !state.userData &&
          <Link href='/login'><div>Login</div></Link>
        }
        {
          state.userData &&
          <div className={styles.profile}>
          <div className={styles.profileIcon}><i className="bi bi-person-circle"></i></div>
          <div className={styles.profileMenu}>
            <div className={styles.arrowUp}></div>
            <div className={styles.profileMenuItemLast} onClick={handleLogout}>log out</div>
          </div>
          </div>
        } 

          <Link href='/cardItemsPage'>
            <div className={styles.bag}>
              <div className={styles.bagIcon}>
                <i className="bi bi-bag"></i>
              </div>
              <div className={styles.badge}>
                {state.card.cardItems.length}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <nav className={styles.navigationContainer}>

      </nav>
    </div>
  )
}
