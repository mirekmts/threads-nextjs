"use server";

import { revalidatePath } from "next/cache";
import User, { IUser } from "../models/user.model";
import { connectToDB } from "../mongoose";

interface User {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: User & { path: string }): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log("🚀 ~ file: user.actions.ts:42 ~ error:", error);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return User.findOne<IUser>({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: "Thread",
      populate: [
        {
          path: "children",
          model: "Thread",
          populate: {
            path: "author",
            model: "User",
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}
