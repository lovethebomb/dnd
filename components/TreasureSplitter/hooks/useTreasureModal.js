import { useModal } from 'react-modal-hook';

import useTreasure from './useTreasure'
import useTreasureInput from './useTreasureInput'

import { DefaultModal, DefaultModalFooter } from '../../DefaultModal'
import ButtonAction from '../ButtonAction'

const TreasureModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minHeight: '10rem',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 0 0 #ccc'
  }
}


const useTreasureModal = () => {
  const { input, hasInput, AddTreasureInput } = useTreasureInput();
  const { addTreasure } = useTreasure();

  const [showModal, hideModal] = useModal(() => {
    const onAddTreasure = () => {
      addTreasure({ name: input })
      hideModal()
    };


    return (
      <DefaultModal
        contentLabel="Add a treasure modal"
        onRequestClose={hideModal}
      >
        { AddTreasureInput({ onEnterKey: onAddTreasure }) }
        <DefaultModalFooter>
          <ButtonAction className="modal-close" onClick={hideModal}>Cancel</ButtonAction>
          <button className="btn btn-primary add-button" onClick={onAddTreasure} disabled={!hasInput}>Add</button>
        </DefaultModalFooter>
      </DefaultModal>
    )
  },[input, hasInput]);

  return {
    showModal,
    hideModal
  }
};

export default useTreasureModal
