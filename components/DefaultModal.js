import ReactModal from 'react-modal';
import useDarkMode from 'use-dark-mode'

const DefaultModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minHeight: '10rem',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 0 0 #ccc'
  }
}
const DarkModalStyle = {
  content: {
    ...DefaultModalStyle.content,
    backgroundColor: "#222",
    color: "#fff"
  }
}


ReactModal.setAppElement("#__next")
const DefaultModal = (props) => {
  const darkMode = useDarkMode(false);

  return (
    <ReactModal
      isOpen
      shouldCloseOnOverlayClick={true}
      style={darkMode ? DarkModalStyle : DefaultModalStyle}
      {...props}
    >
      { props.children }
    </ReactModal>
  )
}

const DefaultModalFooter = (props) => (
  <footer>
    {props.children}
    <style jsx>{`
    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      border-top: 1px solid #eaeaea;
      padding-top: 2rem;
    }
    `}</style>
  </footer>
)

export { DefaultModal, DefaultModalFooter }
