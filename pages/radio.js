import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ReactAudioPlayer from 'react-audio-player';
const RADIO_STATUS = "https://radio.lucas.computer:27060"
const RADIO_URL = "https://radio.lucas.computer:27060/live"

const Radio = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const fetchRadioStatus = async () => {
      try {
        const request = await fetch(RADIO_STATUS)
        setIsOnline(request.ok)
      } catch {
        setIsOnline(false)
      }
    }
    fetchRadioStatus()
  }, []);


  if (!isOnline) {
    return (<p>The bard is taking a long rest 💤</p>)
  }
  return (
    <ReactAudioPlayer controls autoPlay volume={0.5} src={RADIO_URL} />
  )
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Radio - D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a className="link">← Back to D&D Tools</a>
        </Link>
        <h1 className="title">
          Radio
        </h1>

        <div className="grid">
          <div>
            <Radio />
          </div>
        </div>
      </main>
    </div>
  )
}
