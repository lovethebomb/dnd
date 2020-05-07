import React, { useState } from 'react'

const DEFAULT_PARTY = [{ id: 1, name: 'Zerakos', icon: false }]

const PartyContext = React.createContext([{}, () => {}]);


const PartyProvider = (props) => {
  const [state, setState] = useState(DEFAULT_PARTY);
  return (
    <PartyContext.Provider value={[state, setState]}>
      {props.children}
    </PartyContext.Provider>
  );
};

export { PartyContext, PartyProvider };
