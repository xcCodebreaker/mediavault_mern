import mongoose from "mongoose";

const diaryEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbMovieId: { type: Number, required: true },
    movieTitle: { type: String, required: true },
    posterPath: { type: String },
    watchedDate: { type: Date, required: true },
    rating: { type: Number, min: 0.5, max: 5 },
    rewatch: { type: Boolean, default: false },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("DiaryEntry", diaryEntrySchema);
