import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, loginMessage, isLoading, clearLoginMessage } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      // Redirect to home after successful login
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  const handleToastClose = () => {
    clearLoginMessage()
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
      <div className="flex flex-col justify-between bg-slate-100 p-8 md:p-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00b14f]">Bubilet</p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Henüz hesabın yok mu?
          </h1>
          <p className="text-sm text-slate-600">
            Hemen ücretsiz üye ol, favorilerini kaydet ve etkinlikleri kolayca takip et.
          </p>
        </div>
        <Link
          to="/register"
          className="mt-8 inline-flex w-fit rounded-xl bg-[#00b14f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#009946]"
        >
          Üye Ol
        </Link>
      </div>

      <div className="p-8 md:p-12">
        <h2 className="text-2xl font-extrabold text-slate-900">Giriş Yap</h2>
        
        {/* Success/Error Toast */}
        {loginMessage && (
          <div className={`mt-4 flex items-center gap-3 p-4 rounded-xl animate-in fade-in slide-in-from-top-1 ${
            loginMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {loginMessage.type === 'success' ? (
              <CheckCircle size={20} className="flex-shrink-0" />
            ) : (
              <XCircle size={20} className="flex-shrink-0" />
            )}
            <div className="flex-grow">
              <p className="font-semibold">{loginMessage.message}</p>
              {loginMessage.type === 'success' && (
                <p className="text-sm opacity-75 mt-1">Yönlendiriliyorsunuz...</p>
              )}
            </div>
            <button
              onClick={handleToastClose}
              className="flex-shrink-0 ml-2 text-current/60 hover:text-current"
            >
              <XCircle size={16} />
            </button>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700" htmlFor="login-email">
              E-posta
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@mail.com"
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700" htmlFor="login-password">
              Şifre
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00b14f] focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.password}
            className="w-full rounded-xl bg-[#00b14f] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#009946] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Giriş Yapılıyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Test hesapları için:
          </p>
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <p>sila.kadagan@example.com / 123456</p>
            <p>mehmet.demir@example.com / 123456</p>
            <p>ayse.yilmaz@example.com / 123456</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
