
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';

import useTreasure from './useTreasure'
import useTreasureInput from './useTreasureInput'

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

ReactModal.setAppElement("#__next")

const useTreasureModal = () => {
  const { input, hasInput, AddTreasureInput } = useTreasureInput();
  const { addTreasure } = useTreasure();

  const [showModal, hideModal] = useModal(() => {
    const onAddTreasure = () => {
      addTreasure({ name: input })
      hideModal()
    };


    return (
      <ReactModal
        isOpen
        contentLabel="Add a treasure modal"
        onRequestClose={hideModal}
        shouldCloseOnOverlayClick={true}
        style={TreasureModalStyle}
      >
        { AddTreasureInput({ onEnterKey: onAddTreasure }) }
        <footer>
          <ButtonAction className="modal-close" onClick={hideModal}>Cancel</ButtonAction>
          <button className="btn btn-primary add-button" onClick={onAddTreasure} disabled={!hasInput}>Add</button>
        </footer>
        <style jsx>{`
          footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          border-top: 1px solid #eaeaea;
          padding-top: 2rem;
        }
        `}</style>
      </ReactModal>
    )
  },[input, hasInput]);

  return {
    showModal,
    hideModal
  }
};

export default useTreasureModal
