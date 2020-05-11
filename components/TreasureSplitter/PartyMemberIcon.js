export default ({ icon, size="38" }) => (
  <img className="icon"
    src={icon ? icon : '/img/default-avatar.png'}
    width={size}
    height={size}
  />
)
