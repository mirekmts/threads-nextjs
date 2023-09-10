"use server";
import { revalidatePath } from "next/cache";
import Thread, { IThread } from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface CreateThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThreadParams) {
  console.log("🚀 ~ file: thread.actions.ts:19 ~ author:", author);
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findOneAndUpdate(
      { _id: author },
      {
        $push: { threads: createdThread._id },
      }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}
