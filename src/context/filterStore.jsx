import { createContext, useState, useContext } from 'react'

export const FilterContext = createContext(null)

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TRENDLER')
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler')
  const [sortBy, setSortBy] = useState('dateAsc')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedVenues, setSelectedVenues] = useState([])
  const [selectedDate, setSelectedDate] = useState('')

  const value = {
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
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}
