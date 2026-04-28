import { Heart } from 'lucide-react'
import EventCard from '../components/EventCard'
import { useFavorites } from '../context/useFavorites'
import { mockEvents } from '../data/mockData'

const Favorites = () => {
  const { favoriteIds } = useFavorites()
  const favoriteEvents = mockEvents.filter((event) => favoriteIds.includes(event.id))

  return (
    <section className="w-full space-y-5">
      <h1 className="text-3xl font-bold text-slate-900">Favorilerim</h1>

      {favoriteEvents.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Heart size={38} className="mx-auto text-slate-400" />
            <p className="mt-4 text-base font-semibold text-slate-700">
              Henüz favori etkinliğiniz bulunmuyor
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {favoriteEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites
