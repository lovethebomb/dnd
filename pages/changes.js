import fs from 'fs';
import { join } from 'path';

import Head from 'next/head'
import Link from 'next/link'

import remark from 'remark'
import html from 'remark-html'

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()

}

const Changes = ({ changelog }) => {
  return (
    <div className="container">
      <Head>
        <title>Changes - D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a className="link">← Back to D&D Tools</a>
        </Link>

        <div
          dangerouslySetInnerHTML={{ __html: changelog }}
        />
        <span id="latest"></span>
      </main>
    </div>
  )
}

export default Changes

export async function getStaticProps({ params }) {
  const changelogFile = join(process.cwd(), 'CHANGELOG.md')
  const changelog = fs.readFileSync(changelogFile, 'utf8');
  const content = await markdownToHtml(changelog || '')

  return {
    props: {
      changelog: content
    },
  }
}
