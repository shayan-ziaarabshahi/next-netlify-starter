import styles from '../styles/index.module.css'
import Layout from './../components/Layout'
import Card from '../components/Card'
import db from '../db'
import Product from '../models/Product'

export default function Home({products}) {

  return (
    <Layout>
      <div className={styles.container}>
        <h1>products</h1>
        <div className={styles.productsGrid}> 
          {products.map(item => <Card key={item.slug} data={item}/>)}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}
