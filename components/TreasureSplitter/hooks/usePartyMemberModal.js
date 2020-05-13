import { useModal } from 'react-modal-hook';

import useParty from './useParty';

import useMemberInput from './useMemberInput'

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

const usePartyMemberModal = () => {
  const { isLoading, hasInput, icon, input, AddMemberInput, setLoading } = useMemberInput();
  const { addPartyMember } = useParty();

  const [showModal, hideModal] = useModal(() => {
    const addMember = () => {
      addPartyMember({ name: input, icon })
      hideModal()
    };

    return (
      <DefaultModal
        contentLabel="Add a Party member modal"
        onRequestClose={hideModal}
      >
        { AddMemberInput({ onEnterKey: addMember }) }
        <DefaultModalFooter>
          <ButtonAction className="modal-close" onClick={hideModal}>Cancel</ButtonAction>
          <button className="btn btn-primary add-button" onClick={addMember} disabled={isLoading || !hasInput}>Add</button>
        </DefaultModalFooter>
      </DefaultModal>
    )
  },[isLoading, icon, input, hasInput]);

  return {
    showModal,
    hideModal
  }
};

export default usePartyMemberModal
