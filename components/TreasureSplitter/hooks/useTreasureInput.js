import { useState } from 'react'

const useTreasureInput = () => {
  const [  input, setInput ] = useState("");
  const [hasInput, setHasInput] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value.trim()
    setHasInput(value.length > 0)
    setInput(value)
  }

  const AddTreasureInput = ({ onEnterKey }) => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13 && hasInput) {
        return onEnterKey()
      }
    }

    return (
      <>
        <label htmlFor="treasure">Add a treasure</label>
        <div className="field-input">
          <div className="treasure-icon">
            <img src="/img/potion.jpg" width="100%" height="100%" />
          </div>
          <input
            id="treasure"
            placeholder="Treasure..."
            defaultValue={input}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </div>
        <style jsx>{`
          label {
            display: block;
          }

          label {
            margin-bottom: 1rem;
          }

          .field-input {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }

          .treasure-icon {
            position: relative;
            width: 38px;
            height: 38px;
          }

          input {
            padding: 0.45rem;
            min-width: 26rem;
            min-height: 38px;
            margin-left: 1rem;
          }
        `}</style>
      </>
    );
  }

  return {
    input,
    hasInput,
    setInput,
    AddTreasureInput
  }
}

export default useTreasureInput
