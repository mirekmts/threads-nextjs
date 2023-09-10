import mongoose from "mongoose";
export interface IThread {
  text: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  children: mongoose.Types.ObjectId[];
  community?: mongoose.Types.ObjectId | undefined;
  parentId?: string | undefined;
}

const threadSchema = new mongoose.Schema<IThread>({
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

const Thread =
  mongoose.models.Thread<IThread> ||
  mongoose.model<IThread>("Thread", threadSchema);

export default Thread;
