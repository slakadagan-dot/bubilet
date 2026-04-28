import { Calendar, MapPin, Minus, Plus, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { mockEvents } from '../data/mockData'

const SERVICE_FEE = 12.9
const RESERVATION_DURATION_SECONDS = 5 * 60

// Generate seat layout
const generateSeatLayout = () => {
  const rows = 8
  const seatsPerRow = 12
  const layout = []
  
  for (let row = 0; row < rows; row++) {
    const rowSeats = []
    for (let seat = 0; seat < seatsPerRow; seat++) {
      // Randomly make some seats unavailable for realism
      const isAvailable = Math.random() > 0.15
      rowSeats.push({
        id: `${String.fromCharCode(65 + row)}${seat + 1}`,
        row: String.fromCharCode(65 + row),
        number: seat + 1,
        isAvailable,
        isSelected: false
      })
    }
    layout.push(rowSeats)
  }
  
  return layout
}

const SeatMap = () => {
  const { id, categoryId } = useParams()
  const navigate = useNavigate()
  const { setCartFromSelection } = useCart()
  
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

  const currentTicketTypes = event.ticketTypes || [
    { id: 'vip', name: 'VIP', price: 2500 },
    { id: 'front', name: 'Sahne Önü', price: 1500 },
    { id: 'general', name: 'Genel Giriş', price: 800 },
  ]
  
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

  const [seatLayout, setSeatLayout] = useState(generateSeatLayout())
  const [selectedSeats, setSelectedSeats] = useState([])

  const handleSeatClick = (rowIndex, seatIndex) => {
    const newLayout = [...seatLayout]
    const seat = newLayout[rowIndex][seatIndex]
    
    if (!seat.isAvailable) return
    
    if (seat.isSelected) {
      // Deselect seat
      seat.isSelected = false
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id))
    } else {
      // Select seat
      if (selectedSeats.length >= 6) {
        alert('En fazla 6 koltuk seçebilirsiniz.')
        return
      }
      seat.isSelected = true
      setSelectedSeats(prev => [...prev, seat])
    }
    
    setSeatLayout(newLayout)
  }

  const handleGoToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Lütfen en az bir koltuk seçin.')
      return
    }

    const selectedTickets = [
      {
        id: selectedCategory.id,
        name: selectedCategory.name,
        price: selectedCategory.price,
        quantity: selectedSeats.length,
      }
    ]

    const subtotal = selectedCategory.price * selectedSeats.length
    const grandTotal = subtotal + SERVICE_FEE

    navigate('/checkout', {
      state: {
        event,
        selectedTickets,
        selectedSeats: selectedSeats.map(s => s.id),
        serviceFee: SERVICE_FEE,
        reservationExpiresAt: RESERVATION_DURATION_SECONDS,
        totalPrice: grandTotal,
      },
    })
  }

  const subtotal = selectedCategory.price * selectedSeats.length
  const grandTotal = subtotal + SERVICE_FEE

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#1e1e24] text-white py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Geri Dön
          </button>
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

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Koltuk Seçimi</h2>
              
              {/* Stage */}
              <div className="mb-8">
                <div className="bg-gradient-to-b from-slate-800 to-slate-600 text-white text-center py-3 rounded-t-3xl font-bold text-sm">
                  SAHNE
                </div>
              </div>

              {/* Seats Grid */}
              <div className="space-y-2 mb-6">
                {seatLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex items-center justify-center gap-2">
                    <div className="w-6 text-center text-xs font-bold text-slate-600">
                      {row[0].row}
                    </div>
                    <div className="flex gap-1">
                      {row.map((seat, seatIndex) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          disabled={!seat.isAvailable}
                          className={`w-8 h-8 text-xs font-bold rounded transition-all transform hover:scale-110 ${
                            !seat.isAvailable 
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                              : seat.isSelected 
                                ? 'bg-[#00b14f] text-white' 
                                : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-[#00b14f] hover:bg-emerald-50'
                          }`}
                          title={seat.isAvailable ? `Koltuk ${seat.id}` : 'Bu koltuk dolu'}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                    <div className="w-6 text-center text-xs font-bold text-slate-600">
                      {row[0].row}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white border-2 border-slate-300 rounded"></div>
                  <span className="text-slate-600">Müsait</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#00b14f] rounded"></div>
                  <span className="text-slate-600">Seçili</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded"></div>
                  <span className="text-slate-600">Dolu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Özet</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Kategori</p>
                  <p className="font-bold text-slate-900">{selectedCategory.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-600 mb-1">Seçili Koltuklar</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map(seat => (
                        <span key={seat.id} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
                          {seat.id}
                        </span>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">Koltuk seçilmedi</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Adet</p>
                  <p className="font-bold text-slate-900">{selectedSeats.length} bilet</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Ara Toplam</span>
                  <span className="font-bold text-slate-900">{subtotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Hizmet Bedeli</span>
                  <span className="font-bold text-slate-900">{SERVICE_FEE.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Toplam</span>
                  <span className="text-[#00b14f]">{grandTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>

              <button
                onClick={handleGoToCheckout}
                disabled={selectedSeats.length === 0}
                className="w-full mt-6 bg-[#00b14f] text-white px-6 py-3 rounded-lg font-bold transition hover:bg-[#009946] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Devam Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatMap
