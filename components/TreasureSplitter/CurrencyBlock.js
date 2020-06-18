import CurrencyItem from './CurrencyItem'
import useCurrency from './hooks/useCurrency'

const CurrencyList = () => {
  const { currencies, updateCurrencyValue, toggleEnable } = useCurrency()

  return (
    <ul>{ Object.keys(currencies).map(key => (
      <CurrencyItem
        key={currencies[key].name}
        currency={currencies[key]}
        onChange={(value) => updateCurrencyValue(key, value)}
        onToggle={() => toggleEnable(key)}
      />
    ))}</ul>
  )
}

export default () => (
  <>
    <CurrencyList />
  </>
)
