import { useContext, useState } from 'react'

import { TreasureContext } from './context/TreasureContext'
import ButtonAction from './ButtonAction'

const TreasureList = ({ treasures }) => (
  <>{ treasures.map((treasure, index) => (
    <p key={index}>{treasure.name}</p>
  ))}</>
)

export default () => {
  const [treasures, setTreasures] = useContext(TreasureContext);
  const addTreasure = () => { setTreasures([...treasures, { name: 'New Treasure'}])}

  return (
    <ul>
      <TreasureList treasures={treasures} />
      <li>
        <ButtonAction onClick={addTreasure}>Add Treasure</ButtonAction>
      </li>
    </ul>
  )
}
