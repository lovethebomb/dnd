import fetch from 'node-fetch'

const retrieveCharacter = async (id = null) => {
  if (!id) return;
  console.debug("[api] retrieveCharacter", id);
  const req = await fetch(
    `https://character-service.dndbeyond.com/character/v3/character/${id}`
  );

  if (req.ok) {
    const data = await req.json();
    return data.data
  }

  console.error('[err][api] retrieveCharacter', id, req.status)
  throw req
};

export default async (req, res) => {
  if (req.method !== "GET") {
    // Throw early if not GET request
    res.statusCode = 405;
    res.json({ error: "Invalid method" });
  } else {
    const {
      query: { cid },
    } = req;

    try {
      const character = await retrieveCharacter(cid);
      res.statusCode = 200;
      return res.json(character);
    } catch(e) {
      res.statusCode = e.status;
      return res.json({ error: 'Unknown error' });
    }
  }
};
