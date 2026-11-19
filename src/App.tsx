import { useEffect, useRef } from 'react'
import { RouterProvider, useRouter } from './lib/router'
import { Layout } from './components/Layout'
import { PreviewProvider } from './components/TextButton'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { About, Contact, HowItWorks, NotFound } from './pages/Other'

const ROUTES: Record<string, () => React.ReactElement> = {
  '/': Home,
  '/services': Services,
  '/how-it-works': HowItWorks,
  '/about': About,
  '/contact': Contact,
}

function Routes() {
  const { loc } = useRouter()
  const first = useRef(true)
  const Page = ROUTES[loc.path] ?? NotFound

  // On navigation: jump to anchor or top, and move focus to the page heading
  useEffect(() => {
    const anchor = loc.hash ? document.getElementById(decodeURIComponent(loc.hash.slice(1))) : null
    if (anchor) {
      anchor.scrollIntoView({ block: 'start' })
      anchor.setAttribute('tabindex', '-1')
      anchor.focus({ preventScroll: true })
    } else {
      window.scrollTo(0, 0)
      if (!first.current) document.querySelector<HTMLElement>('main h1')?.setAttribute('tabindex', '-1')
      if (!first.current) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
    first.current = false
  }, [loc.path, loc.hash])

  return <Page />
}

export default function App() {
  return (
    <RouterProvider>
      <PreviewProvider>
        <Layout>
          <Routes />
        </Layout>
      </PreviewProvider>
    </RouterProvider>
  )
}
