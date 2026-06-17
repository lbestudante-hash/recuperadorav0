'use client'

import { motion } from 'framer-motion'
import { Reveal } from './motion'

const steps = [
  {
    n: '01',
    title: 'Análise do ambiente',
    desc: 'Identificamos riscos, gargalos, equipamentos e sistemas críticos da sua operação.',
  },
  {
    n: '02',
    title: 'Suporte inteligente',
    desc: 'Resolução remota ou presencial, com foco em velocidade, clareza e mínima interrupção.',
  },
  {
    n: '03',
    title: 'Evolução contínua',
    desc: 'Manutenção, segurança, automações e melhorias conforme o seu negócio cresce.',
  },
]

const easing = [0.22, 1, 0.36, 1] as const

export function Method() {
  return (
    <section id="metodo" className="border-t border-border px-6 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Prevenção é tecnologia bem aplicada
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Manutenção não é gasto. É prevenção.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Muitos problemas deixam computadores lentos, redes instáveis e sistemas
            inseguros. A Recuperadora atua para antecipar falhas, corrigir gargalos
            e manter a estrutura pronta para trabalhar.
          </p>
        </Reveal>

        <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: easing, delay: i * 0.1 }}
              className="group flex items-start gap-6 bg-card p-8 transition-colors duration-300 hover:bg-secondary"
            >
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
