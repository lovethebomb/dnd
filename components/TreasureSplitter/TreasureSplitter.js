import Loot from './Loot'
import Party from './Party'
import Results from './Results'

import useCurrency from './hooks/useCurrency';
import useParty from './hooks/useParty';
import useTreasure from './hooks/useTreasure';

import { TreasureProvider } from './context/TreasureContext'
import { CurrencyProvider } from './context/CurrencyContext'
import { PartyProvider } from './context/PartyContext'

const Providers = ({ children }) => (
    <TreasureProvider>
      <CurrencyProvider>
        <PartyProvider>
          {children}
        </PartyProvider>
      </CurrencyProvider>
    </TreasureProvider>
)

const Content = () => {
  const { resetCurrency } = useCurrency()
  const { resetParty } = useParty()
  const { resetTreasure } = useTreasure()

  const resetSplitter = (e) => {
    console.debug('[TreasureSplitter] reset');
    resetCurrency()
    resetParty()
    resetTreasure()
  }

  return (
    <div className="TreasureSplitter">
      <div className="content">
        <div className="panel">
          <Loot />
        </div>
        <div className="panel">
          <Party />
        </div>
        <div className="panel">
          <Results />
        </div>
      </div>
      <button className="reset btn btn-danger" onClick={resetSplitter}>Reset all</button>
      <style jsx>{`
      .TreasureSplitter {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
      }

      .header {
        border-bottom: 1px solid #eaeaea;
        padding: 0 0 1rem 0;
      }

      .title {
        text-align: left;
        font-weight: 600;
        font-size: 1.2rem;
      }

      .content {
        display: flex;
      }

      .panel {
        flex: 1 1 33%;
        min-width: 13rem;
        margin-right: 2rem;
      }

      .panel:last-of-type {
        margin-right: 0;
      }

      .reset {
        margin-top: 2rem;
      }

      @media (max-width: 640px) {
        .TreasureSplitter {
          width: 100%;
        }

        .content {
          display: block;
        }
      }

      @media (prefers-color-scheme: dark) {
        .TreasureSplitter {
          border-color: #373737
        }
      }
    `}</style>
    </div>
  )
}

const TreasureSplitter = () => (
  <Providers>
    <Content />
  </Providers>
)

export default TreasureSplitter;
