'use client'

import { motion } from 'framer-motion'
import { Sparkles, Landmark, GraduationCap, Building2 } from 'lucide-react'

const areas = [
  { icon: Sparkles, label: 'Inteligência Artificial' },
  { icon: Landmark, label: 'Órgãos Públicos' },
  { icon: GraduationCap, label: 'Escolas' },
  { icon: Building2, label: 'Empresas' },
]

export function FocusStrip() {
  return (
    <section className="border-y border-border px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          Atendimento especializado para diferentes setores
        </p>
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 md:w-auto md:gap-x-12">
          {areas.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-center gap-2.5"
            >
              <a.icon className="size-4 shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
