import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Checkout from './pages/Checkout'
import { FilterProvider } from './context/FilterContext'
import { AuthProvider } from './context/AuthContext'
import EventDetail from './pages/EventDetail'
import Events from './pages/Events'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SeatMap from './pages/SeatMap'
import TicketSelection from './pages/TicketSelection'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <FilterProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="events" element={<Events />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="event/:id" element={<EventDetail />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="seans/:id/bilet/:categoryId" element={<TicketSelection />} />
                  <Route path="seans/:id/koltuk/:categoryId" element={<SeatMap />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </FilterProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
