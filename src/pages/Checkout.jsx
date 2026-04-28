import { Clock3, ShoppingCart, Ticket, AlertCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'

const SERVICE_FEE_FALLBACK = 12.9

const formatCountdown = (seconds) => {
  const safeSeconds = Math.max(0, seconds)
  const min = String(Math.floor(safeSeconds / 60)).padStart(2, '0')
  const sec = String(safeSeconds % 60).padStart(2, '0')
  return `${min}:${sec}`
}

const Checkout = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { cart, setCartFromSelection, clearCart, addPurchasedTicket } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [isInvoiceRequested, setIsInvoiceRequested] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)
  const [showFormError, setShowFormError] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('')
  const [cardMonth, setCardMonth] = useState('')
  const [cardYear, setCardYear] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const orderData = state || cart
  const event = orderData.event
  const selectedTickets = orderData.selectedTickets || []
  const selectedSeats = orderData.selectedSeats || []
  const serviceFee = Number(orderData.serviceFee) || SERVICE_FEE_FALLBACK
  const totalPrice = orderData.totalPrice || 0
  const subtotal = Math.max(0, totalPrice - serviceFee)
  const [reservationSecondsLeft, setReservationSecondsLeft] = useState(
    Number(orderData.reservationExpiresAt) || 0,
  )

  useEffect(() => {
    if (state?.event && (state?.selectedTickets?.length || 0) > 0) {
      setCartFromSelection(state)
    }
  }, [setCartFromSelection, state])

  useEffect(() => {
    const timer = setInterval(() => {
      setReservationSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Cleanup modal and body scroll on unmount
  useEffect(() => {
    return () => {
      setShowSuccessModal(false)
      // Ensure body scroll is restored
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(document.body.style.scrollY || '0'))
    }
  }, [])

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (showSuccessModal) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [showSuccessModal])

  const handleCompletePayment = () => {
    if (!event || selectedTickets.length === 0) return

    // Reset error states
    setShowFormError(false)
    setShowTermsError(false)

    // Ensure any existing modal state is cleaned up
    const cleanupModal = () => {
      setShowSuccessModal(false)
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }

    // Perfect Form Validation
    const cleanedCardNumber = cardNumber.replace(/\s/g, '')
    const isCardValid = cleanedCardNumber.length === 16 && /^\d+$/.test(cleanedCardNumber)
    const isMonthValid = cardMonth !== '' && cardMonth !== 'Ay' && /^[0-1][0-9]$/.test(cardMonth)
    const currentYear = new Date().getFullYear()
    const isYearValid = cardYear !== '' && cardYear !== 'Yıl' && parseInt(cardYear) >= currentYear
    const isCvvValid = cardCvv.length === 3 && /^\d{3}$/.test(cardCvv)

    // Check each validation and show specific error
    if (!isCardValid) {
      setShowFormError(true)
      setTimeout(() => setShowFormError(false), 4000)
      return
    }
    if (!isMonthValid) {
      setShowFormError(true)
      setTimeout(() => setShowFormError(false), 4000)
      return
    }
    if (!isYearValid) {
      setShowFormError(true)
      setTimeout(() => setShowFormError(false), 4000)
      return
    }
    if (!isCvvValid) {
      setShowFormError(true)
      setTimeout(() => setShowFormError(false), 4000)
      return
    }

    if (!isTermsAccepted) {
      setShowTermsError(true)
      setTimeout(() => setShowTermsError(false), 4000)
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      // Add ticket to global state first
      addPurchasedTicket({
        id: Math.random().toString(36).substring(2, 9),
        event,
        selectedTickets,
        selectedSeats,
        totalPrice,
        purchaseDate: new Date().toISOString()
      })
      clearCart()
      setIsProcessing(false)
      
      // Show success modal
      setShowSuccessModal(true)
      
      // Redirect after 2 seconds with proper cleanup
      const redirectTimer = setTimeout(() => {
        // Clean up modal state immediately
        cleanupModal()
        
        // Clear cart and save to localStorage
        clearCart()
        
        // Force hard redirect to break React Router state
        window.location.href = '/profile?tab=biletlerim'
      }, 2000)
      
      // Cleanup timer on unmount
      return () => {
        clearTimeout(redirectTimer)
        cleanupModal()
      }
    }, 2000)
  }

  // Handle card number formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim()
    setCardNumber(formattedValue)
  }

  // Handle CVV formatting
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 3) value = value.slice(0, 3)
    setCardCvv(value)
  }

  if (!event || selectedTickets.length === 0) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <ShoppingCart size={40} className="mx-auto text-slate-400" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Sepetiniz şu an boş</h1>
          <p className="mt-2 text-sm text-slate-600">
            Bilet seçimi yapmak için önce bir etkinlik detay sayfasına gidin.
          </p>
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="mt-5 rounded-xl bg-[#00b14f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#009946]"
          >
            Etkinlikleri Gör
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl transform animate-in fade-in zoom-in duration-300">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-[#00b14f]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">İşleminiz Onaylandı!</h2>
            <p className="text-sm text-slate-600 mb-6">Biletiniz başarıyla oluşturuldu. Yönlendiriliyorsunuz...</p>
            <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
              <div className="bg-[#00b14f] h-full rounded-full animate-pulse" style={{animation: 'shrink 2s linear'}}></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="space-y-6 xl:col-span-2">
            <article className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Etkinlik Özeti</h2>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-24 w-16 rounded-lg object-cover shadow-sm"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500 font-medium">{event.date}</p>
                  <p className="text-xs text-slate-500">{event.venue}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Kredi Kartı</h2>
              
              {showFormError && (
                <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl text-sm font-semibold animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={18} />
                  Lütfen tüm alanları eksiksiz ve doğru şekilde doldurun: Kart numarası (16 hane), son kullanma tarihi ve CVV (3 hane).
                </div>
              )}

              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Kart Numarası (16 hane)"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                    showFormError && cardNumber.replace(/\s/g, '').length < 16 
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100 placeholder:text-red-300' 
                      : 'border-slate-200 focus:border-[#00b14f] focus:ring-emerald-100'
                  }`}
                />
                <div className="grid grid-cols-3 gap-3">
                  <select 
                    value={cardMonth}
                    onChange={(e) => setCardMonth(e.target.value)}
                    className={`rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 ${
                      showFormError && (cardMonth === '' || cardMonth === 'Ay')
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100 text-red-400'
                        : 'border-slate-200 focus:border-[#00b14f] focus:ring-emerald-100'
                    }`}
                  >
                    <option value="">Ay</option>
                    {Array.from({ length: 12 }, (_, idx) => {
                      const m = String(idx + 1).padStart(2, '0')
                      return <option key={`month-${m}`} value={m}>{m}</option>
                    })}
                  </select>
                  <select 
                    value={cardYear}
                    onChange={(e) => setCardYear(e.target.value)}
                    className={`rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 ${
                      showFormError && (cardYear === '' || cardYear === 'Yıl')
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100 text-red-400'
                        : 'border-slate-200 focus:border-[#00b14f] focus:ring-emerald-100'
                    }`}
                  >
                    <option value="">Yıl</option>
                    {Array.from({ length: 10 }, (_, idx) => {
                      const y = 2026 + idx
                      return <option key={`year-${y}`} value={y}>{y}</option>
                    })}
                  </select>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={handleCvvChange}
                    className={`rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                      showFormError && cardCvv.length < 3
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100 placeholder:text-red-300'
                        : 'border-slate-200 focus:border-[#00b14f] focus:ring-emerald-100'
                    }`}
                  />
                </div>
              </div>

              <label className="mt-6 flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInvoiceRequested}
                  onChange={(eventInput) => setIsInvoiceRequested(eventInput.target.checked)}
                  className="h-4 w-4 accent-[#00b14f] rounded"
                />
                Kurumsal fatura istiyorum
              </label>
            </article>
          </section>

          <aside className="xl:col-span-1">
            <div className="sticky top-28 space-y-5 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Sipariş Özeti</h2>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-sm font-semibold text-[#00b14f]">
                <p className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  Rezervasyon Süresi: {formatCountdown(reservationSecondsLeft)}
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                {(selectedSeats.length > 0 ? selectedSeats : selectedTickets.map((t) => `${t.quantity}x ${t.name}`)).map(
                  (item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm text-slate-700 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <Ticket size={14} className="text-[#00b14f]"/>
                        {selectedSeats.length > 0 ? `SL - ${item.replace(/[A-Z]/g, '')}` : item}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <div className="space-y-3 rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-slate-800">{subtotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Hizmet Bedeli</span>
                  <span className="font-semibold text-slate-800">{serviceFee.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>İndirim</span>
                  <span className="font-semibold text-slate-800">{discountCode ? '-25,00 ₺' : '0,00 ₺'}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 text-base font-extrabold text-slate-900 mt-2">
                  <div className="flex items-center justify-between">
                    <span>Genel Toplam</span>
                    <span className="text-xl text-[#00b14f]">{(totalPrice - (discountCode ? 25 : 0)).toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="discount-code">
                  İndirim Kodu
                </label>
                <div className="flex gap-2">
                  <input
                    id="discount-code"
                    value={discountCode}
                    onChange={(eventInput) => setDiscountCode(eventInput.target.value)}
                    type="text"
                    placeholder="Kodu girin"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
                  />
                  <button className="bg-slate-900 text-white px-4 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">Uygula</button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(eventInput) => {
                      setIsTermsAccepted(eventInput.target.checked)
                      if(eventInput.target.checked) setShowTermsError(false)
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#00b14f] rounded"
                  />
                  <span className="leading-relaxed">Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesini okudum ve kabul ediyorum.</span>
                </label>
                {showTermsError && (
                  <div className="mt-3 flex items-center gap-2 text-red-500 bg-red-50 px-3 py-2 rounded-lg text-xs font-semibold animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} />
                    Lütfen koşulları okuyup kabul edin.
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleCompletePayment}
                disabled={isProcessing || reservationSecondsLeft === 0}
                className="w-full rounded-xl bg-[#00b14f] px-4 py-4 text-base font-extrabold text-white transition hover:bg-[#009946] disabled:cursor-not-allowed disabled:bg-emerald-300 shadow-md shadow-emerald-500/20"
              >
                {isProcessing ? 'İşleniyor...' : 'Siparişi Tamamla'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Checkout
