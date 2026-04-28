import { Calendar, ChevronRight, MapPin, Share2, Star, Ticket, Check, Navigation } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { mockEvents } from '../data/mockData'

const SERVICE_FEE = 12.9
const RESERVATION_DURATION_SECONDS = 5 * 60

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setCartFromSelection } = useCart()
  const event = mockEvents.find((item) => item.id === Number(id))
  
  // State for button interactions
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFollowToast, setShowFollowToast] = useState(false)
  const [showDirectionsToast, setShowDirectionsToast] = useState(false)
  
  if (!event) {
    return (
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Etkinlik bulunamadı</h1>
      </div>
    )
  }

  const otherEvents = mockEvents.filter(e => e.venue === event.venue && e.id !== event.id).slice(0, 3)
  const currentTicketTypes = event.ticketTypes || [
    { id: 'vip', name: 'VIP', price: 2500 },
    { id: 'front', name: 'Sahne Önü', price: 1500 },
    { id: 'general', name: 'Genel Giriş', price: 800 },
  ]

  const isStanding = !event.isSeated

  // Handler functions
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
    setShowFollowToast(true)
    setTimeout(() => setShowFollowToast(false), 3000)
  }

  const handleDirectionsClick = () => {
    setShowDirectionsToast(true)
    setTimeout(() => setShowDirectionsToast(false), 3000)
    // In a real app, this would open maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.city)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white px-4 py-3 border-b border-slate-200">
        <div className="mx-auto max-w-7xl flex items-center text-xs text-slate-500 gap-2">
          <Link to="/" className="hover:text-slate-900">Anasayfa</Link>
          <ChevronRight size={14} />
          <Link to="/events" className="hover:text-slate-900">Etkinlikler</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">{event.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Left Column (Poster + Details) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Hero Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex flex-col md:flex-row p-6 gap-6">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-80 w-56 rounded-lg object-cover shadow-md"
                  />
                </div>
                
                {/* Event Info */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {event.category.toUpperCase()}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Share2 size={20} />
                      </button>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
                      {event.title}
                    </h1>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-slate-700">
                        <Calendar className="mr-3 text-[#00b14f]" size={20} />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center text-slate-700">
                        <MapPin className="mr-3 text-[#00b14f]" size={20} />
                        <span className="font-medium">{event.venue}, {event.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing / Tickets Button */}
                  <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Bilet Fiyatları</p>
                      <p className="text-xl font-bold text-slate-900">
                        {event.price ? `${event.price.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla` : 
                         currentTicketTypes.length > 0 ? `${Math.min(...currentTicketTypes.map(t => t.price)).toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla` : 
                         'Fiyat belirtilmemiş'}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        document.getElementById('tickets-section')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-[#00b14f] text-white px-6 py-3 rounded-lg font-bold transition-colors hover:bg-[#009946] flex items-center gap-2">
                      <Ticket size={20} />
                      Biletler
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tickets Section */}
            {isStanding && (
              <div id="tickets-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Bilet Kategorileri</h2>
                  {currentTicketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{ticket.name}</p>
                        <p className="text-sm font-bold text-[#00b14f] mt-1">{ticket.price.toLocaleString('tr-TR')} ₺</p>
                      </div>
                      <button
                        onClick={() => navigate(`/seans/${event.id}/bilet/${ticket.id}`)}
                        className="h-10 rounded-full bg-[#00b14f] px-6 text-sm font-bold text-white transition hover:bg-[#009946]"
                      >
                        Satın Al
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex h-full min-h-[160px] items-center justify-center rounded-2xl bg-[#00b14f] p-6 text-center shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <h3 className="relative z-10 text-3xl font-black text-white drop-shadow-md">
                    Ayakta düzen<br/>vardır.
                  </h3>
                </div>
              </div>
            )}

            {/* Seated Events - Seat Selection */}
            {!isStanding && (
              <div id="tickets-section" className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Koltuk Seçimi</h2>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-600">Lütfen önce kategori seçin:</p>
                    <select 
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          navigate(`/seans/${event.id}/koltuk/${e.target.value}`)
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>Kategori Seçin</option>
                      {currentTicketTypes.map((ticket) => (
                        <option key={ticket.id} value={ticket.id}>
                          {ticket.name} - {ticket.price.toLocaleString('tr-TR')} ₺
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => navigate(`/seans/${event.id}/koltuk/${currentTicketTypes[0]?.id}`)}
                    className="w-full bg-[#00b14f] text-white px-6 py-3 rounded-lg font-bold transition hover:bg-[#009946] flex items-center justify-center gap-2"
                  >
                    <Ticket size={20} />
                    Koltuk Haritasını Gör
                  </button>
                </div>
              </div>
            )}

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Etkinlik Hakkında Bilmeniz Gerekenler</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                {event.rules ? (
                  event.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b14f]"></span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b14f]"></span>
                      <span className="leading-relaxed">Etkinlik alanına yiyecek ve içecek ile giriş yapılamaz.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b14f]"></span>
                      <span className="leading-relaxed">18 yaş altı katılımcılar ebeveyn refakati ile girebilir.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Açıklama</h2>
              <div className="whitespace-pre-line text-slate-700 leading-relaxed text-sm">
                {event.description || "Etkinlik detayları eklenecektir."}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Artist Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="text-slate-400" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{event.title.split(' ')[0]}</h3>
                  <p className="text-xs text-slate-500">5 Etkinlik</p>
                </div>
              </div>
              <button 
                onClick={handleFollowClick}
                className={`w-full py-2.5 rounded-lg border font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                  isFollowing 
                    ? 'bg-[#00b14f] text-white border-[#00b14f]' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check size={16} />
                    Takip Ediliyor
                  </>
                ) : (
                  <>
                    <Star size={16} />
                    Takip Et
                  </>
                )}
              </button>
            </div>

            {/* Venue Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 text-base mb-1">{event.venue}</h3>
              <p className="text-xs text-slate-500 mb-4">{event.city}</p>
              
              <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=Istanbul&zoom=13&size=400x400&maptype=roadmap&sensor=false")', backgroundSize: 'cover' }}></div>
                <div className="z-10 bg-white p-2 rounded-full shadow-md text-[#00b14f]">
                  <MapPin size={20} />
                </div>
              </div>

              <button 
                onClick={handleDirectionsClick}
                className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation size={16} />
                Yol Tarifi Al
              </button>
            </div>

            {/* Other Events at Venue */}
            {otherEvents.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Mekandaki Diğer Etkinlikler</h3>
                <div className="space-y-3">
                  {otherEvents.map(other => (
                    <Link to={`/event/${other.id}`} key={other.id} className="flex items-center gap-3 group">
                      <img src={other.imageUrl} alt={other.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#00b14f] transition-colors">{other.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Calendar size={10} />
                          {other.date.split(',')[0]}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Toast Notifications */}
      {showFollowToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00b14f] rounded-full flex items-center justify-center">
              <Star size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {isFollowing ? 'Sanatçı takip ediliyor' : 'Takip bırakıldı'}
              </p>
              <p className="text-xs text-slate-500">
                {isFollowing ? 'Yeni etkinliklerden haberdar olacaksınız' : 'Artık bildirim almayacaksınız'}
              </p>
            </div>
          </div>
        </div>
      )}

      {showDirectionsToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Navigation size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Haritalara yönlendiriliyor...</p>
              <p className="text-xs text-slate-500">{event.venue} konumu açılıyor</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetail
