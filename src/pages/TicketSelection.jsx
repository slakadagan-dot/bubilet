import { Calendar, MapPin, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockEvents } from '../data/mockData'

const SERVICE_FEE = 12.9
const RESERVATION_DURATION_SECONDS = 5 * 60

const defaultTicketTypes = [
  { id: 'vip', name: 'VIP', price: 2500 },
  { id: 'front', name: 'Sahne Önü', price: 1500 },
  { id: 'general', name: 'Genel Giriş', price: 800 },
]

const TicketSelection = () => {
  const { id, categoryId } = useParams()
  const navigate = useNavigate()
  
  const event = mockEvents.find((item) => item.id === Number(id))
  
  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Etkinlik bulunamadı</h1>
        </div>
      </div>
    )
  }

  const currentTicketTypes = event.ticketTypes || defaultTicketTypes
  const selectedCategory = currentTicketTypes.find(t => t.id === categoryId)

  if (!selectedCategory) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Kategori bulunamadı</h1>
        </div>
      </div>
    )
  }

  const [quantity, setQuantity] = useState(0)

  const handleDecrease = () => setQuantity(prev => Math.max(0, prev - 1))
  const handleIncrease = () => setQuantity(prev => Math.max(0, prev + 1))

  const handleGoToCheckout = () => {
    if (quantity === 0) return

    const selectedTickets = [
      {
        id: selectedCategory.id,
        name: selectedCategory.name,
        price: selectedCategory.price,
        quantity: quantity,
      }
    ]

    const subtotal = selectedCategory.price * quantity
    const grandTotal = subtotal + SERVICE_FEE

    navigate('/checkout', {
      state: {
        event,
        selectedTickets,
        selectedSeats: [],
        serviceFee: SERVICE_FEE,
        reservationExpiresAt: RESERVATION_DURATION_SECONDS,
        totalPrice: grandTotal,
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Dark Header */}
      <div className="bg-[#1e1e24] text-white py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-24 h-32 object-cover rounded shadow-md border border-slate-700/50"
          />
          <div className="flex-grow flex flex-col justify-center h-32 py-2">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-3">{event.title}</h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-[#00b14f]" />
                {event.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00b14f]" />
                {event.venue}, {event.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-2xl px-4 mt-8 space-y-6">
        
        {/* Ticket Selector Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedCategory.name}</h2>
          <p className="text-lg font-bold text-[#00b14f] mb-10">{selectedCategory.price.toLocaleString('tr-TR')} ₺</p>
          
          <p className="text-xs font-semibold text-slate-400 tracking-widest mb-6">ADET SEÇİN</p>
          
          <div className="flex items-center justify-center gap-8 mb-4">
            <button
              onClick={handleDecrease}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00b14f] focus:ring-offset-2"
              aria-label="Azalt"
            >
              <Minus size={24} />
            </button>
            <span className="w-16 text-center text-5xl font-black text-slate-900">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00b14f] focus:ring-offset-2"
              aria-label="Artır"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Action Button Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-slate-600 font-medium">Toplam Tutar</span>
            <span className="text-xl font-bold text-slate-900">
              {(selectedCategory.price * quantity).toLocaleString('tr-TR')} ₺
            </span>
          </div>
          <button
            onClick={handleGoToCheckout}
            disabled={quantity === 0}
            className="w-full rounded-xl bg-[#00b14f] py-4 text-lg font-extrabold text-white transition-colors hover:bg-[#009946] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            Ödemeye Geç
          </button>
        </div>

      </div>
    </div>
  )
}

export default TicketSelection
