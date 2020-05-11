import React, { useState } from 'react'

const DEFAULT_PARTY = [{ id: 1, name: 'Zerakos', icon: 'https://www.dndbeyond.com/avatars/17/927/636378853439963263.png?width=150&height=150&fit=crop&quality=95&auto=webp' }]

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
