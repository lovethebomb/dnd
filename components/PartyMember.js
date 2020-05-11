import PartyMemberIcon from './PartyMemberIcon';

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

export default PartyMember
