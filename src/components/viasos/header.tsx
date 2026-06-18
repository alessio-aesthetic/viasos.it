'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { site } from '@/data/site'
import { Brand } from './brand'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" aria-label="Home ViaSOS">
          <Brand />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[#075e54]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#assistenza"
            className="hidden rounded-full bg-[#07111f] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-[#123456] sm:inline-flex"
          >
            Trova un carroattrezzi
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm lg:hidden"
            aria-label="Apri menu"
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-slate-950/25" />
        <DialogPanel className="fixed inset-x-3 top-3 z-50 rounded-3xl bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-xl bg-slate-100"
              aria-label="Chiudi menu"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="mt-6 grid gap-2">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-bold text-slate-800 hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#assistenza"
            onClick={() => setOpen(false)}
            className="mt-5 flex justify-center rounded-2xl bg-[#25d366] px-5 py-4 text-base font-black text-[#07111f]"
          >
            Trova un carroattrezzi
          </a>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

