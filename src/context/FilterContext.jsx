import { useMemo, useState } from 'react'
import { FilterContext } from './filterStore'

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TRENDLER')
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler')
  const [sortBy, setSortBy] = useState('default')

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
    }),
    [searchQuery, selectedCategory, selectedCity, sortBy],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
