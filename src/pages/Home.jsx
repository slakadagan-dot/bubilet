import EventCard from '../components/EventCard'
import { mockEvents } from '../data/mockData'

const Home = () => {
  return (
    <div className="w-full space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00b14f] via-[#00c15a] to-[#00a047] px-6 py-10 text-white shadow-lg md:px-12 md:py-14">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider">
            BUBILET OZEL
          </span>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            2026 YILINDA KACIRMAMAN GEREKEN KONSERLER
          </h1>
          <p className="max-w-xl text-sm text-white/90 md:text-base">
            Sehrin en cok beklenen konserleri, tiyatro oyunlari ve festival
            biletleri tek yerde. Simdi kesfet, yerini kap.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900">
            One Cikan Etkinlikler
          </h2>
        </div>

        <div className="hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
          {mockEvents.map((event) => (
            <div key={`mobile-${event.id}`} className="w-[80%] min-w-[260px] flex-none">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
