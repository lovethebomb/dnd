import Head from 'next/head'
import TreasureSplitter from '../components/TreasureSplitter/TreasureSplitter'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Treasure Splitter - D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
