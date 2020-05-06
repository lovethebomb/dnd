
export default ({ currency }) => {
  // const [currencies, setCurrencies] = useState(DEFAULT_CURRENCY);

  return (
    <div className={`Currency ${currency.name.toLowerCase()}`}>
      <div className="icon"></div>
      <span className="text">{currency.name}</span>
      <input type="number" name="amount" value={currency.value}/>
      <style jsx>{`
        .Currency {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .icon {
          background: url("/img/currency-sprite.png") no-repeat;
          background-size: auto 24px;
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
        }

        .platinum .icon {
          background-position: 0 0;
        }
        .gold .icon {
          background-position: -25px 0;
        }
        .electrum .icon {
          background-position: -50px 0;
        }
        .silver .icon {
          background-position: -75px 0;
        }
        .copper .icon {
          background-position: -100px 0;
        }

        .text {
          display: inline-block;
          padding-left: 1rem;
          line-height: 24px;
          min-width: 7rem;
          flex: 2 1 auto;
        }

        input {
          margin-left: auto;
          flex: 2 1 10px;
          min-width: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
