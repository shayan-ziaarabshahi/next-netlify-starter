import React, { createContext, useEffect, useReducer, } from 'react'
import Cookies from 'js-cookie'

export const Store = createContext()

const initialState = {
  card: {
    cardItems: '',
    shippingAddress: '',
    paymentMethod: ''
  },
  userData:''
}

const reducer = (state, action) => {
  switch (action.type) {

    case 'ADD_TO_CARD':
      const newItem = action.payload;
      const existItem = state.card.cardItems && state.card.cardItems.find(item => item.slug === newItem.slug)
      const cardItems = existItem ? state.card.cardItems.map(item => item.slug === newItem.slug ? newItem : item) : [...state.card.cardItems, newItem]
      Cookies.set('cardItems', JSON.stringify(cardItems));
      return { ...state, card: { ...state.card, cardItems } }

    case 'REMOVE_FROM_CARD':
      const ci = state.card.cardItems.filter(item => item.slug !== action.payload.slug)
      if (ci === []) {
        ci = ''
      }
      return { ...state, card: { ...state.card, cardItems: ci } }

    case 'BACKUP_CARD_ITEMS':
      return { ...state, card: { ...state.card, cardItems: action.payload } }

    case 'ADD_SHIPPING_ADDRESS':
      Cookies.set('shippingAddress', JSON.stringify(action.payload))
      return { ...state, card: { ...state.card, shippingAddress: action.payload } }

    case 'BACKUP_SHIPPING_ADDRESS':
      return { ...state, card: { ...state.card, shippingAddress: action.payload } }

    case 'ADD_PAYMENT_METHOD':
      Cookies.set('paymentMethod', JSON.stringify(action.payload))
      return { ...state, card: { ...state.card, paymentMethod: action.payload } }

    case 'BACKUP_PAYMENT_METHOD':
      return { ...state, card: { ...state.card, paymentMethod: action.payload } }

    case 'ADD_USER_DATA':
      let userData = action.payload;
      Cookies.set('userData', JSON.stringify(userData))
      return { ...state, userData }

    case 'BACKUP_USER_DATA':
      return { ...state, userData: action.payload }

    case 'USER_LOGOUT':
      return {
        ...state, userData: '', card: {
          cardItems: '',
          shippingAddress: '',
          paymentMethod: ''
        }
      }

    case 'CLEAR_CARD_ITEMS':
      Cookies.remove('cardItems')
      return {
        ...state, card: {
          ...state.card,
          cardItems: ''
        }
      }

    default:
      return state
  }
}

export default function ContextProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (Cookies.get('cardItems')) {
      dispatch({ type: 'BACKUP_CARD_ITEMS', payload: JSON.parse(Cookies.get('cardItems')) })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('userData')) {
      dispatch({ type: 'BACKUP_USER_DATA', payload: JSON.parse(Cookies.get('userData')) })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('shippingAddress')) {
      dispatch({ type: 'BACKUP_SHIPPING_ADDRESS', payload: JSON.parse(Cookies.get('shippingAddress')) })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('paymentMethod')) {
      dispatch({ type: 'BACKUP_PAYMENT_METHOD', payload: JSON.parse(Cookies.get('paymentMethod')) })
    }
  }, [])


  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  )
}