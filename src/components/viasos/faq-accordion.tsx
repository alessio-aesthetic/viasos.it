'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  return (
    <div className="mt-10 divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white">
      {items.map((item) => (
        <Disclosure key={item.question}>
          <DisclosureButton className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7">
            <span className="text-base font-black text-[#07111f] sm:text-lg">
              {item.question}
            </span>
            <ChevronDownIcon className="size-5 shrink-0 text-slate-500 transition group-data-open:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="px-5 pb-6 text-base leading-7 text-slate-700 sm:px-7">
            {item.answer}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}

