import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { register, loginMessage, isLoading, clearLoginMessage } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    termsAccepted: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.termsAccepted) {
      return
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    }

    const result = await register(userData)
    
    if (result.success) {
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
      <div className="flex flex-col justify-between bg-slate-100 p-8 md:p-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00b14f]">Bubilet</p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Zaten bir hesabın var mı?
          </h1>
          <p className="text-sm text-slate-600">
            Giriş yaparak biletlerine ve favorilerine hemen ulaşabilirsin.
          </p>
        </div>
        <Link
          to="/login"
          className="mt-8 inline-flex w-fit rounded-xl bg-[#00b14f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#009946]"
        >
          Giriş Yap
        </Link>
      </div>

      <div className="p-8 md:p-12">
        <h2 className="text-2xl font-extrabold text-slate-900">Üye Ol</h2>
        
        {/* Success/Error Messages */}
        {loginMessage && (
          <div className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold animate-in fade-in slide-in-from-top-1 ${
            loginMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {loginMessage.type === 'success' ? 
              <CheckCircle size={18} /> : 
              <XCircle size={18} />
            }
            {loginMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="firstName">
                Ad
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ad"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="lastName">
                Soyad
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Soyad"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700" htmlFor="phone">
              Telefon Numarası
            </label>
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
                <span className="text-base" aria-hidden="true">
                  🇹🇷
                </span>
                +90
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="5XX XXX XX XX"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-start gap-2 text-xs text-slate-600">
              <input 
                type="checkbox" 
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required 
                className="mt-0.5 h-4 w-4 accent-[#00b14f]" 
              />
              Aydınlatma metnini okudum ve kabul ediyorum.
            </label>
            <label className="flex items-start gap-2 text-xs text-slate-600">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#00b14f]" />
              Açık rıza beyanını onaylıyorum.
            </label>
            <label className="flex items-start gap-2 text-xs text-slate-600">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#00b14f]" />
              Elektronik ileti gönderilmesini kabul ediyorum.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#00b14f] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#009946] disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isLoading ? 'Kaydediliyor...' : 'Üye Ol'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
