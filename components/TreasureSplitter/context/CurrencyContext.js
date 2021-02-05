import React, { useState } from 'react'
import createPersistedState from 'use-persisted-state';

const useCurrencyState = createPersistedState('currency');

const DEFAULT_CURRENCY = {
  platinum: { name: 'Platinum', short: 'pp', value: 0, toCP: 1000, enabled: true },
  gold: { name: 'Gold', short: 'gp', value: 8, toCP: 100, enabled: true },
  electrum: { name: 'Electrum',  short: 'ep', value: 0, toCP: 50, enabled: false },
  silver: { name: 'Silver', short: 'sp', value: 4, toCP: 10, enabled: true },
  copper: { name: 'Copper', short: 'cp', value: 0, toCP: 1, enabled: true }
}

const CurrencyContext = React.createContext([{}, () => {}]);

const CurrencyProvider = (props) => {
  const [state, setState] = useCurrencyState(DEFAULT_CURRENCY);
  return (
    <CurrencyContext.Provider value={[state, setState]}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export { DEFAULT_CURRENCY, CurrencyContext, CurrencyProvider };
