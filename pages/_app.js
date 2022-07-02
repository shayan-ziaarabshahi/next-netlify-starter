import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import StoreProvider from './../components/ContextProvider'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <PayPalScriptProvider options={{"client-id":process.env.PAYPAL_CLIENT_ID}}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </StoreProvider>
  )
}

export default MyApp
