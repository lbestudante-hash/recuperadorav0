export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
            R
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Recuperadora Tecnologia
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Soluções em TI &middot; &copy; {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
