'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Cpu, Headset } from 'lucide-react'
import { NetworkBackground } from './network-background'

const easing = [0.22, 1, 0.36, 1] as const

const WHATSAPP_URL =
  'https://wa.me/5521981316123?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Recuperadora%20Tecnologia%20e%20gostaria%20de%20falar%20com%20um%20especialista.'

const pillars = [
  { icon: Headset, label: 'Suporte', desc: 'Help desk e atendimento remoto' },
  { icon: Cpu, label: 'Inovação', desc: 'IA, automação e software sob demanda' },
  { icon: ShieldCheck, label: 'Proteção', desc: 'Redes, servidores e dados seguros' },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden px-6 pt-40 pb-24 lg:px-8 lg:pt-48 lg:pb-32">
      {/* Layer 1 — living network of nodes and connections */}
      <div className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
        <NetworkBackground />
      </div>

      {/* Layer 2 — cinematic vignette adding depth around the edges */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(135% 100% at 50% 25%, transparent 45%, var(--background) 92%)',
        }}
      />

      {/* Layer 3 — focus halo: fades the network behind the headline for legibility */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(46% 36% at 50% 42%, color-mix(in oklch, var(--background) 58%, transparent), transparent 72%)',
        }}
      />

      {/* Layer 4 — brand accent glow */}
      <div className="accent-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          Empresa de Tecnologia da Informação
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.05 }}
          className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Tecnologia que mantém seu negócio sempre em operação.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Da inteligência artificial ao suporte técnico, a Recuperadora Tecnologia
          atende empresas, escolas e órgãos públicos com soluções seguras, rápidas
          e pensadas para o dia a dia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
          >
            Falar com especialista
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#servicos"
            className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-secondary sm:w-auto"
          >
            Ver serviços
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easing, delay: 0.4 }}
        className="mx-auto mt-20 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
      >
        {pillars.map((p) => (
          <div
            key={p.label}
            className="group flex flex-col gap-4 bg-card p-7 transition-colors duration-300 hover:bg-secondary"
          >
            <p.icon className="size-5 text-accent transition-transform duration-300 group-hover:scale-110" />
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {p.label}
              </p>
              <p className="mt-1.5 text-base font-medium leading-snug text-foreground">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
