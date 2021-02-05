import '../styles.css'
import { DarkModeProvider } from '../components/context/DarkModeContext'
import { ModalProvider } from "react-modal-hook";

// This default export is required in a new `pages/_app.js` file.
export default function Application({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </DarkModeProvider>
  )
}
