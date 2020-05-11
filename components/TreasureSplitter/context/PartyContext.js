import React, { useState } from 'react'

const DEFAULT_PARTY = [
  { id: 1, name: 'Nesji Silverthread', icon: 'https://www.dndbeyond.com/avatars/10/79/636339381135015635.png?width=150&height=150&fit=crop&quality=95&auto=webp' },
  { id: 2, name: 'Sharinn', icon: 'https://www.dndbeyond.com/avatars/9107/478/637196228616913897.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp' },
  { id: 3, name: 'Xendar', icon: 'https://www.dndbeyond.com/avatars/17/310/636377871028699922.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp' },
  { id: 4, name: 'Zerakos', icon: 'https://www.dndbeyond.com/avatars/17/927/636378853439963263.png?width=150&height=150&fit=crop&quality=95&auto=webp' },
]

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
