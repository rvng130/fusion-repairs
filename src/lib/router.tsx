import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

/**
 * Tiny router. Uses clean URLs (/services) by default.
 * Build with VITE_HASH_ROUTER=1 to use #/services instead
 * (for hosts that can't rewrite unknown paths to index.html).
 */
const HASH = import.meta.env.VITE_HASH_ROUTER === '1'

function readPath(): { path: string; hash: string } {
  if (HASH) {
    const raw = window.location.hash.replace(/^#/, '') || '/'
    const [path, anchor] = raw.split('#')
    return { path: path || '/', hash: anchor ? `#${anchor}` : '' }
  }
  return { path: window.location.pathname.replace(/\/+$/, '') || '/', hash: window.location.hash }
}

export function hrefFor(to: string): string {
  return HASH ? `#${to}` : to
}

type Loc = { path: string; hash: string }
const RouterCtx = createContext<{ loc: Loc; navigate: (to: string) => void }>({
  loc: { path: '/', hash: '' },
  navigate: () => {},
})

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [loc, setLoc] = useState<Loc>(readPath)

  useEffect(() => {
    const onChange = () => setLoc(readPath())
    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  const navigate = (to: string) => {
    if (HASH) {
      window.location.hash = to
    } else {
      window.history.pushState({}, '', to)
      setLoc(readPath())
    }
  }

  return <RouterCtx.Provider value={{ loc, navigate }}>{children}</RouterCtx.Provider>
}

export const useRouter = () => useContext(RouterCtx)

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** Internal link. Plain <a> semantics, so keyboard + middle-click work. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  const { navigate, loc } = useRouter()
  const [pathPart] = to.split('#')
  const current = (pathPart || '/') === loc.path
  return (
    <a
      href={hrefFor(to)}
      aria-current={current && !to.includes('#') ? 'page' : undefined}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}
