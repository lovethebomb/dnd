import React, { useState } from 'react'

const DEFAULT_TREASURES = [{ 'name': 'Sample Treasure' }]

const TreasureContext = React.createContext([{}, () => {}]);


const TreasureProvider = (props) => {
  const [state, setState] = useState(DEFAULT_TREASURES);
  return (
    <TreasureContext.Provider value={[state, setState]}>
      {props.children}
    </TreasureContext.Provider>
  );
};

export { TreasureContext, TreasureProvider };
