import { useContext, useState } from 'react'

import ButtonAction from './ButtonAction'
import Currency from './Currency'

import { TreasureContext } from './context/TreasureContext'
import { CurrencyContext } from './context/CurrencyContext'


const CurrencyList = ({ currencies }) => (
  <ul>{ currencies.map(currency => (
    <Currency key={currency.name} currency={currency} />
  ))}</ul>
)

const TreasureList = ({ treasures }) => (
  <>{ treasures.map(treasure => (
    <p key={treasure.name}>{treasure.name}</p>
  ))}</>
)

const addTreasure = (e) => {
  console.debug('addTreasure click')
}

export default (props) => {
  // const [currencies, setCurrencies] = useState(DEFAULT_CURRENCY);
  // const [treasures, setTreasures] = useState([]);
  const treasures = useContext(TreasureContext);
  const currencies = useContext(CurrencyContext);

  return (
    <div className="Loot">
      <h3>Loot</h3>
      <CurrencyList currencies={currencies}  />
      <p>Treasures:</p>
      <ul>
        <TreasureList treasures={treasures} />
        <li>
          <ButtonAction onClick={() => { setTreasures([...treasures, { name: 'New Treasure'}]) }}>Add Treasure</ButtonAction>
        </li>
      </ul>
    </div>
  );
}
