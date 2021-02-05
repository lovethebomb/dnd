import React from 'react'
import createPersistedState from 'use-persisted-state';

const useTreasureState = createPersistedState('treasure');

const DEFAULT_TREASURES = [{ id: "t_1", name: 'Sample Treasure', ownedBy: "" }]

const TreasureContext = React.createContext([{}, () => {}]);


const TreasureProvider = (props) => {
  const [state, setState] = useTreasureState(DEFAULT_TREASURES);
  return (
    <TreasureContext.Provider value={[state, setState]}>
      {props.children}
    </TreasureContext.Provider>
  );
};

export { DEFAULT_TREASURES, TreasureContext, TreasureProvider };
