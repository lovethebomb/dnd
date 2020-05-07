import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';

import useParty from './hooks/useParty';
import ButtonAction from './ButtonAction'
import useMemberInput from './AddMemberInput'
import PartyMemberIcon from './PartyMemberIcon';

ReactModal.setAppElement("#__next")

const PartyMember = ({ member }) => (
  <li>
    <PartyMemberIcon icon={member.icon} />
    <span>{member.name}</span>
    <style jsx>{`
    li {
      display: flex;
      align-items: center;
    }

    span {
      padding-left: 1rem;
    }
    `}</style>
  </li>
)

const PartyList = ({ party }) => (
  <>{ party.map(member => (
    <PartyMember key={member.id} member={member} />
  ))}</>
)

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

export default () => {
  const { party, addPartyMember } = useParty();
  const { isLoading, hasInput, icon, input, AddMemberInput } = useMemberInput();
  const addMember = () => {
    console.debug('click and add', input, icon);
    addPartyMember({ name: input, icon })
    hideModal()
  };

  const [showModal, hideModal] = useModal(() => {
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

  return (
    <div className="Party">
      <h3>Party</h3>
      <ul>
        <PartyList party={party} />
        <li>
          <ButtonAction onClick={showModal}>Add Member</ButtonAction>
        </li>
      </ul>
      <style jsx>{`
        .Party {}
        ul li:last-of-type {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
