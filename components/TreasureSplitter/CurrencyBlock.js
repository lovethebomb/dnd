import CurrencyItem from './CurrencyItem'
import useCurrency from './hooks/useCurrency'

const CurrencyList = () => {
  const { currencies, updateCurrencyValue, toggleEnable } = useCurrency()

  return (
    <form>
    <ul>{ Object.keys(currencies).map(key => (
      <CurrencyItem
        key={currencies[key].name}
        currency={currencies[key]}
        onChange={(value) => updateCurrencyValue(key, value)}
        onToggle={() => toggleEnable(key)}
      />
    ))}</ul>
  </form>
  )
}

export default () => (
  <>
    <CurrencyList />
  </>
)
