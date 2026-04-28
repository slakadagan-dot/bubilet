import { useEffect, useState } from 'react'
import { CartContext } from './cartStore'

const CART_STORAGE_KEY = 'bubilet-cart'
const TICKETS_STORAGE_KEY = 'bubilet-tickets'

const emptyCart = {
  event: null,
  selectedTickets: [],
  selectedSeats: [],
  serviceFee: 0,
  reservationExpiresAt: null,
  totalPrice: 0,
}

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return emptyCart
    const parsed = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object') return emptyCart
    return {
      event: parsed.event || null,
      selectedTickets: Array.isArray(parsed.selectedTickets) ? parsed.selectedTickets : [],
      selectedSeats: Array.isArray(parsed.selectedSeats) ? parsed.selectedSeats : [],
      serviceFee: Number(parsed.serviceFee) || 0,
      reservationExpiresAt: parsed.reservationExpiresAt || null,
      totalPrice: Number(parsed.totalPrice) || 0,
    }
  } catch {
    return emptyCart
  }
}

const getInitialTickets = () => {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) || []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart)
  const [purchasedTickets, setPurchasedTickets] = useState(getInitialTickets)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(purchasedTickets))
  }, [purchasedTickets])

  const setCartFromSelection = ({
    event,
    selectedTickets,
    selectedSeats,
    serviceFee,
    reservationExpiresAt,
    totalPrice,
  }) => {
    setCart({
      event: event || null,
      selectedTickets: selectedTickets || [],
      selectedSeats: selectedSeats || [],
      serviceFee: serviceFee || 0,
      reservationExpiresAt: reservationExpiresAt || null,
      totalPrice: totalPrice || 0,
    })
  }

  const addPurchasedTicket = (ticketOrder) => {
    setPurchasedTickets(prev => [ticketOrder, ...prev])
  }

  const clearCart = () => setCart(emptyCart)

  const cancelTicket = (pnrCode) => {
    setPurchasedTickets(prev => 
      prev.map(ticket => 
        ticket.id === pnrCode 
          ? { ...ticket, status: 'refunded', refundedAt: new Date().toISOString() }
          : ticket
      )
    )
  }

  const updateTicketStatus = (pnrCode, status, additionalData = {}) => {
    setPurchasedTickets(prev => 
      prev.map(ticket => 
        ticket.id === pnrCode 
          ? { ...ticket, status, ...additionalData, updatedAt: new Date().toISOString() }
          : ticket
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, setCartFromSelection, clearCart, purchasedTickets, addPurchasedTicket, cancelTicket, updateTicketStatus }}>
      {children}
    </CartContext.Provider>
  )
}
