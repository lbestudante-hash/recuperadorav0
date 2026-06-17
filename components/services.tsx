'use client'

import { motion } from 'framer-motion'
import { Code2, LifeBuoy, BrainCircuit, Server } from 'lucide-react'
import { Reveal } from './motion'

const services = [
  {
    icon: Code2,
    title: 'Software empresarial',
    desc: 'Sistemas, automação comercial, PDV, rotinas administrativas e ferramentas digitais para melhorar processos.',
  },
  {
    icon: LifeBuoy,
    title: 'Suporte técnico e help desk',
    desc: 'Atendimento remoto e presencial para resolver lentidão, falhas, acessos, impressoras, softwares e rotina técnica.',
  },
  {
    icon: BrainCircuit,
    title: 'IA e desenvolvimento',
    desc: 'Soluções digitais, automações e recursos com inteligência artificial para tornar a operação mais eficiente.',
  },
  {
    icon: Server,
    title: 'Dados e infraestrutura',
    desc: 'Redes, servidores, backups, virtualização, recuperação de dados e prevenção contra paradas.',
  },
]

const easing = [0.22, 1, 0.36, 1] as const

export function Services() {
  return (
    <section id="servicos" className="px-6 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Soluções em tecnologia
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Para proteger, conectar e acelerar sua operação.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: easing, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-accent/40"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-border bg-secondary text-accent transition-colors duration-300 group-hover:border-accent/40">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-6 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
