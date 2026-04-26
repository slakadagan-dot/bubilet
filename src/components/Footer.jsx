const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row">
        <p>© {new Date().getFullYear()} Bubilet. Tum haklari saklidir.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="transition hover:text-fuchsia-600">
            Gizlilik
          </a>
          <a href="#" className="transition hover:text-fuchsia-600">
            Iletisim
          </a>
          <a href="#" className="transition hover:text-fuchsia-600">
            Yardim
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
