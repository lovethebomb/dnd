import React from 'react'

export const DEFAULT_CURRENCY = [
  { name: 'Platinum', value: 0 },
  { name: 'Gold', value: 0 },
  { name: 'Electrum', value: 0 },
  { name: 'Silver', value: 0 },
  { name: 'Coppper', value: 0 }
]

export const CurrencyContext = React.createContext(DEFAULT_CURRENCY);
