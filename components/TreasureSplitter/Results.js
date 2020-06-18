import { useState } from 'react'

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

export default () => {
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
        margin-top: 1rem;
        border-top: 1px solid #eaeaea
      }
      `}</style>
    </div>
  )
}
