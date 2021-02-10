import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as Fathom from 'fathom-client'
import { ModalProvider } from 'react-modal-hook';

import { DarkModeProvider } from '../components/context/DarkModeContext'

import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function Application({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('AWEBH', {
      url: 'https://fathom.ilotreseau.net/tracker.js',
      includedDomains: ['dnd.lucas.computer'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <DarkModeProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </DarkModeProvider>
  )
}
