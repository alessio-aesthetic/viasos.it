'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const topics = [
  {
    label: 'Trova il soccorso',
    subtitle: 'Posizione e contatti',
    indices: [0, 2, 3, 6],
  },
  {
    label: 'Organizza il recupero',
    subtitle: 'Tempi, costi e veicoli',
    indices: [1, 4, 7, 9],
  },
  {
    label: 'Usa ViaSOS',
    subtitle: 'Servizio e disponibilità',
    indices: [5, 8, 10, 11],
  },
]

export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  const [active, setActive] = useState(0)
  return (
    <div className="rx-faq-workspace">
      <div
        className="rx-faq-tabs"
        role="tablist"
        aria-label="Argomenti delle domande frequenti"
      >
        {topics.map((topic, index) => (
          <button
            id={`faq-tab-${index}`}
            key={topic.label}
            role="tab"
            aria-selected={active === index}
            aria-controls={`faq-group-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault()
                const next = (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3
                setActive(next)
                document.getElementById(`faq-tab-${next}`)?.focus()
              }
            }}
          >
            <span>0{index + 1}</span>
            <div>
              <strong>{topic.label}</strong>
              <small>{topic.subtitle}</small>
            </div>
            <ArrowRightIcon aria-hidden="true" />
          </button>
        ))}
      </div>
      {topics.map((topic, index) => (
        <div
          key={topic.label}
          id={`faq-group-${index}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${index}`}
          hidden={active !== index}
          className="rx-faq-group"
        >
          {topic.indices
            .filter((i) => items[i])
            .map((i, n) => (
              <Disclosure
                key={items[i].question}
                as="div"
                className="rx-faq-item"
              >
                <DisclosureButton className="rx-faq-question">
                  <span className="rx-faq-number">0{n + 1}</span>
                  <span>{items[i].question}</span>
                  <span className="rx-faq-plus">
                    <PlusIcon aria-hidden="true" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel transition className="rx-faq-answer">
                  <div>
                    <p>{items[i].answer}</p>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
        </div>
      ))}
    </div>
  )
}
