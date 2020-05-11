export default async (req, res) => {
  if (req.method !== "GET") {
    // Throw early if not GET request
    res.statusCode = 405;
    res.json({ error: "Invalid method" });
  } else {
    const {
      query: { sid },
    } = req;

    try {
      res.statusCode = 200;
      return res.json({ sid, status: 'ok' });
    } catch(e) {
      res.statusCode = e.status;
      return res.json({ error: 'Unknown error' });
    }
  }
};
