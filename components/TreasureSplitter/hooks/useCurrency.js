import { useContext } from 'react';
import { CurrencyContext } from "../context/CurrencyContext";

const useCurrency = () => {
  const [state, setState] = useContext(CurrencyContext);

    function toggleEnable(currency) {
      const newCurrency = state[currency]
      newCurrency.enabled = !newCurrency.enabled

      setState({ ...state, [newCurrency.name]: newCurrency })
    }

    function updateCurrencyValue(currency, value) {
      console.debug('updateCurrencyValue', currency, value)
      const newCurrency = state[currency]
      newCurrency.value = value

      setState({ ...state, [currency]: newCurrency })
    }

    function toShortCurrencies() {
      return Object.keys(state).map(currency => `${state[currency].value}${state[currency].short}`)
    }

    function toCopper() {
      const cp = Object.keys(state).map(c => state[c].value * state[c].toCP)
      console.debug('cp', cp)
      return cp.reduce((previous, current) => previous + current)
    }

    function fromCopper(copper) {
      // TODO: Optimize
      const coins = {}
      const modulo = Object.keys(state).filter(c => copper % state[c].toCP < copper)
      modulo.map(c => {
        const currency = state[c]
        const truncatedCoin = Math.trunc(copper / currency.toCP)
        copper = copper - (truncatedCoin * currency.toCP)
        coins[c] = { name: currency.name, short: currency.short, value: truncatedCoin}
      })
      return coins;
    }

    return {
      currencies: state,
      fromCopper,
      toShortCurrencies,
      toCopper,
      toggleEnable,
      updateCurrencyValue
    }
};

export default useCurrency;
