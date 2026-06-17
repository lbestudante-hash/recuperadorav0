'use client'

import { motion } from 'framer-motion'
import { Reveal } from './motion'

const testimonials = [
  {
    quote:
      'Atendimento técnico próximo, com orientação clara e suporte para manter a operação funcionando sem surpresas.',
    name: 'Jennifer Roberts',
    role: 'Diretora de Operações',
  },
  {
    quote:
      'Soluções alinhadas à rotina do cliente, com foco em segurança, produtividade e agilidade no dia a dia.',
    name: 'Jason Parker',
    role: 'Gerente de TI',
  },
  {
    quote:
      'Tecnologia aplicada para empresas, escolas e ambientes públicos que precisam de estabilidade real.',
    name: 'Ben Staates',
    role: 'Coordenador Administrativo',
  },
]

const easing = [0.22, 1, 0.36, 1] as const

export function Testimonials() {
  return (
    <section id="clientes" className="px-6 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Experiência, inovação e compromisso
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Confiança para quem depende da tecnologia todos os dias.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: easing, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8"
            >
              <blockquote className="text-lg leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
