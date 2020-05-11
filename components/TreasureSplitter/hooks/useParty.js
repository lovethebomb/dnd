import { useContext } from 'react';
import { PartyContext } from "../context/PartyContext";

const useParty = () => {
  const [state, setState] = useContext(PartyContext);

    function addPartyMember(member) {
      // TODO: use uuid
      member.id = +Date.now()
      setState([...state, member])
    }

    function removePartyMember(member) {
      const memberIndex = state.findIndex(m => m.id === member.id)
      const newState = [...state]
      newState.splice(memberIndex, 1)
      setState(newState)
    }

    return {
      party: state,
      addPartyMember,
      removePartyMember
    }
};

export default useParty;
