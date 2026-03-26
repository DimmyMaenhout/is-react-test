import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostComments } from "../API/posts/posts";
import type { PostsResponse } from "../Models/PostsResponse";

export default function PostCommentsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Invalid post id</p>;
  }

  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ["post", id, "comments"],
    queryFn: () => fetchPostComments(id),
    enabled: !!id,
  });

  const cachedPosts = queryClient.getQueryData<PostsResponse>(["posts"]);
  const cachedPost = cachedPosts?.find((post) => String(post.id) === id);

  function onCloseClick() {
    navigate(-1);
  }

  if (isPending) {
    return <p>Fetching post comments...</p>;
  }

  if (error) {
    return (
      <p>
        Something went wrong while fetching the post comments, please try again
        later.
      </p>
    );
  }

  if (!cachedPost) {
    return <p>Couldn't find the post.</p>;
  }

  if (!comments?.length) {
    return <p>No post comments found.</p>;
  }

  return (
    <main>
      <button onClick={onCloseClick}>Close</button>

      <article>
        <h1>{cachedPost.title}</h1>
        <p>{cachedPost.body}</p>
      </article>

      <section>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => {
            return <li key={comment.id}>{comment.body}</li>;
          })}
        </ul>
      </section>
    </main>
  );
}
