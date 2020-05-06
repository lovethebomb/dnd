import Head from 'next/head'
import TreasureSplitter from '../components/TreasureSplitter'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          D&D Tools & Stuff
        </h1>

        <div className="grid">
          <TreasureSplitter />
        </div>
      </main>
    </div>
  )
}
