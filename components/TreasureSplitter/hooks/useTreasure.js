import { useContext } from 'react';
import { TreasureContext } from "../context/TreasureContext";

const useTreasure = () => {
  const [state, setState] = useContext(TreasureContext);

    function addTreasure(treasure) {
      // TODO: use uuid
      treasure.id = +Date.now();
      console.debug('addTrewasure', state)
      setState([...state, { id: +Date.now(), name: treasure.name }])
    }

    function removeTreasure(treasure) {
      const treasureIndex = state.findIndex(t => t.id === treasure.id)
      const newState = [...state]
      newState.splice(treasureIndex, 1)
      setState(newState)
    }

    function setTreasureOwner(treasure, owner) {
      const newTreasure =  {...treasure }
      newTreasure.ownedBy = owner.id

      const index = state.findIndex( t => t.id == treasure.id);
      const newTreasures = Object.assign([...state], {[index]: newTreasure});

      setState(newTreasures)
    }

    return {
      treasures: state,
      addTreasure,
      removeTreasure,
      setTreasureOwner
    }
};

export default useTreasure;
