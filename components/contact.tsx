'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail } from 'lucide-react'
import { Reveal } from './motion'

const WHATSAPP_URL =
  'https://wa.me/5521981316123?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Recuperadora%20Tecnologia%20e%20gostaria%20de%20solicitar%20atendimento.'
const EMAIL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=comercial@recuperadorainformatica.com.br&su=Solicita%C3%A7%C3%A3o%20de%20atendimento'

export function Contact() {
  return (
    <section id="contato" className="px-6 py-28 lg:px-8 lg:py-36">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16 lg:p-20">
          <div className="accent-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Contato
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Seu HD está cheio? A rede está lenta? O sistema parou?
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                Fale com a Recuperadora Tecnologia para suporte, manutenção,
                recuperação, automação ou implantação de novas soluções em TI.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" />
                Chamar no WhatsApp
              </a>
              <a
                href={EMAIL_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
              >
                <Mail className="size-4" />
                Enviar e-mail
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Atendimento comercial para suporte, manutenção e soluções em TI.
              </p>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
