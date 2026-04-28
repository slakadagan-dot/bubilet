import { useMemo, useState } from 'react'
import { FilterContext } from './filterStore.jsx'

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TRENDLER')
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler')
  const [sortBy, setSortBy] = useState('dateAsc')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedVenues, setSelectedVenues] = useState([])
  const [selectedDate, setSelectedDate] = useState('')

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedCity,
      setSelectedCity,
      sortBy,
      setSortBy,
      priceRange,
      setPriceRange,
      selectedVenues,
      setSelectedVenues,
      selectedDate,
      setSelectedDate,
    }),
    [searchQuery, selectedCategory, selectedCity, sortBy, priceRange, selectedVenues, selectedDate],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
