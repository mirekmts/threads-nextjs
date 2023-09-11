import ThreadCard from "@/components/cards/ThreadCard";
import { Comment } from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { getUserInfo } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";

const Thread = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserInfo(user.id);

  const thread = await fetchThreadById(params.id);

  if (!thread) return null;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      {userInfo ? (
        <div className="mt-7">
          <Comment
            threadId={params.id}
            currentUserImg={userInfo.image!} // TODO fix this TS hack
            currentUserId={userInfo._id.toString()}
          />
        </div>
      ) : null}

      <div className="mt-10">
        {/* TODO add  proper type here */}
        {thread.children.map((comment: any) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user.id}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Thread;
