import '../styles.css'
import { ModalProvider } from "react-modal-hook";

// This default export is required in a new `pages/_app.js` file.
export default function Application({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  )
}
