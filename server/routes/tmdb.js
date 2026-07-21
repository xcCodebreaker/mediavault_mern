import express from "express";

const router = express.Router();

const TMDB_BASE = "https://api.themoviedb.org/3";

async function tmdbFetch(path) {
  const response = await fetch(`${TMDB_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "query parameter is required" });
    }

    const data = await tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`);
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch from TMDB" });
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    const data = await tmdbFetch(`/movie/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch from TMDB" });
  }
});

export default router;
