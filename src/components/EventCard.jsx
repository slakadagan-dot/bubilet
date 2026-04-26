import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const formatPrice = (price, status) => {
  if (status === 'YAKINDA' || price === null) {
    return 'YAKINDA'
  }

  return `${price.toLocaleString('tr-TR')}₺`
}

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-72 w-full object-cover object-center"
            loading="lazy"
          />
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-[#00b14f]"
            aria-label="Favorilere ekle"
          >
            <Heart size={18} />
          </button>
        </div>

        <div className="space-y-2 p-4 pb-14">
          <h3 className="line-clamp-2 text-base font-bold text-slate-900">{event.title}</h3>
          <p className="text-sm text-slate-500">
            {event.date} - {event.venue}
          </p>
        </div>

        <span className="absolute bottom-0 left-0 rounded-tr-xl bg-[#00b14f] px-4 py-2 text-sm font-bold tracking-wide text-white">
          {formatPrice(event.price, event.status)}
        </span>
      </article>
    </Link>
  )
}

export default EventCard
