export default ({ icon }) => (
  <img className="icon"
    src={icon ? icon : '/img/default-avatar.png'}
    width="38"
    height="38"
  />
)
