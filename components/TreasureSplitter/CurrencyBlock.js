import dynamic from 'next/dynamic'

const DynamicCurrencyList = dynamic(
  () => import('./dynamic/CurrencyList.js'),
  { ssr: false }
)


const CurrencyBlock = () => (
  <>
    <DynamicCurrencyList />
  </>
)
export default CurrencyBlock
