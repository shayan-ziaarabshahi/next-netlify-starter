import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import StoreProvider from './../components/ContextProvider'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <PayPalScriptProvider options={{"client-id":"AfJ6Ws7w3Wga7qTJgvVlnFEYbMsyo9eUS6qJqgl5eQMWSAXo7M4QZjlnQbY-qSo9wdKSiD99a9SQ2D2_"}}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </StoreProvider>
  )
}

export default MyApp
