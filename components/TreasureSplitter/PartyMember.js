import PartyMemberIcon from './PartyMemberIcon';
import { Children } from 'react';

const PartyMember = ({ children, member }) => (
  <li>
    <PartyMemberIcon icon={member.icon} />
    <span>{member.name}</span>
    { children }
    <style jsx>{`
    li {
      display: flex;
      align-items: center;
      margin: 0.25rem 0;
    }

    span {
      padding-left: 1rem;
    }
    `}</style>
  </li>
)

export default PartyMember
