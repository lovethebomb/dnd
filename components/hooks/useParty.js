import { useContext } from 'react';
import { PartyContext } from "../context/PartyContext";

const useParty = () => {
  const [state, setState] = useContext(PartyContext);

    function addPartyMember(member) {
      // TODO: use uuid
      member.id = +Date.now()
      setState([...state, member])
    }

    return {
      party: state,
      addPartyMember
    }
};

export default useParty;
