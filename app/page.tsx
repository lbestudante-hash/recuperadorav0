import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FocusStrip } from '@/components/focus-strip'
import { Services } from '@/components/services'
import { Method } from '@/components/method'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FocusStrip />
        <Services />
        <Method />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
