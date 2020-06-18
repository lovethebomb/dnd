import Head from 'next/head'
import Link from 'next/link'
import ReactAudioPlayer from 'react-audio-player';

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
            <ReactAudioPlayer controls autoPlay volume="0.5" src="https://radio.lucas.computer:27060/live" />
          </div>
        </div>
      </main>
    </div>
  )
}
