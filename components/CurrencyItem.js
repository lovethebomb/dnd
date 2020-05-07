import { useEffect, useState, useRef } from "react";
import InputNumber from 'rc-input-number';

export default ({ currency, onChange }) => {
  const [inputVisible, setInputVisible] = useState(false)
  const inputEl = useRef(null);

  const hideInput = () => { console.debug('hideInput'); setInputVisible(false)}
  const showInput = () => setInputVisible(true)
  useEffect(() => {
    if (inputVisible) {
      inputEl.current.focus();
    }
  }, [inputVisible]);
  const hideInputAndUpdate = (e) => {
    // trim leading 0
    const value = parseFloat(e.target.value)
    onChange(value)
    hideInput()
  }

  return (
    <div className={`Currency ${currency.name.toLowerCase()}`}>
      <div className="icon"></div>
      <span className="text">{currency.name}</span>
      <label htmlFor={currency.name} onClick={showInput}>{currency.value}</label>
      {inputVisible &&
        <input
          type="number"
          name="amount"
          max="2147483647"
          ref={inputEl}
          defaultValue={currency.value}
          onBlur={hideInputAndUpdate}
        />
      }

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

        label {
          display: ${inputVisible ? 'none' : 'block'};
          padding: 0.2rem 0.5rem;
          text-align: right;
          min-width: 6rem;
        }

        label:hover {
          cursor: text;
        }

        input {
          margin-left: auto;
          flex: 2 1 auto;
          min-width: 6rem;
          width: 100%;
          font-size: 1rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
