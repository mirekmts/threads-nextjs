import { currentUser } from "@clerk/nextjs";
import { AccountProfile } from "@/components/forms/AccountProfile";
import { getUserInfo } from "@/lib/utils";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserInfo(user.id);

  const userData = {
    id: user.id,
    objectId: userInfo._id,
    username: userInfo.username || user.username || "",
    name: userInfo.name || user?.firstName || "",
    bio: userInfo.bio || "",
    image: userInfo.image || user?.imageUrl,
  };

  return (
    <>
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <AccountProfile user={userData} />
      </section>
    </>
  );
}

export default Page;
