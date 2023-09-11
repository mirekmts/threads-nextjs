import mongoose from "mongoose";
// export interface IThread<TAuthor, TChildren, TCommunity> {
export interface IThread {
  _id: string;
  text: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  children: mongoose.Types.ObjectId[];
  community?: mongoose.Types.ObjectId | undefined;
  parentId?: string | undefined;
}

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
