import { Frown } from 'lucide-react'
import { useMemo, useState } from 'react'
import EventCard from '../components/EventCard'
import { SORT_OPTIONS } from '../context/filterOptions'
import { useFilters } from '../context/useFilters'
import { mockEvents } from '../data/mockData'
import { getVisibleEvents } from '../utils/eventFilters'

const Events = () => {
  const { searchQuery, selectedCategory, selectedCity, sortBy, setSortBy } = useFilters()
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedVenues, setSelectedVenues] = useState([])
  const [venueSearchQuery, setVenueSearchQuery] = useState('')

  const visibleByTopFilters = getVisibleEvents({
    events: mockEvents,
    searchQuery,
    selectedCategory,
    selectedCity,
    sortBy,
  })
  const venuesWithCount = useMemo(() => {
    const counter = mockEvents.reduce((acc, event) => {
      acc[event.venue] = (acc[event.venue] || 0) + 1
      return acc
    }, {})
    return Object.entries(counter).map(([venue, count]) => ({ venue, count }))
  }, [])

  const filteredVenues = useMemo(() => {
    const normalizedQuery = venueSearchQuery.toLocaleLowerCase('tr-TR').trim()
    if (!normalizedQuery) {
      return venuesWithCount
    }
    return venuesWithCount.filter((item) =>
      item.venue.toLocaleLowerCase('tr-TR').includes(normalizedQuery),
    )
  }, [venueSearchQuery, venuesWithCount])

  const visibleEvents = visibleByTopFilters.filter((event) => {
    const eventPrice = event.price ?? Number.POSITIVE_INFINITY
    const min = minPrice ? Number(minPrice) : null
    const max = maxPrice ? Number(maxPrice) : null
    const matchesMin = min === null || eventPrice >= min
    const matchesMax = max === null || eventPrice <= max
    const matchesVenue =
      selectedVenues.length === 0 || selectedVenues.includes(event.venue)

    return matchesMin && matchesMax && matchesVenue
  })

  const handleVenueToggle = (venue) => {
    setSelectedVenues((prev) =>
      prev.includes(venue) ? prev.filter((item) => item !== venue) : [...prev, venue],
    )
  }

  return (
    <section className="w-full">
      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Tarih Secimi</h2>
              <div className="space-y-2">
                {['Bugun', 'Yarin', 'Bu Hafta'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 transition hover:border-[#00b14f] hover:text-[#00b14f]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Fiyat Araligi</h2>
              <div className="space-y-2 rounded-xl border border-slate-200 p-3">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={minPrice || 0}
                  onChange={(event) => setMinPrice(event.target.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-emerald-100 accent-[#00b14f]"
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={maxPrice || 3000}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-emerald-100 accent-[#00b14f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="Min"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00b14f]"
                />
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Max"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00b14f]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Mekanlar</h2>
              <input
                type="search"
                value={venueSearchQuery}
                onChange={(event) => setVenueSearchQuery(event.target.value)}
                placeholder="Mekan Ara"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00b14f]"
              />
              <div className="max-h-64 space-y-2 overflow-auto pr-1">
                {filteredVenues.map(({ venue, count }) => (
                  <label
                    key={venue}
                    className="flex items-center justify-between gap-2 text-sm text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedVenues.includes(venue)}
                      onChange={() => handleVenueToggle(venue)}
                      className="h-4 w-4 rounded border-slate-300 text-[#00b14f] focus:ring-[#00b14f]"
                    />
                    {venue}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">[{count}]</span>
                  </label>
                ))}
                {filteredVenues.length === 0 && (
                  <p className="text-sm text-slate-500">Aramanıza uygun mekan bulunamadı.</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">Tum Etkinlikler</h1>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {visibleEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-12 text-center">
              <Frown size={36} className="text-slate-400" />
              <p className="text-sm font-medium text-slate-600">
                Aradığınız kriterlere uygun etkinlik bulunamadı
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Events
