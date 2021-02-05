const TreasureList = ({ treasures, removeTreasure }) => (
  <>{ treasures.map((treasure) => (
    <p key={treasure.id}>
      <span className="name">{treasure.name}</span>
      <span className="delete" onClick={(e) => { removeTreasure(treasure) }}>❌</span>
      <style jsx>{`
      .delete {
        margin-left: 1rem;
        opacity: 0.2;
      }

      .delete:hover {
        opacity: 1;
        cursor: pointer;
      }
    `}</style>
    </p>
  ))}</>
)

export default TreasureList;
