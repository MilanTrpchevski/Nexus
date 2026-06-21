import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageview } from './analytics'

// React Router doesn't trigger full page loads, so GA never sees
// route changes (/en -> /mk, /en -> /en/privacy, etc.) unless we
// tell it to explicitly. This component does exactly that — render
// it once anywhere inside <BrowserRouter>.
export default function PageviewTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageview(location.pathname)
  }, [location.pathname])

  return null
}
