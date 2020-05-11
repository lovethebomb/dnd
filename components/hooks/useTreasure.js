import { useContext } from 'react';
import { TreasureContext } from "../context/TreasureContext";

const useTreasure = () => {
  const [state, setState] = useContext(TreasureContext);

    function addTreasure(treasure) {
      // TODO: use uuid
      // treasure.id = +Date.now();
      setState([...state, { id: +Date.now(), name: 'New Treasure'}])
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
      setTreasureOwner
    }
};

export default useTreasure;
