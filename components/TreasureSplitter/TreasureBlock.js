import dynamic from 'next/dynamic'

import useTreasure from './hooks/useTreasure'
import useTreasureModal from './hooks/useTreasureModal';

import ButtonAction from './ButtonAction'

const DynamicTreasureList = dynamic(
  () => import('./dynamic/TreasureList'),
  { ssr: false }
)

const TreasureBlock = () => {
  const { treasures, removeTreasure } = useTreasure();
  const { showModal } = useTreasureModal();

  return (
    <ul>
      <DynamicTreasureList treasures={treasures} removeTreasure={removeTreasure} />
      <li>
        <ButtonAction onClick={showModal}>Add Treasure</ButtonAction>
      </li>
    </ul>
  )
};

export default TreasureBlock;
