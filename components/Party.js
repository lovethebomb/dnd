import { useState } from 'react'
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

import ButtonAction from './ButtonAction'
import AddMemberInput from './AddMemberInput'
import PartyMemberIcon from './PartyMemberIcon';

ReactModal.setAppElement("#__next")

const DEFAULT_PARTY = [
  { name: 'Zerakos', icon: false }
]

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
    <PartyMember key={member.name} member={member} />
  ))}</>
)

const addPartyMember = (e) => {
  console.debug('addPartyMember click')
}

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
  const [party, setParty] = useState(DEFAULT_PARTY);

  const [showModal, hideModal] = useModal(() => {

    return (
      <ReactModal
        isOpen
        contentLabel="Add a parrty member modal"
        onRequestClose={hideModal}
        shouldCloseOnOverlayClick={true}
        style={TreasureModalStyle}
      >
        <AddMemberInput />
        <footer>
          <ButtonAction className="modal-close" onClick={hideModal}>Cancel</ButtonAction>
          <button className="btn btn-primary add-button" onClick={addPartyMember}>Add</button>
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
  });

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
