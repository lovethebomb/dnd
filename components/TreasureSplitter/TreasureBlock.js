import { useContext, useState } from 'react'

import useTreasure from './hooks/useTreasure'
import useTreasureModal from './hooks/useTreasureModal';

import ButtonAction from './ButtonAction'

const TreasureList = ({ treasures, removeTreasure }) => (
  <>{ treasures.map((treasure) => (
    <p key={treasure.id}>
      <span className="name">{treasure.name}</span>
      <span className="delete" onClick={(e) => { removeTreasure(treasure) }}>❌</span>
      <style jsx>{`
      .delete {
        margin-left: 1rem;
        opacity: 0.2;
      }

      .delete:hover {
        opacity: 1;
        cursor: pointer;
      }
    `}</style>
    </p>
  ))}</>
)

const TreasureBlock = () => {
  const { treasures, removeTreasure } = useTreasure();
  const { showModal } = useTreasureModal();

  return (
    <ul>
      <TreasureList treasures={treasures} removeTreasure={removeTreasure} />
      <li>
        <ButtonAction onClick={showModal}>Add Treasure</ButtonAction>
      </li>
    </ul>
  )
};

export default TreasureBlock;
