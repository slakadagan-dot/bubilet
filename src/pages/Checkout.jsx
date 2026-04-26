import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const orderData = state || {}
  const event = orderData.event
  const selectedTickets = orderData.selectedTickets || []
  const totalPrice = orderData.totalPrice || 0

  const handleCompletePayment = () => {
    if (!event || selectedTickets.length === 0) {
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccessOpen(true)
    }, 2000)
  }

  const handleBackToHome = () => {
    setIsSuccessOpen(false)
    navigate('/', { replace: true, state: null })
  }

  if (!event || selectedTickets.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Sepetiniz bos gorunuyor</h1>
        <p className="mt-2 text-sm text-slate-600">
          Bilet secimi yapmak icin once bir etkinlik detay sayfasina gidin.
        </p>
        <button
          type="button"
          onClick={() => navigate('/events')}
          className="mt-5 rounded-xl bg-[#00b14f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#009946]"
        >
          Etkinlikleri Gor
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section className="space-y-6 lg:col-span-3">
            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Iletisim Bilgileri</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Ad"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                />
                <input
                  type="text"
                  placeholder="Soyad"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100 sm:col-span-2"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100 sm:col-span-2"
                />
              </div>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Odeme Secenekleri</h2>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Kart Uzerindeki Isim"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                />
                <input
                  type="text"
                  placeholder="Kart Numarasi"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="SKT (AA/YY)"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </article>
          </section>

          <aside className="lg:col-span-2">
            <div className="sticky top-28 space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Siparis Ozeti</h2>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-20 w-14 rounded-lg object-cover"
                />
                <div>
                  <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                    {event.title}
                  </p>
                  <p className="text-xs text-slate-500">{event.date}</p>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-slate-200 p-3">
                {selectedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between text-sm text-slate-700"
                  >
                    <span>
                      {ticket.quantity}x {ticket.name}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {(ticket.price * ticket.quantity).toLocaleString('tr-TR')}₺
                    </span>
                  </div>
                ))}
                <div className="mt-2 border-t border-slate-200 pt-2">
                  <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
                    <span>Toplam</span>
                    <span>{totalPrice.toLocaleString('tr-TR')}₺</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="w-full rounded-xl bg-[#00b14f] px-4 py-4 text-base font-extrabold text-white transition hover:bg-[#009946] disabled:cursor-not-allowed disabled:bg-emerald-300"
              >
                {isProcessing ? 'Isleniyor...' : 'Odemeyi Tamamla'}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {isSuccessOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-2xl font-extrabold text-slate-900">Tebrikler!</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Biletleriniz basariyla olusturuldu. Barkodlariniz e-posta adresinize
              gonderilmistir.
            </p>
            <button
              type="button"
              onClick={handleBackToHome}
              className="mt-5 w-full rounded-xl bg-[#00b14f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#009946]"
            >
              Anasayfaya Don
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Checkout
