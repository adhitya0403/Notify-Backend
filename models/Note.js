import mongoose from "mongoose";


// create schema
// create model based on schema

const noteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    bg: {
      type: String,
      required: false,
      default: function () {
        const hue = Math.floor(Math.random() * 361); // Random hue (0-360)
        const saturation = 85 + Math.random() * 11; // High saturation for vibrancy (50-60)
        const lightness = 76 + Math.random() * 11; // Good lightness for brightness (70-80)
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      },
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
