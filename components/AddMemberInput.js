
import fetch from 'node-fetch'
import { useState } from 'react'
import {DebounceInput} from 'react-debounce-input';

import styles from './AddMemberInput.module.css'
import PartyMemberIcon from './PartyMemberIcon';

const DDB_URL_REGEX = /^(http(s)?:\/\/)?(www\.)?(dndbeyond\.com|ddb\.ac)\/.*/g
const DDB_CHARACTERID_REGEX = /characters\/(?:\d*)/g
// URLS like:
// https://www.dndbeyond.com/profile/Kal0psia/characters/26045247
// ddb.ac/characters/26045247/78qglK

export default () => {
  const [isLoading, setLoading] = useState(false)
  const [hasInput, setHasInput] = useState(false)
  const [icon, setIcon] = useState("")
  const [input, setInput] = useState("")

  console.debug('render input')
  const handleChange = async (evt) => {
    const value = evt.target.value.trim()
    console.debug('handlChange', value)
    if (value === input) { return }

    if (!DDB_URL_REGEX.test(value)) {
      setIcon("")

      setHasInput(value.length > 0);
      return setInput(value);
    }

    //  Try to retrieve character
    const matches = value.match(DDB_CHARACTERID_REGEX);
    setLoading(true)

    if (matches.length > 0) {
      const cid = matches[0].substr(11, matches[0].length-11)
      console.debug('[regex] found cid', cid)

      const req = await fetch(`/api/character/${cid}`)
      if (req.ok) {
        const data = await req.json()
        console.debug('will update', data.name)
        setLoading(false)
        setIcon(data.avatarUrl)
        setInput(data.name)
        setHasInput(true);
        return
      }
    }
    // TODO flash error
    setLoading(false)
    setHasInput(false);
  }



  const AddMemberInput = ({ onEnterKey }) => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13 && hasInput && !isLoading) {
        return onEnterKey()
      }
    }

    return (
      <>
        <label htmlFor="name">Add a member</label>
        <div className={`field-input ${isLoading ? 'loading' : ''}`}>
          <div className="member-icon">
            <PartyMemberIcon icon={icon} />
          </div>
          <DebounceInput
            className={styles.input}
            minLength={0}
            debounceTimeout={300}
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Character name or D&D Beyond Character URL"
            disabled={isLoading}
            autoFocus={true}
            onKeyDown={onKeyDown}
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

        .member-icon {
          position: relative;
          width: 38px;
          height: 38px;
        }

        .loading .member-icon:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 5px;
          text-indent: -9999em;
          width: 18px;
          height: 18px;
          font-size: 5px;
          margin: 4px;
          border: 1.1em solid rgba(255, 255, 255, 0.2);
          border-left: 1.1em solid #ffffff;
          border-radius: 50%;
          transform: translateZ(0);
          animation: spin 1.1s infinite linear;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
          `}</style>
      </>
    )
  }

  return {
    isLoading, hasInput, icon, input, AddMemberInput
  }
}
