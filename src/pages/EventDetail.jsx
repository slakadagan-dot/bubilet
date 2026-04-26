import { MapPin, Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockEvents } from '../data/mockData'

const ticketTypes = [
  { id: 'vip', name: 'VIP', price: 2500 },
  { id: 'front', name: 'Sahne Onu', price: 1500 },
  { id: 'general', name: 'Genel Giris', price: 800 },
]

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockEvents.find((item) => item.id === Number(id))
  const [quantities, setQuantities] = useState({
    vip: 0,
    front: 0,
    general: 0,
  })

  const totalPrice = useMemo(() => {
    return ticketTypes.reduce(
      (sum, ticket) => sum + ticket.price * (quantities[ticket.id] || 0),
      0,
    )
  }, [quantities])

  const updateTicketCount = (ticketId, action) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0
      const next = action === 'increase' ? current + 1 : Math.max(0, current - 1)
      return { ...prev, [ticketId]: next }
    })
  }

  const selectedTickets = ticketTypes
    .map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
      quantity: quantities[ticket.id] || 0,
    }))
    .filter((ticket) => ticket.quantity > 0)

  const handleAddToCart = () => {
    if (selectedTickets.length === 0) {
      return
    }

    navigate('/checkout', {
      state: {
        event,
        selectedTickets,
        totalPrice,
      },
    })
  }

  if (!event) {
    return (
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Etkinlik bulunamadi</h1>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      <section className="relative overflow-hidden rounded-3xl">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col gap-6 p-5 md:flex-row md:items-center md:gap-10 md:p-10">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-72 w-52 rounded-2xl object-cover shadow-2xl md:h-96 md:w-72"
          />
          <div className="space-y-3 text-white">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider">
              {event.category.toUpperCase()}
            </span>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              {event.title}
            </h1>
            <p className="text-base font-semibold text-white/90 md:text-xl">
              {event.date}
            </p>
            <p className="text-sm text-white/85 md:text-lg">{event.venue}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-xl font-bold text-slate-900">Etkinlik Hakkinda</h2>
            <p className="text-sm leading-7 text-slate-600">
              Bu etkinlikte sevdigin sanatcilari ve performanslari bir arada
              deneyimleyecegin unutulmaz bir gece seni bekliyor. Ses, isik ve sahne
              tasarimi ile desteklenen bu ozel deneyim, sehirdeki eglence
              takvimine damga vuracak.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-xl font-bold text-slate-900">Etkinlik Kurallari</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>- Etkinlik alanina yiyecek ve icecek ile giris yapilamaz.</li>
              <li>- 18 yas alti katilimcilar ebeveyn refakati ile girebilir.</li>
              <li>- Organizator programda degisiklik yapma hakkini sakli tutar.</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-xl font-bold text-slate-900">Mekan ve Ulasim</h2>
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="mb-2 inline-flex items-center gap-2 font-semibold text-slate-900">
                <MapPin size={16} className="text-[#00b14f]" />
                {event.venue}, {event.city}
              </p>
              <p>Harbiye Mah. Cumhuriyet Cad. No:17 Sisli / Istanbul</p>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-28 space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Bilet Secimi</h2>

            <div className="space-y-3">
              {ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{ticket.name}</p>
                    <p className="text-sm text-slate-500">
                      {ticket.price.toLocaleString('tr-TR')}₺
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateTicketCount(ticket.id, 'decrease')}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[#00b14f] hover:text-[#00b14f]"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-slate-800">
                      {quantities[ticket.id]}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateTicketCount(ticket.id, 'increase')}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[#00b14f] hover:text-[#00b14f]"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={selectedTickets.length === 0}
              className="w-full rounded-xl bg-[#00b14f] px-4 py-4 text-base font-extrabold text-white transition hover:bg-[#009946] disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              Sepete Ekle - {totalPrice.toLocaleString('tr-TR')}₺
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default EventDetail
