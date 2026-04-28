import { useContext } from 'react'
import { FilterContext } from './filterStore'

export const useFilters = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilters must be used within FilterProvider')
  }

  return context
}
