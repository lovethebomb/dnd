const ButtonAction = props => <button onClick={props.onClick}>
  {props.children}
  <style jsx>{`
    button {
      appearance: none;
      display: inline;
      color: #0070f3;
      border: none;
      background-color: transparent;
      padding: 0;
      font-size: 1rem;
    }

    button:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    button:focus {
      outline: 0;
      cursor: pointer;
      text-decoration: underline;
    }
  `}</style>
</button>;

export default ButtonAction;
