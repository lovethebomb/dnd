import Loot from './Loot'
import Party from './Party'
import { TreasureContext, DEFAULT_TREASURES } from './context/TreasureContext'
import { CurrencyContext, DEFAULT_CURRENCY } from './context/CurrencyContext'

export default () => (
  <TreasureContext.Provider value={DEFAULT_TREASURES}>
    <CurrencyContext.Provider value={DEFAULT_CURRENCY}>
      <div className="TreasureSplitter">
        <div className="header">
          <h2 className="title">TreasureSplitter</h2>
        </div>
        <div className="content">
          <div className="panel">
            <Loot />
          </div>
          <div className="panel">
            <Party />
          </div>
        </div>
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
        min-width: 13rem;
      }

      .panel:first-of-type {
        margin-right: 2rem;
      }
      `}</style>
      </div>
    </CurrencyContext.Provider>
  </TreasureContext.Provider>
  )
