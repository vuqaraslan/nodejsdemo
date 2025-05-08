import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required !"],
    maxlength: [50, "Title cannot exceed 50 characters !"],
  },
  description: {
    type: String,
    required: [true, "Description is required !"],
    minlength: [true, "Description must be at least 10 characters !"],
    maxlength: [200, "Title cannot exceed 200 characters !"],
  },
  timestamp:{
    type:Date,
    value:Date.now
  }
});

export const Todo = mongoose.model("Todo", todoSchema);
