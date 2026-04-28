import { MessageSquareText, Settings, Star, Ticket, User, UserRoundPen, Calendar, MapPin, ChevronRight, Activity, Heart, Phone, Mail, Lock, Bell, Shield, Globe, CreditCard, LogOut, Edit, Plus, Search, AlertCircle, X, Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/useFavorites'
import EventCard from '../components/EventCard'
import { mockEvents } from '../data/mockData'

const tabs = [
  { key: 'profil', label: 'Profil', icon: User },
  { key: 'bilgilerim', label: 'Bilgilerim', icon: UserRoundPen },
  { key: 'biletlerim', label: 'Biletlerim', icon: Ticket },
  { key: 'favorilerim', label: 'Favorilerim', icon: Heart },
  { key: 'degerlendirmelerim', label: 'Değerlendirmelerim', icon: Star },
  { key: 'ade_taleplerim', label: 'İade Taleplerim', icon: AlertCircle },
  { key: 'ayarlar', label: 'Ayarlar', icon: Settings },
]

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryTab = searchParams.get('tab')
  const activeTab = tabs.some((tab) => tab.key === queryTab) ? queryTab : 'profil'

  const { purchasedTickets } = useCart()
  const { user, logout } = useAuth()
  const { favoriteIds } = useFavorites()
  const { cancelTicket } = useCart()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    gender: user?.gender || '',
    city: user?.city || '',
    address: user?.address || ''
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newsletter: true,
    twoFactorAuth: false,
    privateProfile: true
  })

  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.key === activeTab) || tabs[0],
    [activeTab],
  )

  const handleTabChange = (tabKey) => {
    setSearchParams({ tab: tabKey })
  }

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Profil Bilgilerim</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Edit size={16} />
          {isEditing ? 'İptal' : 'Düzenle'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00b14f] to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {formData.firstName[0]}{formData.lastName[0]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{formData.firstName} {formData.lastName}</h3>
            <p className="text-slate-600">{formData.email}</p>
            <p className="text-sm text-slate-500 mt-1">Üye since: Ocak 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ad</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleFormChange('firstName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Soyad</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleFormChange('lastName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderBilgilerimTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Kişisel Bilgilerim</h2>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">İletişim Bilgileri</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              E-posta Adresi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">🇹🇷</span>
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone size={16} className="inline mr-2" />
              Telefon Numarası
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">🇹🇷</span>
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Kişisel Bilgiler</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Doğum Tarihi</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleFormChange('birthDate', e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cinsiyet</label>
            <select
              value={formData.gender}
              onChange={(e) => handleFormChange('gender', e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
              <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Adres</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-[#00b14f] text-white rounded-lg font-medium hover:bg-[#009946] transition-colors">
          Bilgileri Kaydet
        </button>
      </div>
    </div>
  )

  const renderBiletlerimTab = () => {
    const activeTickets = purchasedTickets.filter(ticket => ticket.status !== 'refunded')
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Biletlerim</h2>
        </div>

        {activeTickets.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-[#00b14f] rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity size={20} className="text-[#00b14f]"/>
                Aktif Etkinlikler
              </h3>
            </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeTickets.map(order => (
                <div key={order.id} className="group flex flex-col sm:flex-row border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#00b14f]/50 transition-all bg-white">
                  <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                    <img src={order.event.imageUrl} alt={order.event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-black tracking-wider text-slate-900">
                      {order.event.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">{order.event.title}</h3>
                      </div>
                    
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#00b14f]"><Calendar size={12}/></div>
                          {order.event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#00b14f]"><MapPin size={12}/></div>
                          <span className="line-clamp-1">{order.event.venue}</span>
                        </div>
                      </div>
                    
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Seçilen Biletler</p>
                        <p className="text-sm font-bold text-slate-800">
                          {order.selectedTickets?.map(t => `${t.quantity}x ${t.name}`).join(', ') || order.selectedSeats?.join(', ')}
                        </p>
                      </div>
                    </div>
                  
                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-bold bg-emerald-50 text-[#00b14f] border border-emerald-100 px-2 py-1 rounded-md">PNR: {order.id.toUpperCase()}</span>
                      <Link to={`/event/${order.event.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#00b14f] hover:text-[#009946]">
                        Detaylar <ChevronRight size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Bu bileti iptal etmek istediğinize emin misiniz?')) {
                            cancelTicket(order.id)
                          }
                        }}
                        className="ml-4 inline-flex items-center gap-2 rounded-lg border border-red-200 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-50 transition-colors"
                      >
                        <AlertCircle size={16} />
                        İade Talebi Oluştur
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center p-6">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Ticket size={32} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Henüz Biletiniz Bulunmuyor</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">Satın aldığınız biletler burada görünecektir. Etkinlikleri keşfederek bilet satın alabilirsiniz.</p>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b14f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#009946] shadow-md shadow-emerald-500/20"
            >
              <Search size={18} />
              Etkinlikleri Keşfet
            </Link>
          </div>
        )}
      </div>
    )
  }

  const renderFavorilerimTab = () => {
    const favoriteEvents = mockEvents.filter(event => favoriteIds.includes(event.id))
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Favori Etkinliklerim</h2>
          <span className="text-sm text-slate-500">{favoriteEvents.length} favori etkinlik</span>
        </div>
        
        {favoriteEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favoriteEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center p-6">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Heart size={32} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Henüz Favori Etkinliğiniz Bulunmuyor</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">Beğendiğiniz etkinlikleri favorilerinize ekleyerek kolayca erişebilirsiniz.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b14f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#009946] shadow-md shadow-emerald-500/20"
            >
              <Plus size={18} />
              Etkinliklere Göz At
            </Link>
          </div>
        )}
      </div>
    )
  }

  const renderAdeTaleplerimTab = () => {
    const refundedTickets = purchasedTickets.filter(ticket => ticket.status === 'refunded')
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">İade Taleplerim</h2>
          <span className="text-sm text-slate-500">{refundedTickets.length} iade talebi</span>
        </div>
        
        {refundedTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {refundedTickets.map(order => (
              <div key={order.id} className="group flex flex-col sm:flex-row border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300/50 transition-all bg-white">
                <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                  <img src={order.event.imageUrl} alt={order.event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-black tracking-wider text-slate-900">
                    {order.event.category.toUpperCase()}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">{order.event.title}</h3>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#00b14f]"><Calendar size={12}/></div>
                        {order.event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#00b14f]"><MapPin size={12}/></div>
                        <span className="line-clamp-1">{order.event.venue}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Seçilen Biletler</p>
                      <p className="text-sm font-bold text-slate-800">
                        {order.selectedTickets?.map(t => `${t.quantity}x ${t.name}`).join(', ') || order.selectedSeats?.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold bg-emerald-50 text-[#00b14f] border border-emerald-100 px-2 py-1 rounded-md">PNR: {order.id.toUpperCase()}</span>
                    <Link to={`/event/${order.event.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#00b14f] hover:text-[#009946]">
                      Detaylar <ChevronRight size={16} />
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1">
                      <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        <Check size={12} className="text-green-600" />
                      </span>
                      <span className="text-xs text-gray-600">İade Edildi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center p-6">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Henüz İade Talebiniz Bulunmuyor</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">İade talebiniz bulunmamaktadır. Aktif biletleriniz için 'Biletlerim' sekmesini kontrol edin.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b14f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#009946] shadow-md shadow-emerald-500/20"
            >
              <Search size={18} />
              Etkinliklere Göz At
            </Link>
          </div>
        )}
      </div>
    )
  }

  const renderDegerlendirmelerimTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Değerlendirmelerim</h2>
      
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center p-6">
        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
          <Star size={32} className="text-slate-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Henüz Değerlendirme Yapmadınız</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">Katıldığınız etkinlikleri değerlendirerek diğer kullanıcılara yardımcı olabilirsiniz.</p>
        <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#00b14f] hover:text-[#00b14f] shadow-sm">
          <MessageSquareText size={18} />
          İlk Değerlendirmeyi Yap
        </button>
      </div>
    </div>
  )

  const renderAyarlarTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Ayarlar</h2>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Bildirim Ayarları</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">E-posta Bildirimler</span>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-slate-300"
            >
              <div className={`absolute inset-0 h-6 w-11 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-[#00b14f]' : 'bg-slate-300'
              }`}>
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
              </div>
            </button>
          </label>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">SMS Bildirimleri</p>
                <p className="text-sm text-slate-600">Önemli güncellemeler için SMS alın</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingToggle('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.smsNotifications ? 'bg-[#00b14f]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">Push Bildirimleri</p>
                <p className="text-sm text-slate-600">Tarayıcı bildirimlerini etkinleştir</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingToggle('pushNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-[#00b14f]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Gizlilik ve Güvenlik</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">İki Faktörlü Kimlik Doğrulama</p>
                <p className="text-sm text-slate-600">Hesabınızı ekstra güvenlik ile koruyun</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingToggle('twoFactorAuth')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-[#00b14f]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">Özel Profil</p>
                <p className="text-sm text-slate-600">Profilinizi herkese açık yapın</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingToggle('privateProfile')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.privateProfile ? 'bg-[#00b14f]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privateProfile ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Hesap Yönetimi</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-slate-600" />
              <span className="font-medium text-slate-900">Ödeme Yöntemleri</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-slate-600" />
              <span className="font-medium text-slate-900">Dil ve Bölge Ayarları</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-red-600" />
              <span className="font-medium text-red-600">Çıkış Yap</span>
            </div>
            <ChevronRight size={20} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profil':
        return renderProfileTab()
      case 'bilgilerim':
        return renderBilgilerimTab()
      case 'biletlerim':
        return renderBiletlerimTab()
      case 'favorilerim':
        return renderFavorilerimTab()
      case 'degerlendirmelerim':
        return renderDegerlendirmelerimTab()
      case 'ade_taleplerim':
        return renderAdeTaleplerimTab()
      case 'ayarlar':
        return renderAyarlarTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Hesabım</h1>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Horizontal Tabs Navigation */}
          <div className="border-b border-slate-200">
            <div className="flex items-center px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <button
                    type="button"
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all relative ${
                      isActive
                        ? 'text-[#00b14f] border-b-2 border-[#00b14f]'
                        : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
