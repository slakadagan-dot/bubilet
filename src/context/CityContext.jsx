import { createContext, useContext, useMemo, useState } from 'react'

const CityContext = createContext(null)

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler')
  const [cityEvents, setCityEvents] = useState([])

  const value = useMemo(
    () => ({
      selectedCity,
      setSelectedCity,
      cityEvents,
      setCityEvents,
    }),
    [selectedCity, cityEvents],
  )

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>
}

export const useCity = () => {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}
