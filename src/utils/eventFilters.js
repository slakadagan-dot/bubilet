const MONTHS = {
  ocak: 0,
  subat: 1,
  mart: 2,
  nisan: 3,
  mayis: 4,
  haziran: 5,
  temmuz: 6,
  agustos: 7,
  eylul: 8,
  ekim: 9,
  kasim: 10,
  aralik: 11,
}

const normalizeText = (text) =>
  (text || '')
    .toString()
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const parseEventDate = (dateText) => {
  if (!dateText || normalizeText(dateText) === 'yakinda') {
    return Number.POSITIVE_INFINITY
  }

  const match = normalizeText(dateText).match(
    /(\d{1,2})\s+([a-z]+)\s+(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/,
  )

  if (!match) {
    return Number.POSITIVE_INFINITY
  }

  const [, day, monthName, year, hour = '00', minute = '00'] = match
  const month = MONTHS[monthName]

  if (month === undefined) {
    return Number.POSITIVE_INFINITY
  }

  return new Date(
    Number(year),
    month,
    Number(day),
    Number(hour),
    Number(minute),
  ).getTime()
}

const sortEvents = (events, sortBy) => {
  if (sortBy === 'priceAsc') {
    return [...events].sort((a, b) => {
      const aPrice = a.price ?? Number.POSITIVE_INFINITY
      const bPrice = b.price ?? Number.POSITIVE_INFINITY
      return aPrice - bPrice
    })
  }

  if (sortBy === 'priceDesc') {
    return [...events].sort((a, b) => {
      const aPrice = a.price ?? Number.NEGATIVE_INFINITY
      const bPrice = b.price ?? Number.NEGATIVE_INFINITY
      return bPrice - aPrice
    })
  }

  if (sortBy === 'dateAsc') {
    return [...events].sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date))
  }

  return events
}

export const getVisibleEvents = ({
  events,
  searchQuery,
  selectedCategory,
  selectedCity,
  sortBy,
}) => {
  const normalizedQuery = normalizeText(searchQuery).trim()
  const normalizedCategory = normalizeText(selectedCategory)
  const normalizedCity = normalizeText(selectedCity)

  const filtered = events.filter((event) => {
    // Category matching - TRENDLER acts as "All Categories" bypass
    const matchesCategory = 
      selectedCategory === 'TRENDLER' || 
      event.category.toLowerCase() === selectedCategory.toLowerCase()

    // City matching - handle "Tüm Şehirler" as wildcard
    const matchesCity = 
      selectedCity === 'Tüm Şehirler' || 
      event.city === selectedCity

    // Search matching
    const matchesSearch =
      !searchQuery.trim() ||
      [event.title, event.venue, event.category].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesCategory && matchesCity && matchesSearch
  })

  return sortEvents(filtered, sortBy)
}
