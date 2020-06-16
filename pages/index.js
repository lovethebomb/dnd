import Head from 'next/head'
import Link from 'next/link'

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
          <a href="/splitter" className="card">
            <h3>Treasure Splitter &rarr;</h3>
            <p>Split the loot between your party.</p>
          </a>
          <a href="/radio" className="card">
            <h3>Radio &rarr;</h3>
            <p>Stream all these bards tunes.</p>
          </a>
          <a href="/search" className="card disabled">
            <h3>Search Tool &rarr;</h3>
            <p>Quick search through D&D APIs.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
