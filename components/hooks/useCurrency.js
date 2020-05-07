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

    return {
      currencies: state,
      currenciesKeys: () => Object.keys(state),
      toggleEnable,
      updateCurrencyValue
    }
};

export default useCurrency;
