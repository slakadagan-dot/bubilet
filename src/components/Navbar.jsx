import { ChevronDown, MapPin, Menu, Search, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const categories = [
  { label: 'TRENDLER', path: '/events' },
  { label: 'KONSER', path: '/events' },
  { label: 'TIYATRO', path: '/events' },
  { label: 'FESTIVAL', path: '/events' },
  { label: 'ELEKTRONIK MUZIK', path: '/events' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
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

          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20 md:inline-flex"
          >
            <MapPin size={16} />
            Istanbul
            <ChevronDown size={14} />
          </button>

          <div className="relative hidden flex-1 md:block">
            <input
              type="search"
              placeholder="Etkinlik, mekan, sanatci ara..."
              className="w-full rounded-full border-0 bg-white py-3 pl-5 pr-12 text-sm text-slate-700 outline-none ring-2 ring-transparent transition focus:ring-emerald-200"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <User size={17} />
              Giris Yap
              <ChevronDown size={14} />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-white py-1 text-sm text-slate-700 shadow-xl ring-1 ring-slate-200">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left transition hover:bg-slate-50"
                >
                  Profilim
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left transition hover:bg-slate-50"
                >
                  Biletlerim
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-red-600 transition hover:bg-red-50"
                >
                  Cikis Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <nav className="mx-auto hidden w-full max-w-7xl items-center gap-8 px-4 md:flex">
          {categories.map((category) => (
            <NavLink
              key={category.label}
              to={category.path}
              className={({ isActive }) =>
                `border-b-2 py-3 text-sm font-semibold tracking-wide transition ${
                  isActive
                    ? 'border-[#00b14f] text-[#00b14f]'
                    : 'border-transparent text-[#00b14f] hover:border-[#00b14f]'
                }`
              }
            >
              {category.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto w-full max-w-7xl space-y-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
            >
              <MapPin size={16} />
              Istanbul
              <ChevronDown size={14} />
            </button>
            <div className="relative">
              <input
                type="search"
                placeholder="Etkinlik, mekan, sanatci ara..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
              />
              <Search
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00b14f] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <User size={16} />
              Giris Yap
            </button>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <NavLink
                  key={`mobile-${category.label}`}
                  to={category.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-[#00b14f]"
                >
                  {category.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
