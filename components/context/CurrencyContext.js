import React, { useState } from 'react'

const DEFAULT_CURRENCY = {
  platinum: { name: 'Platinum', value: 0, enabled: true },
  gold: { name: 'Gold', value: 0, enabled: true },
  electrum: { name: 'Electrum', value: 0, enabled: true },
  silver: { name: 'Silver', value: 0, enabled: true },
  copper: { name: 'Copper', value: 0, enabled: true }
}

const CurrencyContext = React.createContext([{}, () => {}]);

const CurrencyProvider = (props) => {
  const [state, setState] = useState(DEFAULT_CURRENCY);
  return (
    <CurrencyContext.Provider value={[state, setState]}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
