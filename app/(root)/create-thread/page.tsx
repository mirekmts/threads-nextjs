import { PostThread } from "@/components/forms/PostThread";
import { getUserInfo } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUserInfo(user.id);

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      {userInfo ? (
        <PostThread userId={userInfo._id.toString()} />
      ) : (
        <p className="mt-3 text-base-regular text-red-500">
          We cannot get user info. Something went wrong. Please try again later.
        </p>
      )}
    </>
  );
}

export default Page;
