import dynamic from 'next/dynamic'

import usePartyMemberModal from './hooks/usePartyMemberModal';

import ButtonAction from './ButtonAction'

const DynamicPartyList = dynamic(
  () => import('./dynamic/PartyList.js'),
  { ssr: false }
)

const Party = () => {
  const { showModal } = usePartyMemberModal();

  return (
    <div className="Party">
      <h3>Party</h3>
      <ul>
        <DynamicPartyList />
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
};


export default Party;
