import CurrencyItem from './CurrencyItem'
import useCurrency from './hooks/useCurrency'

const CurrencyList = () => {
  const { currencies, currenciesKeys, updateCurrencyValue } = useCurrency()

  return (
    <ul>{ currenciesKeys().map(key => (
      <CurrencyItem
        key={currencies[key].name}
        currency={currencies[key]}
        onChange={(value) => updateCurrencyValue(key, value)}
      />
    ))}</ul>
  )
}

export default () => (
  <>
    <CurrencyList />
  </>
)
