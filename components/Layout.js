import styles from '../styles/layout.module.css'
import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export default function Layout({title, description, children}) {
  return (
    <>
        <Head>
            <meta name='description' content={description}/>
            <title>{title}</title>
        </Head>
        <Header/>
        <div className={styles.main}>
          {children}
        </div>
        <Footer/>
    </>
  )
}

Layout.defaultProps = {
    title: 'E-commerce',
    description: 'an E-commerce website to learn making amazing website.'
}