import ReactModal from 'react-modal';

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

ReactModal.setAppElement("#__next")
const DefaultModal = (props) => (
  <ReactModal
    isOpen
    shouldCloseOnOverlayClick={true}
    style={DefaultModalStyle}
    {...props}
  >
    { props.children }
  </ReactModal>
)

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
