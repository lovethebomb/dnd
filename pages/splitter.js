import Head from 'next/head'
import Link from 'next/link'
import TreasureSplitter from '../components/TreasureSplitter/TreasureSplitter'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Treasure Splitter - D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a className="link">← Back to D&D Tools</a>
        </Link>
        <h1 className="title">
          Treasure Splitter
        </h1>

        <div className="grid">
          <TreasureSplitter />
        </div>
      </main>
    </div>
  )
}
