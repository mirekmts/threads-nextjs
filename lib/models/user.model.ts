import mongoose from "mongoose";

export interface IUser {
  _id: string;
  id: string;
  username: string;
  name: string;
  threads: mongoose.Types.ObjectId[];
  onboarded: boolean;
  communities: mongoose.Types.ObjectId[];
  image?: string | undefined;
  bio?: string | undefined;
}
const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User =
  mongoose.models.User<IUser> || mongoose.model<IUser>("User", userSchema);

export default User;
