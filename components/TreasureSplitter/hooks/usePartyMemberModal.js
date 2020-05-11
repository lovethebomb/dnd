import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';

import useParty from './useParty';

import useMemberInput from './useMemberInput'
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

const usePartyMemberModal = () => {
  const { isLoading, hasInput, icon, input, AddMemberInput, setLoading } = useMemberInput();
  const { addPartyMember } = useParty();

  const [showModal, hideModal] = useModal(() => {
    const addMember = () => {
      console.debug('click and add', input, icon);
      addPartyMember({ name: input, icon })
      hideModal()
    };

    return (
      <ReactModal
        isOpen
        contentLabel="Add a Party member modal"
        onRequestClose={hideModal}
        shouldCloseOnOverlayClick={true}
        style={TreasureModalStyle}
      >
        { AddMemberInput({ onEnterKey: addMember }) }
        <footer>
          <ButtonAction className="modal-close" onClick={hideModal}>Cancel</ButtonAction>
          <button className="btn btn-primary add-button" onClick={addMember} disabled={isLoading || !hasInput}>Add</button>
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
  },[isLoading, icon, input, hasInput]);

  return {
    showModal,
    hideModal
  }
};

export default usePartyMemberModal
