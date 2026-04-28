import { useState } from 'react'
import { Calendar, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react'

const Sidebar = () => {
  const [dateExpanded, setDateExpanded] = useState(true)
  const [priceExpanded, setPriceExpanded] = useState(true)
  const [venueExpanded, setVenueExpanded] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [selectedVenues, setSelectedVenues] = useState([])

  const dateOptions = [
    { value: 'today', label: 'Bugün' },
    { value: 'tomorrow', label: 'Yarın' },
    { value: 'thisWeek', label: 'Bu Hafta' }
  ]

  const venues = [
    'Kuruçeşme Arena',
    'Vodafone Park',
    'Zorlu PSM',
    'Jolly Joker',
    'Bostancı Gösteri Merkezi',
    'IF Performance Hall',
    'KüçükÇiftlik Park',
    'Hayal Kahvesi',
    'Babylon',
    'Maximus',
    'Studio Live',
    'Ottoman Re:Public',
    'Şehir Tiyatrosu',
    'Sadri Alışık Tiyatrosu',
    'Harbiye Cemil Topuzlu Açık Hava Tiyatrosu',
    'İstanbul Kongre Merkezi',
    'Lütfi Kırdar Kongre Merkezi',
    'Atatürk Kültür Merkezi',
    'Cemal Reşit Rey Konser Salonu',
    'İstanbul Devlet Tiyatrosu'
  ]

  const handleVenueToggle = (venue) => {
    setSelectedVenues(prev => 
      prev.includes(venue) 
        ? prev.filter(v => v !== venue)
        : [...prev, venue]
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Tarih Filtresi */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <button
          onClick={() => setDateExpanded(!dateExpanded)}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#00b14f]" />
            <span className="font-semibold text-slate-900">Tarih</span>
          </div>
          {dateExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {dateExpanded && (
          <div className="mt-4 space-y-3">
            {dateOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="date"
                  value={option.value}
                  checked={selectedDate === option.value}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-4 h-4 accent-[#00b14f]"
                />
                <span className="text-sm text-slate-700">{option.label}</span>
              </label>
            ))}
            <div className="pt-2">
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Tarih Seç
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#00b14f] focus:outline-none focus:ring-1 focus:ring-[#00b14f]/20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Fiyat Aralığı */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-[#00b14f]" />
            <span className="font-semibold text-slate-900">Fiyat Aralığı</span>
          </div>
          {priceExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {priceExpanded && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>{priceRange.min.toLocaleString('tr-TR')} ₺</span>
              <span>{priceRange.max.toLocaleString('tr-TR')} ₺</span>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-green"
                  style={{
                    background: `linear-gradient(to right, #00b14f 0%, #00b14f ${(priceRange.min / 5000) * 100}%, #e2e8f0 ${(priceRange.min / 5000) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-green"
                  style={{
                    background: `linear-gradient(to right, #e2e8f0 0%, #e2e8f0 ${(priceRange.min / 5000) * 100}%, #00b14f ${(priceRange.min / 5000) * 100}%, #00b14f ${(priceRange.max / 5000) * 100}%, #e2e8f0 ${(priceRange.max / 5000) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#00b14f] focus:outline-none focus:ring-1 focus:ring-[#00b14f]/20"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 5000 }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#00b14f] focus:outline-none focus:ring-1 focus:ring-[#00b14f]/20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mekan Filtresi */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <button
          onClick={() => setVenueExpanded(!venueExpanded)}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#00b14f]" />
            <span className="font-semibold text-slate-900">Mekan</span>
          </div>
          {venueExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {venueExpanded && (
          <div className="mt-4">
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {venues.map(venue => (
                <label key={venue} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedVenues.includes(venue)}
                    onChange={() => handleVenueToggle(venue)}
                    className="w-4 h-4 accent-[#00b14f] flex-shrink-0"
                  />
                  <span className="text-sm text-slate-700">{venue}</span>
                </label>
              ))}
            </div>
            {selectedVenues.length > 0 && (
              <button
                onClick={() => setSelectedVenues([])}
                className="mt-3 text-xs text-[#00b14f] hover:text-[#009946] font-medium"
              >
                Seçimleri Temizle
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .slider-thumb-green::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #00b14f;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-thumb-green::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #00b14f;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default Sidebar
