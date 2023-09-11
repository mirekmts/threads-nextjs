import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>
    </section>
  );
}

export default Page;
