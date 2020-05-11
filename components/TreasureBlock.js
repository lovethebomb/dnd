import { useContext, useState } from 'react'

import useTreasure from './hooks/useTreasure'
import ButtonAction from './ButtonAction'

const TreasureList = ({ treasures }) => (
  <>{ treasures.map((treasure) => (
    <p key={treasure.id}>{treasure.name}</p>
  ))}</>
)

export default () => {
  const { treasures, addTreasure } = useTreasure();

  return (
    <ul>
      <TreasureList treasures={treasures} />
      <li>
        <ButtonAction onClick={addTreasure}>Add Treasure</ButtonAction>
      </li>
    </ul>
  )
}
