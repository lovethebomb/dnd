import useParty from '../hooks/useParty';
import PartyMember from '../PartyMember';

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

export default PartyList;
