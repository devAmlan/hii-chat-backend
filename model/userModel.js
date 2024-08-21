import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name required"] },
    email: { type: String, required: [true, "Email required"] },
    password: { type: String, required: [true, "Password required"] },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dugyfwfph/image/upload/v1723849531/n2mq3akqtlosymvnct4d.png",
    },
  },
  { timestaps: true }
);

const User = model("User", userSchema);

export default User;
