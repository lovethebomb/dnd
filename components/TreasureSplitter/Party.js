import useParty from './hooks/useParty';
import usePartyMemberModal from './hooks/usePartyMemberModal';

import ButtonAction from './ButtonAction'
import PartyMember from './PartyMember';

const PartyList = () => {
  const { party, removePartyMember } = useParty();
  return (
    <>{ party.map(member => (
      <PartyMember key={member.id} member={member}>
        <span className="delete" onClick={(e) => { removePartyMember(member) }}>❌</span>
      </PartyMember>
    ))}
    <style jsx>{`
      .delete {
        margin-left: auto;
        opacity: 0.2;
        flex: 0 0 22px;
      }

      .delete:hover {
        opacity: 1;
        cursor: pointer;
      }
    `}</style>
    </>
  )
}


export default () => {
  const { showModal } = usePartyMemberModal();

  return (
    <div className="Party">
      <h3>Party</h3>
      <ul>
        <PartyList />
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
