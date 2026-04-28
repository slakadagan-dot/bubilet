import { Frown, MapPin, Calendar, Clock, Users, TrendingUp, Music, Theater, PartyPopper, Mic } from 'lucide-react'
import EventCard from '../components/EventCard'
import Sidebar from '../components/Sidebar'
import { SORT_OPTIONS, CATEGORY_OPTIONS, CITY_OPTIONS } from '../context/filterOptions'
import { useFilters } from '../context/useFilters'
import { mockEvents } from '../data/mockData'
import { getVisibleEvents } from '../utils/eventFilters'
import { useState } from 'react'

const Home = () => {
  const { searchQuery, selectedCategory, selectedCity, sortBy, setSortBy, setSelectedCity, setSelectedCategory } = useFilters()
  const [activeTab, setActiveTab] = useState('tumu')
  
  const visibleEvents = getVisibleEvents({
    events: mockEvents,
    searchQuery,
    selectedCategory,
    selectedCity,
    sortBy,
  })

  // Get featured events (first 6 events)
  const featuredEvents = mockEvents.slice(0, 6)
  
  // Get events by category
  const konserler = mockEvents.filter(event => event.category === 'Konser').slice(0, 8)
  const tiyatrolar = mockEvents.filter(event => event.category === 'Tiyatro').slice(0, 8)
  const festivaller = mockEvents.filter(event => event.category === 'Festival').slice(0, 8)
  const standup = mockEvents.filter(event => event.category === 'Stand Up').slice(0, 8)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Konser': return <Music size={20} />
      case 'Tiyatro': return <Theater size={20} />
      case 'Festival': return <PartyPopper size={20} />
      case 'Stand Up': return <Mic size={20} />
      default: return <TrendingUp size={20} />
    }
  }

  const getCityStats = () => {
    const stats = {}
    CITY_OPTIONS.forEach(city => {
      if (city === 'Tüm Şehirler') {
        stats[city] = mockEvents.length
      } else {
        stats[city] = mockEvents.filter(event => event.city === city).length
      }
    })
    return stats
  }

  const cityStats = getCityStats()

  return (
    <div className="w-full space-y-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-[#00b14f] to-emerald-600 px-6 py-12 text-white shadow-lg md:px-12 md:py-16">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold tracking-wider backdrop-blur-sm">
            BUBİLET ÖZEL
          </span>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            2026 YILINDA KAÇIRMAMAN GEREKEN ETKİNLİKLER
          </h1>
          <p className="max-w-xl text-lg text-white/90 md:text-xl">
            Şehrin en çok beklenen konserleri, tiyatro oyunları ve festival
            biletleri tek yerde. Şimdi keşfet, yerini kap.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sort Options */}
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {visibleEvents.length} Etkinlik Bulundu
            </h2>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#00b14f] focus:outline-none focus:ring-1 focus:ring-[#00b14f]/20"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Events Grid */}
          {visibleEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-16 text-center">
              <Frown size={48} className="text-slate-400" />
              <p className="text-lg font-medium text-slate-600">
                Aradığınız kriterlere uygun etkinlik bulunamadı
              </p>
              <p className="text-sm text-slate-500">
                Filtrelerinizi değiştirerek tekrar deneyin
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
