import { useContext } from 'react';
import { DEFAULT_PARTY, PartyContext } from "../context/PartyContext";

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

    function getPartyMemberById(id) {
      return state.find(m => m.id === id)
    }

    function resetParty() {
      setState(DEFAULT_PARTY)
    }

    return {
      party: state,
      addPartyMember,
      removePartyMember,
      getPartyMemberById,
      resetParty
    }
};

export default useParty;
