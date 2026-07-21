import express from "express";
import DiaryEntry from "../models/DiaryEntry.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const { tmdbMovieId, movieTitle, posterPath, watchedDate, rating, rewatch, note } = req.body;

    if (!tmdbMovieId || !movieTitle || !watchedDate) {
      return res.status(400).json({ error: "tmdbMovieId, movieTitle, and watchedDate are required" });
    }

    const entry = await DiaryEntry.create({
      user: req.userId,
      tmdbMovieId,
      movieTitle,
      posterPath,
      watchedDate,
      rating,
      rewatch,
      note,
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Could not save diary entry" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.userId }).sort({ watchedDate: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Could not load diary" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const entry = await DiaryEntry.findOne({ _id: req.params.id, user: req.userId });
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    await entry.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Could not delete entry" });
  }
});

export default router;
