import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required !"],
    unique: [true, "Email already exists !"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email !`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
//   todos: [//one to many bir userin coxlu todos-lari ola biler.
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Todo",
//     },
//   ],
});

export const User = mongoose.model("User", userSchema);
