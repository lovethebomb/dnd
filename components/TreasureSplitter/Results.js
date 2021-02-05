import { useState } from 'react'
import useClipboard from 'react-use-clipboard';


import useCurrency from './hooks/useCurrency'
import useParty from './hooks/useParty'
import useTreasure from './hooks/useTreasure'

import PartyMemberIcon from './PartyMemberIcon'
import { TreasureProvider } from './context/TreasureContext'

const TreasureOwner = ({ owner, owns, onOwnTreasure}) => (
  <div onClick={onOwnTreasure}>
    <PartyMemberIcon key={owner.id} icon={owner.icon} size="22" />
    <style jsx>{`
      div {
        opacity: ${owns ? 1 : 0.5 }
      }

      div:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    `}
    </style>
  </div>
)

const TreasureToAttribute = ({ treasure, party, onAttribute }) => {
  return (
    <div>
      <p>{treasure.name}</p>
      <ul>{ party.map(member => (
        <li key={member.id}>
          <TreasureOwner
            owner={member}
            owns={treasure.ownedBy === member.id}
            onOwnTreasure={() => { onAttribute(treasure, member) }}
          />
        </li>
      ))}</ul>
      <style jsx>{`
      div {
        display: flex;
        align-items: center;
      }

      p {
        flex: 1 1 auto;
        margin-rigt: auto;
      }

      ul {
        display: flex;
      }

      li {
        margin:0 0.4rem;
      }

      `}</style>
    </div>
  )
}

const TreasureToAttributeList = () => {
  const { treasures, setTreasureOwner } = useTreasure()
  const { party } = useParty()

  const onAttribute = (treasure, owner) => {
    setTreasureOwner(treasure, owner)
  }

  return (
    <li>
      { treasures.map(treasure => (
        <TreasureToAttribute key={treasure.id} treasure={treasure} party={party} onAttribute={onAttribute} />
      ))}
    </li>
  )
}

const CopyButton = ({ results }) => {
  const { getPartyMemberById } = useParty()
  const { treasures } = useTreasure()

  // TODO: use styling for copy
  const treasureOwner = (treasure) => { return `${getPartyMemberById(treasure.ownedBy).name}` }
  const copyAsText = () => {
    const treasuresList = treasures.map(treasure =>
      `- ${treasure.name} ${treasure.ownedBy ? `for ${treasureOwner(treasure)}` : ''}`
    )
    const text = `↣ ${results.join(' ')}\n${treasuresList.join('\n')}`
    console.debug('Copied', text)
    return text
  }

  const [isCopied, setCopied] = useClipboard(copyAsText(), {
    successDuration: 2500
  });

  return (
    <>
      <button className="btn btn-primary" onClick={setCopied}>
        Copy as text
      </button>
      <span>
        {isCopied ? 'Copied! 👍' : ''}
      </span>
      <style jsx>{`
      span {
        padding-left: 1rem;
        color: #0070f3;
      }
      `}</style>
    </>
  )
}

const Results = () => {
  const { fromCopper, toCopper, toShortCurrencies } = useCurrency()
  const { party } = useParty()
  const [results, setResults ] = useState("")

  const splitTreasure = (e) => {
    console.debug('[split] click');
    // TODO: Move to hook
    const shortCurrencies = toShortCurrencies()

    console.debug('[split] will split ', shortCurrencies.join(', '))

    // convert to copper
    // divide by number of players
    const divide = toCopper() / party.length
    console.debug('[split] divide ', toCopper(), 'to ', party.length, ' = ',  divide)
    const coins =  fromCopper(divide)

    console.debug('[split] each player get', coins)

    // convert to array of usable strings
    const divideToString = Object.keys(coins).map(c => `${coins[c].value}${coins[c].short}`)
    console.debug('divideToString', divideToString)
    setResults(divideToString)
  }



  return (
    <div className="Results">
      <h3>Results</h3>
      <button className="btn btn-primary" onClick={splitTreasure} disabled={false}>Split</button>
      { results.length > 0 &&
        <div className="results">
          <p className="coins">↣ {results.join(' ')}</p>
          <ul className="treasures">
            <TreasureToAttributeList />
          </ul>
          <div className="share">
            <CopyButton results={results} />
          </div>
        </div>
      }
      <style jsx>{`
      .results {
        margin-top: 1rem;
        border-top: 1px solid #eaeaea
      }

      .coins {
        font-size: 1rem;
        font-weight: 500;
      }

      .treasures {
        margin-top: 1rem
      }

      .share {
        margin: 1rem 0;
        padding-top: 1rem;
        border-top: 1px solid #eaeaea
      }

      @media (prefers-color-scheme: dark) {
        .results,
        .share {
          border-top-color: #373737
        }
      }
      `}</style>
    </div>
  )
};

export default Results;
