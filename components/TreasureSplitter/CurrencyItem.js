import { useEffect, useState, useRef } from "react";

export default ({ currency, onChange, onToggle }) => {
  const [inputVisible, setInputVisible] = useState(false)
  const inputEl = useRef(null);

  const hideInput = () => setInputVisible(false)
  const showInput = () => setInputVisible(true)
  useEffect(() => {
    if (inputVisible) {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [inputVisible]);
  const hideInputAndUpdate = (e) => {
    // trim leading 0
    const value = parseFloat(e.target.value)
    onChange(value)
    hideInput()
  }

  return (
    <div className={`Currency ${currency.name.toLowerCase()} ${!currency.enabled ? 'disabled' : ''}`}>
      <div className="icon"></div>
      <span className="text" onClick={onToggle}>{currency.name}</span>
      <label htmlFor={currency.name} onClick={showInput}>{currency.value}</label>
        <input
          type="number"
          name="amount"
          id={currency.name}
          max="2147483647"
          ref={inputEl}
          defaultValue={currency.value}
          onFocus={showInput}
          onBlur={hideInputAndUpdate}
        />

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
          font-weight: 500;
        }

        .text:hover {
          cursor: pointer;
          text-decoration: line-through;
          opacity: 1;
        }

        .disabled .text {
          text-decoration: line-through;
          opacity: 0.4;
        }

        .disabled .text:hover {
          cursor: pointer;
          opacity: 0.7;
        }


        label {
          display: ${inputVisible ? 'none' : 'block'};
          border: 2px solid transparent;
          padding: 0.2rem 0.5rem;
          text-align: right;
          min-width: 6rem;
          height: 24px;
        }

        label:hover {
          cursor: text;
        }

        input {
          transform: scale(${inputVisible ? '1' : '0'});
          overflow: hidden;
          margin-left: auto;
          flex: 2 1 auto;
          min-width: 6rem;
          width: 100%;
          font-size: 1rem;
          text-align: right;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          margin-left: 0.2rem;
        }
      `}</style>
    </div>
  );
}
