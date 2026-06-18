import { Footer } from './footer'
import { Header } from './header'

export function LegalPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="bg-slate-50 pb-24 pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black tracking-tight text-[#07111f]">
            {title}
          </h1>
          <div className="mt-8 space-y-5 rounded-[2rem] border border-slate-200 bg-white p-7 text-lg leading-8 text-slate-700">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

