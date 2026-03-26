import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostComments } from "../API/posts/posts";

export default function PostCommentsPage() {
  const navigate = useNavigate();
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

  function onCloseClick() {
    navigate(-1);
  }

  if (isPending) {
    return <p>Fetching post comments...</p>;
  }

  if (error) {
    return (
      <p>
        Something went wrong while fething the post comments, please try again
        later.
      </p>
    );
  }

  if (!comments?.length) {
    return <p>No post comments found.</p>;
  }

  return (
    <div>
      <button onClick={onCloseClick}>Close</button>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.body}</li>;
        })}
      </ul>
    </div>
  );
}
