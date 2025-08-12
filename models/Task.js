import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      required: true,
    },
    isFinished: {
      type: Boolean,
      required: false,
      default: false,
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

const Task = mongoose.model("Task", taskSchema);

export default Task;
