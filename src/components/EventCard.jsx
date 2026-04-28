import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/useFavorites'

const formatPrice = (price, status) => {
  if (status === 'YAKINDA' || price === null) {
    return 'YAKINDA'
  }

  return `${price.toLocaleString('tr-TR')}₺`
}

const EventCard = ({ event }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(event.id)

  const handleFavoriteClick = (eventClick) => {
    eventClick.preventDefault()
    eventClick.stopPropagation()
    toggleFavorite(event.id)
  }

  return (
    <Link to={`/event/${event.id}`} className="group block">
      <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Heart Button - Top Right Corner */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white ${
              favorite ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
            }`}
            aria-label={favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            <Heart size={20} fill={favorite ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 mb-2 leading-tight">
            {event.title}
          </h3>
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-600">
              {event.date}
            </p>
            <p className="text-sm text-slate-500">
              {event.venue}
            </p>
          </div>
        </div>

        {/* Price Badge - Bottom Left Corner */}
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#00b14f] px-3 py-2 text-sm font-bold text-white rounded-tr-xl">
            {formatPrice(event.price, event.status)}
          </span>
        </div>
      </article>
    </Link>
  )
}

export default EventCard
