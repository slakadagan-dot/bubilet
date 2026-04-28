import {
  ChevronDown,
  CircleHelp,
  Heart,
  MapPin,
  Menu,
  Search,
  Settings,
  Star,
  Ticket,
  User,
  UserCircle2,
  UserPen,
  X,
  LogOut,
} from 'lucide-react'
import { useMemo, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORY_OPTIONS, CITY_OPTIONS } from '../context/filterOptions'
import { useFilters } from '../context/useFilters'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isCityModalOpen, setIsCityModalOpen] = useState(false)
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
  } = useFilters()

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleProfileMenuClick = (to) => {
    setIsProfileMenuOpen(false)
    navigate(to)
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    navigate('/')
  }

  const profileMenuItems = [
    { label: 'Profilim', icon: UserCircle2, to: '/profile?tab=profil' },
    { label: 'Bilgilerim', icon: UserPen, to: '/profile?tab=bilgilerim' },
    { label: 'Ayarlar', icon: Settings, to: '/profile?tab=ayarlar' },
    { label: 'Biletlerim', icon: Ticket, to: '/profile?tab=biletlerim' },
    { label: 'Favorilerim', icon: Heart, to: '/favorites' },
    { label: 'Değerlendirmelerim', icon: Star, to: '/profile?tab=degerlendirmelerim' },
    { label: 'Destek', icon: CircleHelp, to: '/' },
  ]

  const filteredCities = useMemo(() => {
    const cityLabels = CITY_OPTIONS.map((city) => `${city}, Türkiye`)
    const normalizedQuery = citySearchQuery.toLocaleLowerCase('tr-TR').trim()
    if (!normalizedQuery) {
      return cityLabels
    }
    return cityLabels.filter((city) =>
      city.toLocaleLowerCase('tr-TR').includes(normalizedQuery),
    )
  }, [citySearchQuery])

  return (
    <header className="sticky top-0 z-[50]">
      <div className="bg-[#00b14f] text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:gap-6">
          <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            >
              <span className="rounded-md bg-white/15 px-2 py-1 text-base leading-none">
                b
              </span>
              Bubilet
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md border border-white/40 p-2 text-white transition hover:bg-white/10 md:hidden"
              aria-label="Mobil menuyu ac"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
            >
              <MapPin size={16} />
              Sehir Sec: {selectedCity}
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="relative hidden flex-1 md:block">
            <input
              type="search"
              placeholder="Etkinlik, mekan, sanatci ara..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-full border-0 bg-white py-3 pl-5 pr-12 text-sm text-slate-700 outline-none ring-2 ring-transparent transition focus:ring-emerald-200"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative hidden md:block" ref={profileMenuRef}>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <User size={17} />
                {user?.firstName || 'Hesabim'}
                <ChevronDown size={14} />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <User size={17} />
                Giriş Yap
              </Link>
            )}

            {isAuthenticated && isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl bg-white py-1 text-sm text-slate-700 shadow-xl ring-1 ring-slate-200 z-[60]">
                {profileMenuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleProfileMenuClick(item.to)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-slate-50"
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={15} />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="border-b border-slate-200 bg-white">
        <nav className="mx-auto hidden w-full max-w-7xl items-center gap-6 px-4 md:flex overflow-x-auto">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap py-4 text-sm font-semibold tracking-wide transition border-b-2 ${
                selectedCategory === category
                  ? 'border-[#00b14f] text-[#00b14f]'
                  : 'border-transparent text-slate-700 hover:text-[#00b14f] hover:border-[#00b14f]'
                }`}
            >
              {category}
            </button>
          ))}
        </nav>
        
        {/* Mobile Secondary Navigation */}
        <div className="md:hidden border-b border-slate-200 bg-white">
          <div className="flex overflow-x-auto px-4 py-2 gap-3">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={`mobile-${category}`}
                type="button"
                onClick={() => {
                  handleCategoryChange(category)
                  setIsMobileMenuOpen(false)
                }}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-full transition ${
                  selectedCategory === category
                    ? 'bg-[#00b14f] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto w-full max-w-7xl space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-700" />
              <select
                className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
              >
                {CITY_OPTIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Etkinlik, mekan, sanatci ara..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
              />
              <Search
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00b14f] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <User size={16} />
              {isAuthenticated ? 'Profilim' : 'Giriş Yap'}
            </Link>
          </div>
        </div>
      )}

      {isCityModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Şehir Seç</h3>
              <button
                type="button"
                onClick={() => setIsCityModalOpen(false)}
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
                aria-label="Sehir modalini kapat"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative">
              <input
                type="search"
                value={citySearchQuery}
                onChange={(event) => setCitySearchQuery(event.target.value)}
                placeholder="Şehir Ara"
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
              />
              <Search
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            <div className="mt-4 max-h-72 space-y-1 overflow-auto">
              {filteredCities.map((cityLabel) => {
                const cityName = cityLabel.split(',')[0]
                const isActive = selectedCity === cityName
                return (
                  <button
                    type="button"
                    key={cityLabel}
                    onClick={() => {
                      setSelectedCity(cityName)
                      setIsCityModalOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${isActive
                        ? 'bg-emerald-50 font-semibold text-[#00b14f]'
                        : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span>{cityLabel}</span>
                    <MapPin size={14} />
                  </button>
                )
              })}
              {filteredCities.length === 0 && (
                <p className="py-4 text-center text-sm text-slate-500">Şehir bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
